var config = {
  isDev: process.env.NODE_ENV != 'production',
  isSecure: false,
};

config.http = {
  listen: '0.0.0.0',
  port: process.env.WEBAPP_PORT || 9000
}

config.facebook = {
  appId: process.env.CANNON_FACEBOOK_APP_ID || 'YOUR APP ID',
};

config.google = {
  appId: process.env.CANNON_GOOGLE_APP_ID || 'YOUR APP ID',
  apiKey: process.env.CANNON_GOOGLE_API_KEY || 'YOUR API KEY'
} 

config.fenix = {
  appId: '570015174623243' || process.env.CANNON_FENIX_APP_ID || 'YOUR APP ID',
  appSecretKey: 'Kq3gepWsY1jHs30bDWfmx1MjHqPh2PSrhgT4NqTXWfyDvmCxkGrfIrTytbDIP4PEkiRSkDkJsVF0CJR1djj0a0aZX3XQIomMlLYJEh7eMir9lxwNevY' || process.env.CANNON_FENIX_APP_ID || 'YOUR APP ID',
  redirectUri: 'localhost:9000'
}

config.client = {
  deckUrl: process.env.EVENTDECK_URL || 'https://deck.sinfo.org',
  cannonUrl: process.env.CANNON_URL || 'http://cannon.sinfo.org',
  debugMode: true,
  isDev: config.isDev,
  facebook: {
    appId: config.facebook.appId
  },
  google: {
    appId: config.google.appId,
    apiKey: config.google.apiKey
  },
  fenix: {
    appId: config.fenix.appId,
    appSecretKey: config.fenix.appSecretKey,
    redirectUri: config.fenix.redirectUri
  }
};

module.exports = config;
