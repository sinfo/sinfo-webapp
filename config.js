var config = {
  isDev: process.env.NODE_ENV != 'production',
  isSecure: false,
  url: process.env.CANNON_WEBAPP_URL || 'http://localhost:9000'
};

config.http = {
  listen: process.env.CANNON_WEBAPP_HOST || '0.0.0.0',
  port: process.env.CANNON_WEBAPP_PORT || 9000
};

config.facebook = {
  appId: process.env.CANNON_FACEBOOK_APP_ID || 'YOUR APP ID',
};

config.google = {
  appId: process.env.CANNON_GOOGLE_APP_ID || 'YOUR APP ID',
  analytics: process.env.CANNON_GOOGLE_ANALYTICS_ID || 'YOUR GOOGLE ANALYTICS ID'
};

config.fenix = {
  url: process.env.CANNON_FENIX_URL || 'https://fenix.tecnico.ulisboa.pt/api/fenix/v1/',
  oauthUrl: process.env.CANNON_FENIX_OAUTH_URL || 'https://fenix.tecnico.ulisboa.pt/oauth/',
  clientId: process.env.CANNON_FENIX_APP_ID || 'YOUR CLIENT_ID',
  redirectUri: process.env.CANNON_FENIX_REDIRECT_URI || 'http://example.com/redirect'
};

config.live = {
  interval: process.env.CANNON_UPDATE_INTERVAL || 60000
};

config.client = {
  deckUrl: process.env.EVENTDECK_URL || 'https://deck.sinfo.org',
  cannonUrl: process.env.CANNON_URL || 'https://cannon.sinfo.org',
  debugMode: true,
  isDev: config.isDev,
  live: config.live,
  facebook: {
    appId: config.facebook.appId
  },
  google: {
    appId: config.google.appId,
    apiKey: config.google.apiKey,
    analytics: config.google.analytics
  },
  fenix: {
    url: config.fenix.url,
    oauthUrl: config.fenix.oauthUrl,
    clientId: config.fenix.clientId,
    clientSecret: config.fenix.clientSecret,
    redirectUri: config.fenix.redirectUri
  }
};

module.exports = config;