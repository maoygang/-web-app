<template>
  <section>
    <header>
      <h2 class="title">{{des}}</h2>
      <a @click="getRouter(routerLink)" class="more">更多</a>
    </header>
    <div class="list-group">
      <ul class="item">
        <li @click="selectItem(item)" v-for="(item, index) in filmList" :key="index" class="item-list">
          <div class="item-bg" :style="{backgroundImage: 'url('+item.images.small+')'}"></div>
          <h1 class="title">{{item.title}}</h1>
          <div class="star-wrapper">
            <Star :score="item.rating.average" :stars="item.rating.stars"></Star>
          </div>
        </li>
      </ul>
    </div>
    <slot></slot>
  </section>
</template>

<script type="text/ecmascript-6">
import Star from 'components/star/star'
import {mapMutations} from 'vuex'
export default {
  props: {
    des: {
      type: String,
      default: ''
    },
    routerLink: {
      type: String
    },
    filmList: {
      type: Array
    },
    allData: {
      type: Array
    }
  },
  methods: {
    expandData () {
      this.setExpand(this.filmList)
    },
    selectItem (item) {
      this.$emit('select', item)
      this.$router.push({
        path: `/movie/detail/${item.id}`
      })
    },
    getRouter (routerLink) {
      this.$router.push({
        path: `/movie/${routerLink}`
      })
      this.setExpand(this.allData)
      this.setDes(this.des)
      this.$emit('selectRouter', routerLink)
    },
    ...mapMutations({
      setExpand: 'SET_EXPAND',
      setDes: 'SET_DES'
    })
  },
  components: {
    Star
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  section
    overflow hidden
    padding-top 10px
    header
      display flex
      justify-content space-between
      padding: 0 18px
      .title
        font-size 17px
      .more
        color #42bd56
    .list-group
      margin-bottom -18px
      .item
        white-space nowrap
        overflow-x auto
        padding 15px 0 43px 0
        .item-list
          display inline-block
          width 100px
          height 186px
          margin-left 7.5px
          &:nth-child(1)
            margin-left 18px
          &:last-child
            margin-right 18px
          .item-bg
            width 100%
            height 142px
            background-position center
            background-size cover
          .title
            max-width 100%
            font-size 15px
            overflow hidden
            white-space nowrap
            text-overflow ellipsis
            margin-top: 9.5px
            text-align center
          .star-wrapper
            margin-top 5px
</style>
