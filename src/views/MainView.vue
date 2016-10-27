<template>
<div class="mainDiv">
  <div class="mainContentDiv">
    <h2 class="mainCenter">RIPE Memes</h2>
    <span class="mainCenter">Welcome to RIPE memes!</span>
    <p>
    To see which images have already been created, select the
    <router-link to="/images/">images</router-link>  page.
    <p>
    <span v-if="!readonly">
    To create your own image, or just look at the characters, go to
    <router-link to="/createimage/">create image</router-link>.
    <p>
    Note that you can only create and view images and characters from
    the RIPE conference network, or from the hotel wifi. At least
    most of the time, sometimes it's open to the world.
  </span>
    <p>
    There is currently no way to save an image (other than taking
    a screenshot).
    <p>
    Have fun!
  </div>
</div>
</template>

<script>
export default {
  name: 'main-view',
  data: function () {
    return { }
  },
  computed: {
    readonly () {
      return this.$store.state.config.readonly
    }
  }
}
</script>

<style>
.mainDiv {
  position: relative;
  height: 100vh;
  background: url('/static/images/RIPE_logo.svg');
  background-size: cover;
}
.mainContentDiv {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 90;
  height: 100%;
  padding: 5%;
  background-color: rgba(255,255,255,0.9);
}
</style>
