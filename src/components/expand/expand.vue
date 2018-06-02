<template>
  <div>
    <div class="expand" ref="show">
      <h1 class="BTitle">{{des}}</h1>
      <div class="item-wrapper">
        <ul class="item">
          <li @click="selectId(item)" v-for="(item, index) in expand" :key="index" class="item-list">
            <div class="item-bg" :style="{backgroundImage:'url('+ item.images.small +')'}"></div>
            <h2 class="title">{{item.title}}</h2>
            <div class="star-wrapper">
              <Star :score="item.rating.average" :stars="item.rating.stars"></Star>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <router-view :detailId="id"></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import Star from 'components/star/star'
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      id: '',
      link: ''
    }
  },
  props: {
    title: {
      type: String
    },
    filmList: {
      type: Array
    },
    allData: {
      type: Array
    },
    routerLink: {
      type: String
    }
  },
  created () {
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    window.pageYOffset = 0
  },
  methods: {
    selectId (item) {
      this.id = item.id
      this.$emit('select', item)
      this.$router.push({
        path: `/movie/${this.routerLink}/${item.id}`
      })
    },
    show () {
      setTimeout(() => {
        let reg = new RegExp(`/movie/${this.routerLink}$`)
        if (reg.test(this.$route.path)) {
          this.$refs.show.style.display = ''
        } else {
          this.$refs.show.style.display = 'none'
        }
      }, 500)
    }
  },
  computed: {
    ...mapGetters([
      'expand',
      'des'
    ])
  },
  mounted () {
    this.$on('selectRouter', (routerLink) => {
      this.link = routerLink
    })
  },
  components: {
    Star
  },
  watch: {
    '$route': 'show'
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .expand
    position absolute
    top 0
    bottom 0
    max-width 650px
    width 100%
    height 100%
    background #fff
    .BTitle
      margin 16px 0 6px
      padding-left 14px
      font-size 24px
      font-weight normal
      color #494949
    .item-wrapper
      width 100%
      padding 20px 0
      .item
        display flex
        justify-content space-between
        flex-wrap wrap
        width 100%
        height 100%
        .item-list
          width 120px
          margin-bottom 20px
          .item-bg
            width 90px
            height 130px
            margin 0 auto
            background-size cover
            background-repeat no-repeat
            background-position center
          .title
            width 90px
            margin 5px auto 0 auto
            padding-top 5px
            font-size 13px
            text-align center
            overflow hidden
            white-space nowrap
            text-overflow ellipsis
          .star-wrapper
            margin-top 4px
</style>
