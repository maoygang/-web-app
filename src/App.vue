<template>
  <div id="app">
    <m-header></m-header>
    <page>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </page>
  </div>
</template>

<script>
import MHeader from 'components/m-header/m-header'
import page from 'base/page/page'
export default {
  components: {
    MHeader,
    page
  }
}
</script>

<style>

</style>
