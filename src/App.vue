<template>
  <div id="app">
    <div class="header">
      <div class="inner">
        <router-link to="/" exact class="browser">RIPE Memes</router-link>
        <router-link to="/images/">Meme Images</router-link>
        <router-link v-if="!readonly" to="/createimage/">Create Image</router-link>
        <a class="github" href="https://github.com/miquels/meme-client" target="_blank">
          Github
        </a>
      </div>
    </div>
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  computed: {
    readonly () {
      return this.$store.state.config.readonly
    }
  },
  mounted: function () {
    // after mounting, load config / characters / images.
    this.$store.dispatch('loadConfig')
    .then(() => { this.$store.dispatch('loadCharacters') })
    .then(() => { this.$store.dispatch('loadImages') })
    if (window.location.pathname === '/' && window.startAtImages) {
      this.$router.replace('/images/')
    }
    window.startAtImages = false
  }
}
</script>

<style lang="scss">
body {
  font-family: sans-serif;
  font-size: 15px;
  background-color: lighten(#eceef1, 30%);
  margin: 0;
  padding-top: 55px;
  color: #34495e;
}
.header {
  background-color: #ff6600;
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  right: 0;
  .inner {
    max-width: 800px;
    box-sizing: border-box;
    margin: 0px auto;
    padding: 15px 5px;
  }
  a {
    color: #34495e;
    text-decoration: none;
    color: rgba(255, 255, 255, .8);
    line-height: 24px;
    transition: color .15s ease;
    display: inline-block;
    vertical-align: middle;
    font-weight: 300;
    letter-spacing: .075em;
    margin-right: 1.8em;
  }
  a.router-link-active {
    color: #fff;
    font-weight: 400;
  }
  a:nth-last-child(0) {
    margin-right: 0;
  }
  a:hover {
      color: #fff;
  }
  .github {
    color: #fff;
    font-size: .9em;
    margin: 0;
    float: right;
  }
}
.view {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
}

.fade-enter-active, .fade-leave-active {
  transition: all .2s ease;
}
.fade-enter, .fade-leave-active {
  opacity: 0;
}

@media (max-width: 860px) {
  .header .inner {
    padding: 15px 30px;
  }
}

@media (max-width: 600px) {
  body {
    font-size: 14px;
  }
  .header {
    .inner {
      padding: 15px;
    }
    a {
      margin-right: 1em;
    }
    .github {
      display: none;
    }
    .browser {
      display: none;
    }
  }
}
</style>
