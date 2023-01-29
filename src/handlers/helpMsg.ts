export const HELP_MSG = `
\`\`\`
NAME
    /onebot - helper for Onebot way of working

SYNOPSIS
    /onebot <command> [subcommand [args]]

DESCRIPTION
    Show, set or update the configurations of Onebot way of working.

COMMANDS

    help
        Print usages.

    rotations
        Show current daily rotations. Add subcommand to change the configurations.

        SUBCOMMANDS
            add <title> <timer> <participants>
                Add a new daily rotation and reminder people at 9am on the day.
                It has three mandatory arguments: <title> <timer> <participants>!
                The delimeter of the participants is comma.
                The syntax of the timer shows in examples.

                EXAMPLES:
                    (1) /onebot rotations add "The daily facilitator" "1-5 *" "Jan Qu, Jon Xi, Lin bent"
                    Remind people at 9am on every day-of-week from Monday through Friday.
                    (2) /onebot rotations add "The Team Huddle facilitator" "2 *" "Jan Qu, Jon Xi, Lin bent"
                    Remind people at 9am on every Tuesday.
                    (3) /onebot rotations add "The Frontend Guild facilitator" "2 odd" "Jan Qu, Jon Xi, Lin bent"
                    Remind people at 9am on every Tuesday of every odd week of the year.
                    (4) /onebot rotations add "The Frontend Guild facilitator" "2 3" "Jan Qu, Jon Xi, Lin bent"
                    Remind people at 9am on third Tuesday of every month.

            delete <id>
                Remove a rotation from the list. You can get the rotation ID via "/onebot rotations" command.

                EXAMPLES:
                    (1) /onebot rotations delete "0dd5aba3-6234-417a-87c4-2138e78556cd"
                    Delete the rotation with ID 0dd5aba3-6234-417a-87c4-2138e78556cd.

            skip <id> [count]
                Skip the next [count] participants, the default count value is 1. Notice this only take effect before the rotation time.

                EXAMPLES:
                    (1) /onebot rotations skip "0dd5aba3-6234-417a-87c4-2138e78556cd"
                    Skip the next person.
                    (2) /onebot rotations skip "0dd5aba3-6234-417a-87c4-2138e78556cd" 2
                    Skip the next 2 person.
\`\`\`
`
