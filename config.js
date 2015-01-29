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

config.client = {
  deckUrl: process.env.EVENTDECK_URL || 'https://deck.sinfo.org',
  cannonUrl: process.env.CANNON_URL || 'http://cannon.sinfo.org',
  debugMode: true,
  isDev: config.isDev,
  facebook: {
    appId: config.facebook.appId
  }
};



module.exports = config;
