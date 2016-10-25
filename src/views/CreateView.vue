<template>
  <div class="createview">
    <p class="browser">
      <span>{{ name }}</span> - caption image
    </p>
    <form class="form">
      <input v-model="text1" class="textinput" placeholder="Top">
      <input v-model="text2" class="textinput" placeholder="Bottom">
      <button class="submitinput" type="submit" @click.prevent="publish">
        Publish
      </button>
    </form>
    <meme id="meme" :line1="text1" :line2="text2" :imgsrc="imgsrc">
  </div>
</template>

<script>
import Meme from '../components/Meme'

export default {
  name: 'create-view',
  components: {
    meme: Meme
  },
  watch: {
    '$route' (to) {
      this.setCharacter(to.params.id)
    }
  },
  mounted () {
    this.setCharacter(this.$route.params.id)
  },
  computed: {
    imgsrc: function () {
      return this.$store.getters.thisCharacter.url
    },
    name: function () {
      return this.$store.getters.thisCharacter.name
    },
    text1: {
      get () { return this.$store.state.thisImage.text1 },
      set (val) { this.$store.dispatch('thisImage', { key: 'text1', val }) }
    },
    text2: {
      get () { return this.$store.state.thisImage.text2 },
      set (val) { this.$store.dispatch('thisImage', { key: 'text2', val }) }
    }
  },
  methods: {
    setCharacter (val, clear) {
      val = parseInt(val)
      if (val !== this.$store.state.thisImage.characterId) {
        this.text1 = ''
        this.text2 = ''
      }
      this.$store.dispatch('thisImage', { key: 'characterId', val })
    },
    publish () {
      this.$store.dispatch('addImage', this.$store.state.thisImage)
      this.$router.push('/images/')
    }
  }
}
</script>

<style lang="scss" scoped>
.createview {
  box-sizing: border-box;
  height: 100vh;
  padding: 0;
  p {
//    font-size: 20px;
    text-align: center;
    span {
      color: #6060dd;
    }
  }
  form {
    margin: 1%;
  }
  input {
    box-sizing: border-box;
    width: 30%;
    font-size: 20px;
    margin-right: 8px;
  }
  button {
    float: right;
    box-sizing: border-box;
    //width: 17%;
    font-size: 16px;
    background-color: #4CAF50;
    border: none;
    color: white;
    border-radius: 5px;
    padding: 5px 5px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
  }
}
@media (max-width: 860px) {
//  @media (orientation:portrait) {
    .createview {
      max-height: 33vh;
    }
//  }
//  @media (orientation:landscape) {
//    .createview {
//      width: 32%;
//    }
//  }
  .browser {
    display: none;
  }
}
</style>
