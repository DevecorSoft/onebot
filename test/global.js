const db = {}

module.exports = {
  PropertiesService: {
    getScriptProperties: () => ({
      getProperty: (key) => db[key],
      setProperty: (k, v) => {
        db[k] = v
      },
    }),
    getUserProperties: () => {},
  },
  Utilities: {
    getUuid: () => '16854480-1c99-11ed-ab84-6706cca77b2a',
  },
  OAuth2: {
    createService: function () {
      const service = {
        setTokenUrl: () => service,
        setPrivateKey: () => service,
        setClientId: () => service,
        setPropertyStore: () => service,
        setScope: () => service,
        getAccessToken: () => service,
      }
      return service
    },
  },
  UrlFetchApp: {
    fetch: () => {},
  },
  ServiceAccountCredentials: {
    private_key: '',
    client_id: '',
  },
}
