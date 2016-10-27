<template>
<div>
  <div class="charheader">
    <h3> MEME CHARACTERS</h3>
    <p>
      These are the available meme characters. To create a new meme image,
      just click on one of the characters.
    </p>
  </div>
  <transition name="fade" mode="out-in">
  <div class="characters">
    <div v-for="ch in characters" :key="ch.id" class="chardiv">
      <router-link :to="'/create/' + ch.id">
        <show-image showinfo :object="ch"></show-image>
      </router-link>
    </div>
  </div>
  </transition>
</div>
</template>

<script>
import ImageComponent from '../components/ShowImage'
export default {
  name: 'characters-view',
  components: {
    'show-image': ImageComponent
  },
  computed: {
    characters: function () {
      console.log('getting characters', this.$store.state.characters)
      return this.$store.state.characters
    }
  }
}
</script>

<style lang="scss" scoped>
.charheader {
  padding: 3%;
}
.characters {
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  position: relative;
  margin: 0;
  width: 100%;
  padding-left: 1.5%;
  padding-right: 1.5%;
}
.chardiv {
  align-self: flex-end;
  box-sizing: border-box;
  position: relative;
  width: 30.3%;
  margin: 1.5%;
  a:link, a:visited {
    color: inherit;
    text-decoration: none;
  }
}
@media (max-width: 860px) {
  .chardiv {
    width: 45%;
  }
}

@media (max-width: 600px) {
  .chardiv {
    width: 95%;
  }
}
</style>
