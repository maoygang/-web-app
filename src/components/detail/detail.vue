<template>
  <div class="detail-wrapper" ref="wrapper">
    <div class="detail">
      <h1 class="title">{{detail_data.title}}</h1>
      <div class="description">
        <div class="left">
          <div class="rank">
            <Star :stars="detail_data.rating.stars" :score="detail_data.rating.average"></Star>
            <span class="ratings">{{detail_data.ratings_count}}人评价</span>
          </div>
          <p class="meta">
            <span v-for="(item, ind) in detail_data.genres" :key="ind">{{item}}/</span>
            <span v-for="(item, inde) in detail_data.directors" :key="inde">{{item.name}}/</span>
            <span v-for="(item, index) in detail_data.casts" :key="index">{{item.name}}/</span>
            <span>{{detail_data.year}}年上映</span>
          </p>
        </div>
        <div class="right">
          <img :src="detail_data.images.small" alt="" width="100" height="140">
        </div>
      </div>
      <h2 class="summary-title">{{detail_data.title}}的剧情简介</h2>
      <div class="summary">{{detail_data.summary}}</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {getDetailData} from 'api/getTheaters'
import Star from 'components/star/star'
export default {
  data () {
    return {
      detail_data: []
    }
  },
  props: {
    detailId: {
      type: String
    }
  },
  created () {
    this._getDetailData()
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    window.pageYOffset = 0
  },
  methods: {
    _getDetailData (detailId) {
      detailId = parseInt(this.detailId)
      getDetailData(detailId).then((res) => {
        this.detail_data = res
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  watch: {
    '$route': '_getDetailData'
  },
  components: {
    Star
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .detail-wrapper
    position absolute
    top 0
    bottom 0
    width 100%
    z-index 100
    background #fff
    .detail
      margin 30px 18px 0 18px
      .title
        font-size 24px
        color #111
        margin-bottom 15px
      .description
        display flex
        justify-content space-between
        .left
          flex 1
          padding-right 10px
          font-size 14px
          color #494949
          .rank
            .star
              display inline-block
              .rank
                vertical-align top
              .score
                font-weight 700
                color #494949
                padding-right 8px
                vertical-align middle
            .ratings
              display inline-block
              color #aaa
          .meta
            margin-top 15px
            line-height 1.6
        .right
          flex 0 0 100px
      .summary-title
        margin 10px 0 15px
        color #aaa
      .summary
        font-size 15px
        color #494949
        line-height 22px
</style>
