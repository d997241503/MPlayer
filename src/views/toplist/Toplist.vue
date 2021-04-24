<template>
  <div class="toplist">
    <div class="main m-layout">
      <div class="toplist-nav">
        <ul>
          <li class="nav-item" v-for="(item, index) in navData" :key="index" :class="{'current': currentNav === index}">
            <a @click="navClick(item, index)" class="text">{{item.name}}</a>
          </li>
        </ul>
      </div>
      <PlayList :listData="playListData" style="width: calc(100% - 210px)"></PlayList>
    </div>
  </div>
</template>

<script>
import PlayList from '@/components/PlayListForm.vue'

export default {
  components: {
    PlayList
  },
  data() {
    return {
      currentNav: 0,
      navData: [],
      playListData: []
    }
  },
  async created() {
    await this.getNavList();
    this.getPlayList(this.navData[0].id);
  },
  methods: {
    navClick(item, index) {
      this.currentNav = index;
      this.getPlayList(item.id);
    },
    getNavList() {
      return this.$http.get('/toplist').then((res) => {
        this.navData = res.data.list;
      })
    },
    getPlayList(id) {
      this.$http.get('/playlist/detail', {
        params: {
          id
        }
      }).then((res) => {
        this.playListData = res.data.playlist.tracks;
      })
    }
  }
}
</script>

<style lang="less" scoped>
.toplist {
  .main {
    display: flex;
    justify-content: space-between;
  }
  padding-top: 60px;
  background-color:  rgb(249, 252, 255);
  .toplist-nav {
    width: 178px;
    border: 1px solid rgba(153,153,153,.2);
    padding-top: 20px;
    .nav-item {
      padding: 8px 17px;
      line-height: 22px;
      font-size: 15px;
      &:hover .text {
        color: rgb(58, 163, 255);
      }
    }
    .nav-item.current {
      background-color: rgb(58, 163, 255);
      a {
        color: #fff;
      }
    }
    .nav-item.current {
      &:hover .text{
        color: #fff;
      }
    }
  }
}
</style>