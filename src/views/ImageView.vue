<template>
  <div class="imageview">
    <p>
      <span>{{ name }}</span>
    </p>
    <meme id="meme" :line1="text1" :line2="text2" :imgsrc="imgsrc">
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
      this.setImage(to.parameters.id)
    }
  },
  mounted () {
    this.setImage(this.$route.params.id)
  },
  data: function () {
    return {
      name: '',
      imgsrc: '',
      text1: '',
      text2: ''
    }
  },
  methods: {
    setImage (id) {
      id = parseInt(id)
      var img = this.$store.state.images.find((i) => i.id === id)
      // console.log('found image', id, img, this.$store.state.images)
      if (img) {
        var ch = this.$store.state.characters
          .find(c => c.id === img.characterId)
        if (ch) {
          this.name = ch.name
          this.imgsrc = ch.url
          this.text1 = img.text1
          this.text2 = img.text2
          return
        }
      }
      this.name = ''
      this.imgsrc = ''
      this.text1 = ''
      this.text2 = ''
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
  height: 100%;
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
