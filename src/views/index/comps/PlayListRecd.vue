<template>
  <div class="wrapper-bg">
    <div class="play-list-recd m-layout">
      <h2 class="index-tit">歌单推荐</h2>
      <div class="index-tab">
        <a class="item" v-for="(item, index) in tabs" :key="index" :class="{'current': currentTab === index}" @click="tabClick(item, index)">{{item.name}}</a>  
      </div>
      <el-carousel :autoplay="false" height="320px">
          <el-carousel-item v-for="(item, index) in playList" :key="index">
              <ul class="carousel-item">
                <li v-for="(item1, index) in item" :key="index" class="play-list-item">
                  <div class="img-wrapper">
                    <img :src="item1.coverImgUrl" alt="" @click="playListClick(item1)">
                  </div>
                  <p :title="item.name" @click="playListClick(item1)">{{item1.name}}</p>
                  <p>播放量：{{playUnit(item1.playCount)}}</p>
                </li>
              </ul>
          </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import { playUnit } from '@/utils'

export default {
  name:'',
  data() {
    return {
      tabs: [],
      playList: [],
      currentTab: 0
    }
  },
  created() {
    this.initData();
  },
  methods: {
    playUnit,
    tabClick(item, index) {
      if (this.currentTab === index) {
        return
      }
      this.currentTab = index;
      this.getList(item.name)
    },
    initData() {
      this.$http.get('/playlist/highquality/tags').then(res => {
      let index = Math.floor(Math.random() * (res.data.tags.length - 4));
      this.tabs = res.data.tags.slice(index, index + 5);
      }).then(() => {
        this.getList(this.tabs[0].name);
      })
    },
    getList(name) {
      this.$http.get('/top/playlist/highquality', {
        params: {
          cat: name
        }
      }).then((res) => {
        this.playList = []
        let pages = res.data.playlists.length >= 20 ? 3 : Math.ceil(res.data.playlists.length / 5);
        for(let i = 0; i < pages; i++){
          let arr = res.data.playlists.slice(i * 5, i * 5 + 5);
          this.playList.push(arr);
        }
      })
    },
    playListClick(item) {
      this.$router.push({
        path: '/index-router/playlist',
        query: {
          id: item.id
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
.play-list-recd {
  .carousel-item {
    display: flex;
    .play-list-item {
      &:nth-child(-n+4) {
        margin-right: 2.5%;
      }
      width: 18%;
      .img-wrapper {
        width: 216px;
        height: 216px;
        overflow: hidden;
        margin-bottom: 15px;
      }
      img {
        width: 100%;
        height: 100%;
        cursor: pointer;
        transition: .3s;
        &:hover {
          transform: scale(1.2);
        }
      }
      p {
        text-align: left;
        font-size: 14px;
        &:nth-of-type(1) {
          cursor: pointer;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        &:nth-of-type(1):hover {
          color: rgb(58, 163, 255);
        }
        &:nth-of-type(2) {
          color: #999;
        }
      }
    }
  }
}
</style>