var config = {
  isDev: process.env.NODE_ENV != 'production',
  isSecure: false,
};

config.http = {
  listen: '0.0.0.0',
  port: process.env.WEBAPP_PORT || 9000
};

config.facebook = {
  appId: process.env.CANNON_FACEBOOK_APP_ID || 'YOUR APP ID',
};

config.google = {
  appId: process.env.CANNON_GOOGLE_APP_ID || 'YOUR APP ID',
  apiKey: process.env.CANNON_GOOGLE_API_KEY || 'YOUR API KEY'
};

config.fenix = {
  url: process.env.CANNON_FENIX_URL || 'https://fenix.tecnico.ulisboa.pt/api/fenix/v1/',
  oauthUrl: process.env.CANNON_FENIX_OAUTH_URL || 'https://fenix.tecnico.ulisboa.pt/oauth/',
  clientId: process.env.CANNON_FENIX_APP_ID || 'YOUR CLIENT_ID',
  clientSecret: process.env.CANNON_FENIX_APP_SECRET || 'YOUR CLIENT_SECRET',
  redirectUri: process.env.CANNON_FENIX_REDIRECT_URI || 'http://example.com/redirect'
};

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
    url: config.fenix.url,
    oauthUrl: config.fenix.clientId,
    clientId: config.fenix.clientId,
    clientSecret: config.fenix.clientSecret,
    redirectUri: config.fenix.redirectUri
  }
};

module.exports = config;
