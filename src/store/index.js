import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

Vue.use(Vuex)
Vue.use(VueResource)

const apiurl = 'https://ripemem.es'

const state = {
  config: {},
  images: [],
  characters: [],
  thisImage: {
    characterId: 0,
    text1: 'Hello',
    text2: 'World'
  }
}

var __imgid = 1
var __chrid = 1

function makeAbsolute (obj, key) {
  if (!key) {
    key = 'url'
  }
  if (obj.url && obj.url.substr(0, 1) === '/') {
    obj.url = apiurl + obj.url
  }
}

const getters = {
  thisCharacter: state => {
    var r = state.characters.filter(ch => ch.id === state.thisImage.characterId)
    if (r.length > 0) {
      return r[0]
    }
    return {}
  }
}

// mutations: synchronous changes
const mutations = {
  thisImage (state, { key, val }) {
    console.log('mutation thisImage', key, val)
    state.thisImage[key] = val
  },

  addImage (state, newImage) {
    newImage.id = __imgid++
    state.images.splice(0, 0, newImage)
  },

  deleteImage (state, image) {
    image.deleted = true
    state.images = state.images.filter((i) => i !== image)
  },

  rateImage (state, { image, rating }) {
    image.rating = rating
    // re-sort
    state.images.sort((a, b) => {
      if (a.rating === b.rating) {
        return b.id - a.id
      }
      return b.rating - a.rating
    })
  },

  addCharacter (state, newCharacter) {
    newCharacter.id = __chrid++
    state.characters.splice(0, 0, newCharacter)
  },

  deleteCharacter (state, character) {
    state.characters.$remove(character)
  },

  rateCharacter (state, { character, rating }) {
    character.rating = rating
  },

  loadCharacters (state, characters) {
    state.characters = characters
  },

  loadImages (state, images) {
    state.images = images
  },

  loadConfig (state, config) {
    state.config = config
  }
}

// actions: asynchronous changes.
const actions = {
  thisImage (context, { key, val }) {
    // console.log('action thisImage', key, val)
    context.commit('thisImage', { key, val })
  },
  addImage (context, image) {
    console.log('image is', image)
    Vue.http.post(apiurl + '/api/images', image).then(
      (response) => {
        if (response.status >= 200 && response.status <= 299) {
          // XXX FIXME check validity
          console.log('got response', response.body)
          // var img = JSON.parse(response.body)
          context.commit('addImage', response.body)
          // FIXME handle error. Does a throw() call the catch/error below?
        }
      },
      (response) => {
        // FIXME failed.. show to user and/or retry
        console.log('addImage: failed API call')
      }
    )
  },

  rateThing (context, { thing, delta }) {
    var thingType = thing.characterId ? 'image' : 'character'
    var thingsType = thing.characterId ? 'images' : 'characters'
    var thingCall = thing.characterId ? 'rateImage' : 'rateCharacter'
    Vue.http.patch(apiurl + '/api/' + thingsType + '/' + thing.id, {
      op: 'delta',
      path: '/rating',
      value: '' + delta
    }).then((response) => {
      // XXX FIXME check validity
      console.log(thingCall + ': got response', response.body)
      var o = { rating: response.body.rating }
      o[thingType] = thing
      context.commit(thingCall, o)
      // FIXME handle error. Does a throw() call the catch/error below?
    }).catch((response, arg2) => {
      // FIXME failed.. show to user and/or retry
      console.log(thingCall + ': failed API call', response)
    })
  },

  deleteImage (context, image) {
    return Vue.http.delete(apiurl + '/api/images/' + image.id).then((response) => {
      // console.log('response', response)
      if (response.status >= 200 && response.status <= 299) {
        context.commit('deleteImage', image)
      }
    }).catch((response) => {
      console.log('deleteImage: error', response)
    })
  },
  addCharacter (context, character) {
    context.commit('addCharacter', character)
  },
  deleteCharacter (context, character) {
    context.commit('deleteCharacter', character)
  },
  loadCharacters (context) {
    return Vue.http.get(apiurl + '/api/characters').then((response) => {
      // console.log('response', response)
      if (response.status === 200) {
        response.data.forEach(makeAbsolute)
        response.data.sort((a, b) => a.id - b.id)
        context.commit('loadCharacters', response.data)
      }
    }).catch((response) => {
      console.log('loadCharacters: error', response)
    })
  },
  loadImages (context) {
    return Vue.http.get(apiurl + '/api/images').then((response) => {
      // console.log('response', response)
      if (response.status === 200) {
        // response.data.forEach(makeAbsolute)
        response.data.sort((a, b) => {
          if (a.rating === b.rating) {
            return b.id - a.id
          }
          return b.rating - a.rating
        })
        context.commit('loadImages', response.data)
      }
    }).catch((response) => {
      console.log('loadImages: error', response)
    })
  },
  loadConfig (context) {
    return Vue.http.get(apiurl + '/api/config').then((response) => {
      // console.log('response', response)
      if (response.status === 200) {
        context.commit('loadConfig', response.data)
      }
    }).catch((response) => {
      console.log('loadConfig: error', response)
    })
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  strict: process.env.NODE_ENV !== 'production'
})
