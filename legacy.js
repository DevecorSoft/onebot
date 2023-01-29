const HELP_MSG = `
\`\`\`
NAME
    /oneBot - helper for oneBot way of working

SYNOPSIS
    /oneBot <command> [subcommand [args]]

DESCRIPTION
    Show, set or update the configurations of oneBot way of working.

COMMANDS
    rotations
        Show current daily rotations. Add subcommand to change the configurations.

        SUBCOMMANDS
            add <args>
                Add a new daily rotation and reminder people at 9am on the day.
                It has three arguments: "title" "timer" "list". Quotes is mandatory for arguments!
                The delimeter of the list is comma.
                The syntax of the timer shows in examples.

                EXAMPLES:
                    (1) /oneBot rotations add "The daily facilitator" "1-5 *" "Jianming Qu, Xi Zhang, Jialing Zhang"
                    Remind people at 9am on every day-of-week from Monday through Friday.
                    (2) /oneBot rotations add "The Team Huddle facilitator" "2 *" "Jianming Qu, Xi Zhang, Jialing Zhang"
                    Remind people at 9am on every Tuesday.
                    (3) /oneBot rotations add "The Frontend Guild facilitator" "2 odd" "Jianming Qu, Xi Zhang, Jialing Zhang"
                    Remind people at 9am on every Tuesday of every odd week of the year.
                    (4) /oneBot rotations add "The Frontend Guild facilitator" "2 3" "Jianming Qu, Xi Zhang, Jialing Zhang"
                    Remind people at 9am on third Tuesday of every month.

            delete <id>
                Remove a rotation from the list. You can get the rotation ID via "/oneBot rotations" command.

                EXAMPLES:
                    (1) /oneBot rotations delete "0dd5aba3-6234-417a-87c4-2138e78556cd"
                    Delete the rotation with ID 0dd5aba3-6234-417a-87c4-2138e78556cd.

            skip <id>
                Skip the next rotation. Notice this only take effect before the rotation time (each day 9am).

                EXAMPLES:
                    (1) /oneBot rotations skip "0dd5aba3-6234-417a-87c4-2138e78556cd"
                    Skip the next person.
\`\`\`
`;


function onAddToSpace(event) {
  console.log(event);
  updateUserMapping(event.user.name, event.space);
  return {
    text: 'Hi! Thanks for adding me! Use /oneBot to see the helps.'
  };
}

function renderResponse(message, userSpace, thread) {
  if (userSpace) {
    postMessage(userSpace, { text: message }, thread);
    return;
  }
  return { text: `
    ${ message }
    (start a direct chat with me to avoid the distraction to others from my message)
    `, ...(thread && { thread: { name: thread }})};
}

const COMMAND_PARSING_REGEX = /^(?:\/oneBot)(?:$| (\w+)(?:$| (.*)$))/;
function onMessage(event) {
  console.log(event);
  updateUserMapping(event.user.name, event.space);
  if (event.type === 'MESSAGE' && event.message.slashCommand?.commandId === 100) {
    const [, command, args] = COMMAND_PARSING_REGEX.exec(event.message.text);
    const arguments = args || '';
    const userSpace = getUserMapping(event.user.name);
    const thread = event.message.thread?.name;
    Logger.log(`Get command ${ command } [${ arguments }]`);
    switch (command) {
      case 'rotations':
        return renderResponse(commandRotations(event.space.name, arguments, thread), userSpace, thread);
      case 'clearAll':
        PropertiesService.getScriptProperties().deleteAllProperties();
        return renderResponse('All data are cleaned up.', userSpace, thread);
      default:
        return renderResponse(commandHelp(), userSpace, thread);
    }
  }
}

function onRemoveFromSpace(event) {
  console.log(event);
  removeUserMapping(event.user.name);
}

// Commands ===============================
function commandHelp() {
  return HELP_MSG;
}

const ROTATIONS_DATA_KEY = 'space.rotations';
const ROTATIONS_ARGS_PARSING_REGEX = /^(\w*)(?:$| "(.*)"$)/;
function commandRotations(space, args, thread) {
  const result = ROTATIONS_ARGS_PARSING_REGEX.exec(args);
  if (!result) {
    return 'Error: invalid arguments';
  }
  const [, subcommand, argsStr] = result;
  const argmts = (argsStr || '').split('" "').filter(s => s);
  const data = getData(ROTATIONS_DATA_KEY);
  switch (subcommand) {
    case 'add':
      if (argmts.length !== 3) {
        return 'Error: invalid arguments';
      }
      const [title, timer, participateList] = argmts;
      const participates = participateList.split(",").map(p => p.trim());
      const id = Utilities.getUuid();
      updateData(ROTATIONS_DATA_KEY, id, { space, title, timer, participates, thread });
      return 'Info: rotation added';
    case 'delete':
      if (argmts.length !== 1) {
        return 'Error: invalid arguments';
      }
      updateData(ROTATIONS_DATA_KEY, argmts[0], null);
      return 'Info: rotation deleted';
    case 'skip':
      if (argmts.length !== 1) {
        return 'Error: invalid arguments';
      }
      const rotation = getData(ROTATIONS_DATA_KEY, argmts[0]);
      const [current, next] = skipNext(argmts[0], rotation);
      return `Done. @${ current } is skipped. The next is @${ next }`;
    default:
      console.log('Rotations: ', JSON.stringify(data));
      const spacedData = Object.entries(data || {}).filter(([, rotation]) => rotation.space === space);
      return (spacedData.length > 0) ?
        'Current rotations:\n  ' + spacedData.map(([id, { title, timer, participates }]) =>
          `[${ id }] ${ title } "${ timer }" "${ participates.join(', ') }"`)
          .join('\n  ') : 'Currently, there is no rotations configured';
  }
}

function skipNext(id, { space, title, timer, participates, thread }) {
  const [current, next] = participates;
  const updatedParticipates = [...participates.slice(1), current];
  updateData(ROTATIONS_DATA_KEY, id, { space, title, timer, participates: updatedParticipates, thread });
  return [current, next];
}

function triggerRotations() {
  const data = getData(ROTATIONS_DATA_KEY);
  if (!data) {
    Logger.log('Info: no rotations founded. Skip.')
    return;
  }

  Object.entries(data).filter(([, { timer }]) => shouldTrigger(timer)).forEach(([id, rotation]) => {
    const [current, next] = skipNext(id, rotation);
    postMessage(rotation.space, { text: `${ rotation.title } is @${ current }. Next will be @${ next }.` }, rotation.thread);
  });
}

function shouldTrigger(timer) {
  const [day, week] = timer.trim().split(' ');
  return dayMatch(day) && weekMatch(week);
}

function dayMatch(day) {
  if (day === '*') {
    return true;
  }
  const now = new Date().getDay();
  if (day.includes('-')) {
    const [start, end] = day.split('-');
    return start <= now && now <= end;
  }
  return now == day;
}

function weekMatch(week) {
  if (week === '*') {
    return true;
  }
  const currentdate = new Date();
  if (week === 'odd' || week === 'even') {
    const oneJan = new Date(currentdate.getFullYear(),0,1);
    const numberOfFirstSunday = (7 - oneJan.getDay()) % 7;
    const numberOfDays = Math.floor((currentdate - oneJan) / (24 * 60 * 60 * 1000)) - numberOfFirstSunday;
    const now = Math.ceil((numberOfDays + 1) / 7);
    return week === (now % 2 === 1 ? 'odd' : 'even');
  }
  return Math.ceil(currentdate.getDate() / 7) == week;
}

// Utils ==================================

const USER_MAPPING_DATA_KEY = 'user.mappings';

function tryJsonParse(str) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return {};
  }
}

function updateUserMapping (userName, space) {
  if (space?.type === 'DM') {
    updateData(USER_MAPPING_DATA_KEY, userName, space.name);
  }
}

function removeUserMapping (userName) {
  updateData(USER_MAPPING_DATA_KEY, userName, null);
}

function getUserMapping (userName) {
  return getData(USER_MAPPING_DATA_KEY, userName);
}

function getData (dataKey, key) {
  const str = PropertiesService.getScriptProperties().getProperty(dataKey);
  console.log('getData', dataKey, key, str);
  const data = tryJsonParse(str);
  return key ? data?.[key]: data;
}

function updateData (dataKey, key, value) {
  if (typeof key !== 'string') {
    PropertiesService.getScriptProperties().deleteProperty(dataKey);
    return;
  }
  if (value === null) {
    const str = PropertiesService.getScriptProperties().getProperty(dataKey);
    const data = tryJsonParse(str);
    delete data[key];
    PropertiesService.getScriptProperties().setProperty(dataKey, JSON.stringify(data));
  }
  else {
    const str = PropertiesService.getScriptProperties().getProperty(dataKey);
    const data = tryJsonParse(str);
    PropertiesService.getScriptProperties().setProperty(dataKey, JSON.stringify({ ...data, [key]: value }));
  }
}

var SCOPE = 'https://www.googleapis.com/auth/chat.bot';
// The values below are copied from the JSON file downloaded upon
// service account creation.
// For SERVICE_ACCOUNT_PRIVATE_KEY, remember to include the BEGIN and END lines of the private key
var SERVICE_ACCOUNT_PRIVATE_KEY = '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDqeDXjTOlFKe7k\nt/S8D/M0yNvBU6/cVvlMkNwJZ6JrxAQnXeHZWgBhKtAi4GASVLXnTK79DP4uzy9+\nzF/t2J16jQ5yM3d9Gg1zDp12WIAmAjS5s/+9LsJs3RlfRWiyzmsfnU/BdR1jWIsg\nEgQMXi+1bBYEUb/hHPTOvtK1kqLBEXzchcPvGHI06PGmCUQ1YDFZ8POag8JUJip2\ngqirZMOqM7c5CK/iSUqs3DDVs1hSfZ5EN4elL6gObBcmGMT3cANL0WPCM/NFIaem\nPCBLEaM88WUUY+tuTqoT2l7CH23vEgx5j5veTzrMdv8QFERefpLmebuejjynXfx4\nHkgEaYo1AgMBAAECggEAHX3Zz1mO9MlhuEiQIrCB54eFJqPDWLxi1pfY6WDs68+n\nsxjqrbdVmWM0c1KUGvInQCzjzMX72cDrKTCFN2o54p6H7OLe2nAytWBm+2oF0mIQ\nJjSHDBFr2JwV0ycslGME0+DqVXvI4sRSGYpSkoitSQ1Llqb+ss681x1m7PpA+PYf\nvvAnNYcbGV0lD0Znqu0dYUiA7glATYaWRFMgUbsz16CzCewXSWF3UAV0NXLA8iKf\n6A87IohqqXTqEeW/Xulsno3TcZqOr0ncqMZroJxQxKihTqSNioD+nyVaS9vYY65/\nltYj2QyE70NJGmq6mbfBqcvMALnPGjMYUu+Mh3tLaQKBgQD7FuecUvZtlzs++Fzd\n1CahF9wTJtVtZ8XjZ++jd9RIDff4N3mE+Ot3GfN6rirh9y2Mtx27QjIbj1hnW9KZ\nONC8682oloDKSqYIRYOPszR9CV2KbJ289CaQZZUBT/8dFakw5K2tS7EKcsVZs5eb\nquBOZXIb22uHPcDAQAMbU3S23QKBgQDvDhjh4F43MOvtn+i6OEzY7ITXbdBH1x02\nIGVVOIxTrYuvpTARjDb+OLULEFPtV6NjxfGpHV6jcVcTpdn25fvf0m7rhNRnbbK5\ni7cRxLu+q5hzkLJC6PpT+8VyxkZp2SgpCCl4hiswqPD3BhRjjshn98+07Q8SPOFN\nBPQdhv9vOQKBgQCKmoU13PIdYtsYkp8o8OB2Eqawh8JPB3bMZmZ5dT9gmx1kDrNs\n/L92WoP2F8iiPgEN6VNnOE5SullRjPV/EUbg0sYPJy1m/bgTXtQV8hWqZA4XyId2\nc8wJ75lGRTONiZSA4eshe2P6YYqhTqsFClmRzRwlVoVP/X22Yl+UqQgHnQKBgQCa\neyKrPOHFirC7w12SkXVfrSB/UrCI7EMtSiwRsVRFct3U6MuyW0jiaeTcvHVv5/Vn\nMXBkV91jg4fA46mB+scUsZkKS7EzEVmwu8/XBKpKofsHm1cHFCVIhmfnLqgsGK/y\nLBsYjqN0c4gcKeqdF5T8UtD/2z2lDICP1Aao2idRSQKBgHBGrpR+xFRxybNmV9a7\nDffNMIm3hgZO4SRVBf+KyQHYXn5W2qw/1x72b7jyUqzDpfDW1quDYC5F9P7d51Nh\nxz05V8jKdoxm3CMspC13FVP7kpRz308lbCtuNq6LZ8OHGVs7kZMpAP1KVabHt7jn\nBiwqF3ygzH1HiwI4lEK3dfJr\n-----END PRIVATE KEY-----';
var SERVICE_ACCOUNT_EMAIL = 'mb-oneBot-sa@oneBot.iam.gserviceaccount.com';

// Posts a message into the given space ID via the API, using
// service account authentication.
function postMessage(id, message, thread) {
  var service = OAuth2.createService('chat')
    .setTokenUrl('https://accounts.google.com/o/oauth2/token')
    .setPrivateKey(SERVICE_ACCOUNT_PRIVATE_KEY)
    .setClientId(SERVICE_ACCOUNT_EMAIL)
    .setPropertyStore(PropertiesService.getUserProperties())
    .setScope(SCOPE);
  if (!service.hasAccess()) {
    Logger.log('Authentication error: %s', service.getLastError());
    return;
  }
  console.log('space id: ', id);
  var url = 'https://chat.googleapis.com/v1/' + id + '/messages';

  Logger.log('Sending message to ' + url);
  const payload = { ...message, ...(thread && { thread: { name: thread }})};
  try {
    UrlFetchApp.fetch(url, {
      method: 'post',
      headers: { 'Authorization': 'Bearer ' + service.getAccessToken() },
      contentType: 'application/json',
      payload: JSON.stringify(payload),
      muteHttpExceptions: true
    });
  } catch (e) {
    Logger.log('Chat API error: ', e);
    fetch(payload);
  }
}

const oneBot_WEB_HOOK = 'https://chat.googleapis.com/v1/spaces/AAAArqU7ZSI/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=drYZF5hYDa8vONqKhMS5PB3FRYb2YJYfZ-aNXvgtaqk%3D';

function fetch(payload) {
  try {
    UrlFetchApp.fetch(oneBot_WEB_HOOK, {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify(payload)
    });
  } catch (e) {
    Logger.log('Fatal error: ', e);
  }
}

function showData() {
  console.log(getData(ROTATIONS_DATA_KEY));
}

function cleanUpAllData() {
  updateData(ROTATIONS_DATA_KEY);
  console.log(getData(ROTATIONS_DATA_KEY));
}
