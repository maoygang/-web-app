<template>
  <div ref="wrapper" class="trashiness">
    <div class="movie" ref="show">
      <section-view @select="getId"
                    @selectRouter="getRoute"
                    :allData="all_theaters"
                    :des="in_theaters"
                    :filmList="theaters"
                    :routerLink="router_in_theaters">
      </section-view>
      <section-view  @select="getId"
                     @selectRouter="getRoute"
                     :allData="allTop250Data"
                     :des="top250"
                     :filmList="top250Data"
                     :routerLink="top250">
      </section-view>
      <section-view  @select="getId"
                     @selectRouter="getRoute"
                     :allData="all_comingSoon"
                     :des="coming_soon"
                     :filmList="comingSoon"
                     :routerLink="router_coming_soon">
      </section-view>
      <div class="classify-wrapper">
        <classify @selectTag="choose" @selectIndex="chooseIndex"></classify>
      </div>
      <m-footer></m-footer>
    </div>
    <router-view name="classify" :tag="tag" :index="index"></router-view>
    <router-view :detailId="detailId" :routerLink="routerLink"></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import sectionView from 'components/section/section'
import classify from 'components/classify/classify'
import MFooter from 'components/m-footer/m-footer'
import {getTheaters, getComingSoon, getTop250} from 'api/getTheaters'

const CHOOSE = 8

export default {
  data () {
    return {
      in_theaters: '影院热映',
      coming_soon: '即将上映',
      top250: 'Top250',
      router_in_theaters: 'in_theaters',
      router_coming_soon: 'coming_soon',
      router_top250: 'top250',
      theaters: [],
      all_theaters: [],
      comingSoon: [],
      all_comingSoon: [],
      top250Data: [],
      allTop250Data: [],
      detailId: '',
      routerLink: '',
      tag: '',
      index: ''
    }
  },
  created () {
    this._getIntheater()
    this._getTop250()
    this._getComingSoon()
  },
  methods: {
    choose (item) {
      this.tag = item
    },
    chooseIndex (index) {
      this.index = index
    },
    show () {
      setTimeout(() => {
        if (this.$route.path === '/movie' || this.$route.path === '/movie/') {
          this.$refs.show.style.display = ''
        } else {
          this.$refs.show.style.display = 'none'
        }
      }, 500)
    },
    getRoute (routerLink) {
      this.routerLink = routerLink
    },
    getId (item) {
      this.detailId = item.id
    },
    _getIntheater () {
      getTheaters().then((res) => {
        this.all_theaters = res.subjects
        this.theaters = res.subjects.splice(0, CHOOSE)
      }).catch((err) => {
        console.log(err)
      })
    },
    _getTop250 () {
      getTop250().then((res) => {
        this.top250Data = res.subjects.splice(0, CHOOSE)
        this.allTop250Data = res.subjects
      }).catch((err) => {
        console.log(err)
      })
    },
    _getComingSoon () {
      getComingSoon().then((res) => {
        this.comingSoon = res.subjects.splice(0, CHOOSE)
        this.all_comingSoon = res.subjects
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  components: {
    sectionView,
    classify,
    MFooter
  },
  watch: {
    '$route': 'show'
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .trashiness
    position absolute
    top 0
    bottom 0
    left 0
    right 0
</style>
