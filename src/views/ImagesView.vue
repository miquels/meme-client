<template>
<div>
  <div class="imageheader">
    <h3> RIPE MEME IMAGES</h3>
    <p>
      Meme images are listed by rating. Please upvote your favourite image!
      <span v-if="images.length === 0">
        If no images are shown yet, <a href="/createimage/">create the first one!</a>
      </span>
    </p>
  </div>
  <div class="images">
    <div v-for="img in images" class="imgdiv">
      <router-link :to="'/images/' + img.id">
        <show-image :object="img" showinfo showrating :showdelete="showdelete(img)"></show-image>
      </router-link>
    </div>
  </div>
</div>
</template>

<script>
import ShowImage from '../components/ShowImage'
export default {
  name: 'images-view',
  components: {
    'show-image': ShowImage
  },
  computed: {
    images: function () {
      console.log('getting images', this.$store.state.images)
      return this.$store.state.images.filter((i) => !i.deleted)
    }
  },
  methods: {
    showdelete (img) {
      return window.clientuuid && img.clientuuid === window.clientuuid
    }
  }
}
</script>

<style lang="scss" scoped>
.imageheader {
  padding: 3%;
}
.images {
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  position: relative;
  margin: 0;
  width: 100%;
  padding-left: 1.5%;
  padding-right: 1.5%;
}
.imgdiv {
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
  .imgdiv {
    width: 45%;
  }
}
@media (max-width: 600px) {
  .imgdiv {
    width: 95%;
  }
}
</style>
