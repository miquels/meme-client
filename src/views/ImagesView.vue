<template>
<div>
  <div class="imageheader">
    <div class=clearfix>
      <div class="imageheaderTitle">
        RIPE MEME IMAGES
      </div>
      <div class="imageheaderButtonDiv">
        <input type="button" class="imageheaderButton" value="Update" @click="update">
      </div>
    </div>
    <div class="imageHeaderText">
      Meme images are listed by rating. Please upvote your favourite image!
      <span v-if="images.length === 0">
        If no images are shown yet, <a href="/createimage/">create the first one!</a>
      </span>
      <br>
      <small>
        Note this is a work in progress - if you find any bugs, please
        <a href="https://github.com/miquels/meme-client/issues" target=_blank>
          file a github issue</a>.
      </small>
    </div>
  </div>
  <div class="images">
    <transition-group name="list">
      <div v-for="img in images" :key="img.id" class="imgdiv">
        <router-link :to="'/images/' + img.id">
          <show-image :object="img" showinfo showrating :showdelete="showdelete(img)"></show-image>
        </router-link>
    </div>
  </transition-group>
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
      // console.log('getting images', this.$store.state.images)
      return this.$store.state.images.filter((i) => !i.deleted)
    }
  },
  methods: {
    showdelete (img) {
      return window.clientuuid && img.clientuuid === window.clientuuid
    },
    update () {
      this.$store.dispatch('loadImages')
    }
  }
}
</script>

<style lang="scss" scoped>
.clearfix:after {
  content: "";
  display: table;
  clear: both;
}
.imageheader {
  padding: 3%;
}
.imageheaderTitle {
  position: relative;
  float: left;
  font-size: 1.3em;
}
.imageheaderButtonDiv {
  position: relative;
  float: right;
}
.imageheaderText {
}
.imageheaderButton {
  box-sizing: border-box;
  //width: 17%;
  font-size: 16px;
  background-color: #4CAF50;
  border: none;
  color: white;
  border-radius: 5px;
  padding: 5px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  outline: none;
  transition: all ease 0.3s;
}
.imageheaderButton:active {
  background-color: #40A040;
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
span {
  display: flex;
  flex-wrap: wrap;
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
.list-move {
  transition: transform 1s;
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
