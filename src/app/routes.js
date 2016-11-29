import App from './App'

module.exports = {
  path: '/',
  component: App,
  childRoutes: [
    {path: 'test', component: App}
  ]
}
