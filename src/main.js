
import Vue from 'vue'
import App from './App'
import Router from 'vue-router'
import store from './store'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

Vue.use(Vuex)
Vue.use(VueResource)
Vue.use(Router)

// import MainView from './components/MainView'
import ImagesView from './views/ImagesView'
import ImageView from './views/ImageView'
import CreateView from './views/CreateView'
import CharactersView from './views/CharactersView'
import MainView from './views/MainView'

var router = new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
      { path: '/', component: MainView },
      { path: '/create/:id(\\d+)', component: CreateView },
      { path: '/createimage/', component: CharactersView },
      { path: '/characters/', component: CharactersView },
      { path: '/images/', component: ImagesView },
      { path: '/images/:id(\\d+)', component: ImageView },
      { path: '*', redirect: '/' }
  ]
})

function generateUUID () {
  var d = new Date().getTime()
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    var r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
  })
  return uuid
}

function getCookie (cname) {
  if (!document.cookie) {
    return ''
  }
  var cookies = document.cookie.split(';')
  for (c of cookies) {
    var [ name, value ] = c.trim().split('=')
    console.log('cookie: ', name, value)
    if (name === cname) {
      return value
    }
  }
  return ''
}

function setCookie (cname, cvalue, exdays) {
  var d = new Date()
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
  var expires = 'expires=' + d.toUTCString()
  var cookie = cname + '=' + cvalue + ';' + expires + ';path=/'
  document.cookie = cookie
}

window.startAtImages = true
var c = getCookie('clientuuid')
if (c === '') {
  c = generateUUID()
  setCookie('clientuuid', c, 365 * 5)
  window.startAtImages = false
}
Vue.http.headers.common['X-Cookie'] = 'clientuuid=' + c
window.clientuuid = c

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
