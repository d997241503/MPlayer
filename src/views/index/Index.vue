<template>
  <div class="index">
    <PlayListRecd/>
    <DjRecd/>
  </div>
</template>

<script>
import PlayListRecd from './comps/PlayListRecd.vue'
import DjRecd from './comps/DjRecd.vue'

export default {
  name: 'Index',
  components: {
    PlayListRecd,
    DjRecd
  }
}
</script>

<style lang="less" scoped>
/deep/ .wrapper-bg {
  padding: 50px 0 30px;
  background: linear-gradient(to bottom, rgb(249, 252, 255), rgb(237, 246, 255));
  .index-tit {
    padding-bottom: 30px;
    font-size: 30px;
    font-weight: 500;
    letter-spacing: 8px;
  }
  .index-tab {
    height: 50px;
    text-align: center;
    .item {
      margin: 0 24px;
      cursor: pointer;
      &:hover {
        color: rgb(58, 163, 255);
      }
    }
    .item.current {
      color: rgb(58, 163, 255);
    }
  }
}
</style>
