<template>
<div class="imageDiv" :class="{ imageDivBorder: showinfo !== null }">
  <div class="imageDelete"
    v-if="showdelete !== null && showdelete !== false"
    @click.prevent="deleteImage">x</div>
  <meme :line1="obj.text1" :line2="obj.text2" :imgsrc="obj.imgsrc"></meme>
  <div class="imageInfo" v-if="showinfo !== null" @click.prevent="ignore">
    <div class="imageName">{{ obj.name }}</div>
    <div class="imageRating" v-if="showrating !== null">
      <a href="#" @click.prevent="rateDown">&#x25bd;</a>
      {{ obj.rating }}
      <a href="#" @click.prevent="rateUp">&#x25b3;</a>
    </div>
  </div>
</div>
</template>

<script>
import Meme from './Meme'
export default {
  name: 'show-image',
  components: {
    meme: Meme
  },
  data: function () {
    return {
      isImage: false,
      isCharacter: false
    }
  },
  props: {
    object: Object,
    showinfo: { default: null },
    showrating: { default: null },
    showdelete: { default: null }
  },
  methods: {
    deleteImage () {
      if (this.isImage) {
        this.$store.dispatch('deleteImage', this.object)
      }
    },
    rateUp () {
      this.$store.dispatch('rateThing', { thing: this.object, delta: 1 })
    },
    rateDown () {
      this.$store.dispatch('rateThing', { thing: this.object, delta: -1 })
    },
    ignore () {
    }
  },
  computed: {
    obj: function () {
      // console.log('mounted image')
      var r = {}
      // image object?
      if (this.object && this.object.characterId) {
        var imgobj = this.object
        var chr = this.$store.state.characters
        var chrobj = chr.find((c) => c.id === imgobj.characterId)
        if (chrobj) {
          r.rating = imgobj.rating
          r.text1 = imgobj.text1
          r.text2 = imgobj.text2
          r.imgsrc = chrobj.url
          r.name = chrobj.name
          r.id = this.imageId
          this.isImage = true
        }
        return r
      }
      // character object?
      if (this.object && this.object.url) {
        // r.rating = imgobj.rating
        r.imgsrc = this.object.url
        r.id = this.object.characterId
        r.name = this.object.name
        this.isCharacter = true
        return r
      }
      return r
    }
  }
}
</script>

<style lang="scss" scoped>
.imageDiv {
  box-sizing: border-box;
  position: relative;
  border: 1px transparent solid;
  font-size: 0.8em;
  color: rgba(0xff, 0xff, 0xff, 0.5);
  img {
    max-height: 100%;
    max-width: 100%;
  }
  a:link, a:visited {
    color: inherit;
    text-decoration: none;
  }
}
.imageDiv:hover {
  color: black;
}
.imageDivBorder:hover {
  border: 1px solid rgba(0,0,0,0.5);
  box-shadow: 3px 3px 5px 0px rgba(0,0,0,0.5);
}
.imageDelete {
  position: absolute;
  z-index: 5;
  right: 8px;
  top: 3px;
  font-size: 16px;
  padding-left: 3px;
  padding-right: 3px;
  color: rgba(255,255,255,0.5);
}
.imageDelete:hover {
  background-color: black;
  color: white;
}
.imageInfo {
  // border: 1px solid green;
  padding-left: 0.5em;
  padding-right: 0.5em;
  height: 2.5em;
  cursor: default;
}
.imageName {
  display: inline-block;
  vertical-align: middle;
}
.imageRating {
  // border: 1px solid red;
  float: right;
  font-size: 1.5em;
}
</style>
