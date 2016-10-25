<template>
  <div class="memeimg">
    <img :src="imgsrc" v-on:load="handleResize"></img>
    <div class="memeline memeline_top lg-font outline2" ref="line1">
      <div class="memeline_c memeline_c_top">
        {{ line1 }}
      </div>
    </div>
    <div class="memeline memeline_bot lg-font outline2" ref="line2">
      <div class="memeline_c memeline_c_bot">
        {{ line2 }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'meme',
  props: [ 'line1', 'line2', 'imgsrc' ],
  watch: {
    line1: function () {
      this.$nextTick(function () {
        this.resizeLine('line1')
      })
    },
    line2: function () {
      this.$nextTick(function () {
        this.resizeLine('line2')
      })
    }
  },
  mounted: function () {
    // console.log('mounted')
    // resize text as as soon as it is shown, and after window resize.
    this.$nextTick(this.handleResize)
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy: function () {
    // console.log('beforeDestroy')
    // remove event listener.
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize: function () {
      // console.log('resizing')
      this.resizeLine('line1')
      this.resizeLine('line2')
    },
    resizeLine: function (line) {
      if (!this[line]) {
        return
      }
      if (!this.$refs || !this.$refs[line]) {
        console.log('resizeLine: too early for', line)
        return
      }
      var e = this.$refs[line]
      var len = this[line].length
      var factor = 0.80
      if (len < 12) {
        factor = 1 - 0.2 * (len / 12)
      }
      do {
        var newsize = e.clientHeight * factor
        if (newsize > 10) {
          newsize = Math.round(newsize)
        }
        e.style.fontSize = newsize + 'px'
        // console.log(line, ': newsize', newsize)
        factor *= 0.9
        // reading scrollHeight / clientHeight forces a synchronous
        // DOM update, which is exactly what we want here.
      } while (e.scrollHeight > e.clientHeight)
    }
  }
}
</script>

<style scoped lang="scss">

@import '../../node_modules/@typopro/web-league-gothic/TypoPRO-LeagueGothic-Regular.css';

.memeimg {
  position: relative;
  width: 100%;
}
.memeimg img {
  width: 100%;
  height: auto;
}
.lg-font {
  font-family: 'TypoPRO League Gothic';
  font-weight: bold;
  letter-spacing: 2px;
  text-transform: uppercase;
}
.outline3 {
  color: white;
  text-shadow: 3px 3px 0 #000, -3px -3px 0 #000, 3px -3px 0 #000,
               -3px 3px 0 #000, 3px 3px 0px #000;
}
.outline2 {
  color: white;
  text-shadow: 2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000,
               -2px 2px 0 #000, 2px 2px 0px #000;
}
.outline1 {
  color: white;
  text-shadow: 1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000,
               -1px 1px 0 #000, 1px 1px 0px #000;
}
.memeline {
  display: flex;
  position: absolute;
  width: 90%;
  height: 22%;
  left: 5%;
  // border: solid 1px black;
  justify-content: center;
}
.memeline_top {
  top: 3%;
}
.memeline_bot {
  bottom: 3%;
}
.memeline_c {
  max-height: 100%;
  text-align: center;
  //border: solid 1px green;
}
.memeline_c_top {
  align-self: flex-start;
}
.memeline_c_bot {
  align-self: flex-end;
}
</style>
