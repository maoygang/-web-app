<template>
  <div class="page">
    <keep-alive>
      <slot></slot>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
export default {}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .page
    position absolute
    top 47px
    bottom 0
    left 50%
    width 100%
    max-width 650px
    margin 0 auto
    transform translateX(-50%)
</style>
