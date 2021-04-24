<template>
  <div class="wrapper-bg">
    <div class="dj-recd m-layout">
      <h2 class="index-tit">歌曲推荐</h2>
      <el-carousel :autoplay="false" height="320px">
          <el-carousel-item v-for="(item, index) in djList" :key="index">
              <ul class="carousel-item">
                <li v-for="(item1, index) in item" :key="index" class="play-list-item">
                  <div class="img-wrapper" @click="songClick(item1.song)">
                    <img :src="item1.picUrl" alt="">
                  </div>
                  <p @click="songClick(item1.song)">{{item1.name}}</p>
                  <p>歌手：{{item1.song.artists[0].name}}</p>
                </li>
              </ul>
          </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>

export default {
  name:'',
  data() {
    return {
      tabs: [],
      djList: [],
      currentTab: 0
    }
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      this.getList()
    },
    getList() {
      this.$http.get('/personalized/newsong', {}).then((res) => {
        this.djList = []
        let pages = res.data.result.length >= 20 ? 3 : Math.ceil(res.data.result.length / 5);
        for(let i = 0; i < pages; i++){
          let arr = res.data.result.slice(i * 5, i * 5 + 5);
          this.djList.push(arr);
        }
      })
    },
    songClick(item) {
      let song = {
        pic: item.album.picUrl,
        id: item.id,
        artist: item.artists[0].name,
        name: item.name
      }
      this.$bus.$emit('play', song)
    }
  }
}
</script>

<style lang="less" scoped>
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
        color: #999;
        &:nth-of-type(1) {
          cursor: pointer;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          color: #000;
        }
        &:nth-of-type(1):hover {
          color: rgb(58, 163, 255);
        }
      }
    }
  }
</style>