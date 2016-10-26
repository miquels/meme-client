<template>
  <div class="imageview">
    <p>
      <span>{{ image.name }}</span>
    </p>
    <meme id="id" :line1="image.text1" :line2="image.text2" :imgsrc="image.imgsrc">
  </div>
</template>

<script>
import Meme from '../components/Meme'

export default {
  name: 'imageview',
  components: {
    'meme': Meme
  },
  watch: {
    '$route' (to) {
      this.id = parseInt(to.parameters.id)
    }
  },
  mounted () {
    console.log(this.$route)
    this.id = parseInt(this.$route.params.id)
  },
  data: function () {
    return {
      id: 0
    }
  },
  computed: {
    image () {
      var ret = { name: '', imgsrc: '', text1: '', text2: '' }
      var img = this.$store.state.images.find((i) => i.id === this.id)
      // console.log('found image', this.id, img, this.$store.state.images)
      if (img) {
        var ch = this.$store.state.characters
          .find(c => c.id === img.characterId)
        if (ch) {
          ret.name = ch.name
          ret.imgsrc = ch.url
          ret.text1 = img.text1
          ret.text2 = img.text2
        }
      }
      return ret
    }
  }
}
</script>

<style lang="scss" scoped>
.imageview {
  position: relative;
  box-sizing: border-box;
  padding: 0;
  width: 60%;
  max-height: 100vh;
  img {
    width: 100%;
  }
  p {
    font-size: 20px;
    text-align: center;
    span {
      color: #6060dd;
    }
  }
}

@media (max-width: 600px) {
  .imageview {
    width: 95%;
  }
}
</style>
