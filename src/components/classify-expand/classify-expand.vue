<template>
  <div class="classify-expand">
    <div class="item-wrapper" ref="show">
      <ul class="item">
        <li @click="selectId(item)" v-for="(item, index) in list" :key="index" class="item-list">
          <div class="item-bg" :style="{backgroundImage:'url('+ item.cover +')'}"></div>
          <h2 class="title">{{item.title}}</h2>
          <div class="star-wrapper">
            <startTwo :score="item.rate" :stars="item.rate"></startTwo>
          </div>
        </li>
      </ul>
      <infinite-loading @infinite="infiniteHandler" spinner="circles"></infinite-loading>
    </div>
    <router-view :detailId="detailId"></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import {getDetailClassify} from 'api/getTheaters'
import InfiniteLoading from 'vue-infinite-loading'
import startTwo from 'components/star-two/star-two'
export default {
  props: {
    tag: {
      type: String
    },
    index: {
      type: Number
    }
  },
  data () {
    return {
      list: [],
      detailId: ''
    }
  },
  methods: {
    infiniteHandler ($state) {
      let page = parseInt(this.list.length + 15)
      getDetailClassify(this.tag, page).then((res) => {
        if (!this.list.length) {
          document.documentElement.scrollTop = 0
          document.body.scrollTop = 0
          window.pageYOffset = 0
        }
        if (res.subjects.length) {
          this.list = []
          this.list = this.list.concat(res.subjects)
          $state.loaded()
          if (this.list.length >= 60) {
            $state.complete()
          }
        } else {
          $state.complete()
        }
      })
    },
    selectId (item) {
      this.detailId = item.id
      this.$router.push({
        path: `${this.index}/${this.detailId}`
      })
    },
    show () {
      setTimeout(() => {
        let reg = new RegExp(`/movie/${this.index}/${this.detailId}$`)
        if (reg.test(this.$route.path)) {
          this.$refs.show.style.display = 'none'
        } else {
          this.$refs.show.style.display = ''
        }
      }, 500)
    }
  },
  components: {
    InfiniteLoading,
    startTwo
  },
  watch: {
    '$route': 'show'
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .classify-expand
    .item-wrapper
      .item
        display flex
        justify-content space-between
        flex-wrap wrap
        width 100%
        margin-top 20px
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
            margin 0 auto
            padding-top 5px
            font-size 13px
            text-align center
            overflow hidden
            white-space nowrap
            text-overflow ellipsis
</style>
