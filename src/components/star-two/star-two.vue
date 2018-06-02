<template>
  <div class="star">
    <div class="rank">
      <span v-if="stars>0" v-for="(item, index) in getStar" :key="index" class="star-bg" :class="item"></span>
    </div>
    <span class="zero" v-if="stars==0">暂无评分</span>
    <span v-if="stars>0" class="score">{{score}}</span>
  </div>
</template>

<script type="text/ecmascript-6">
const LENGTH = 5
const CLS_FULL = 'star-full'
const CLS_EMPTY = 'star-empty'

export default {
  props: {
    score: {
      type: String
    },
    stars: {
      type: String
    }
  },
  data () {
    return {
      msg: []
    }
  },
  computed: {
    getStar () {
      let result = []
      let score = parseFloat(this.stars)
      let cell = Math.ceil(score)
      let num = Math.ceil(cell / 2)
      for (let i = 0; i < num; i++) {
        result.push(CLS_FULL)
      }
      while (result.length < LENGTH) {
        result.push(CLS_EMPTY)
      }
      return result
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .star
    text-align center
    .rank
      display inline-block
      vertical-align middle
      font-size 0
      .star-bg
        display inline-block
        width 10px
        height 10px
        background-image url("star-full.png")
        background-size cover
        background-repeat no-repeat
        background-position center
        &.star-full
          background-image url("star-full.png")
        &.star-empty
          background-image url("star-empty.png")
    .zero
      font-size 11.5px
      color #aaa
    .score
      display inline-block
      vertical-align middle
      font-size 11.5px
      color #aaa
</style>
