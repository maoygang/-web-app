<template>
  <div class="classify">
    <h1 class="title">分类浏览</h1>
    <div class="list-content">
      <ul class="item">
        <li @click="choose(item, index)"
            v-for="(item, index) in list"
            :key="index" class="item-list"
            >{{item}}<span></span></li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {getDetailList} from 'api/getTheaters'
export default {
  data () {
    return {
      list: []
    }
  },
  created () {
    this._getDetailList()
  },
  methods: {
    _getDetailList () {
      getDetailList().then((res) => {
        this.list = res.tags
      }).catch((err) => {
        console.log(err)
      })
    },
    choose (item, index) {
      this.$emit('selectTag', item)
      this.$emit('selectIndex', index)
      this.$router.push({
        path: `/movie/${index}`
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/base.styl"
  .classify
    .title
      padding-left 18px
      font-size 17px
    .list-content
      margin-left 15px
      .item
        display flex
        flex-wrap wrap
        width 100%
        padding-top 18px
        .item-list
          width 42%
          height 42px
          line-height 42px
          padding-right 20px
          border-right 1px solid #eee
          border-top 1px solid #eee
          color #42bd56
          font-size 14px
          liWidth()
          &:nth-child(even)
            padding-left 18px
            border-right none
          span
            display inline-block
            float right
            width 8px
            height 8px
            margin-top 16px
            border-right 1px solid #ccc
            border-bottom 1px solid #ccc
            transform rotate(-45deg)
</style>
