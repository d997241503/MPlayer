<template>
  <div class="home">
    <Header ref="header"/>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'

export default {
  name: 'Home',
  components: {
    Header
  },
  watch: {
    '$route': function(val, oVal) {
      let index;
      if (val.path.indexOf('index') !== -1) {
        index = 0;
      } else if (val.path.indexOf('artist') !== -1) {
        index = 1;
      } else if (val.path.indexOf('toplist') !== -1) {
        index = 2;
      } else {
        index = 3;
      }
      this.$refs.header.currentTab = index;
      sessionStorage.setItem('curTab', index);
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  padding-bottom: 100px;
}
</style>
