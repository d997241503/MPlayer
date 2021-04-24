<template>
  <div class="play-list">
    <div class="m-layout">
      <div class="header-box">
        <img :src="artistInfo.picUrl" alt="">
        <div class="msg-box">
          <p class="name">{{artistInfo.name}}</p>
          <div class="desc">简介：{{artistInfo.briefDesc}}</div>
          <ul class="statistic">
            <li class="statistic-item">
              <span class="tit">单曲</span>
              <span class="number">{{artistInfo.musicSize}}</span>
            </li>
            <li class="statistic-item">
              <span class="tit">专辑</span>
              <span class="number">{{artistInfo.albumSize}}</span>
            </li>
            <li class="statistic-item">
              <span class="tit">MV</span>
              <span class="number">{{artistInfo.mvSize}}</span>
            </li>
          </ul>
          <a class="play" href=""><i></i>播放</a>
        </div>
      </div>
      <div class="main-box">
        <h3 class="title">热门歌曲</h3>
        <PlayListForm :listData="hotSongs"></PlayListForm>
      </div>
    </div>
  </div>
</template>

<script>
import { playUnit } from '@/utils'
import PlayListForm from '@/components/PlayListForm.vue'

export default {
  name:'',
  components: {
    PlayListForm
  },
  data() {
    return {
      artistInfo: {},
      hotSongs: []
    }
  },
  activated() {
    this.getArtistInfo()
  },
  methods: {
    playUnit,
    getArtistInfo() {
      this.$http.get('/artists', {
        params: {
          id: this.$route.query.id
        }
      }).then((res) => {
        this.artistInfo = res.data.artist;
        this.hotSongs = res.data.hotSongs;
      })
    }
  }
}
</script>

<style lang="less" scoped>
.play-list {
  background-color: rgb(249, 252, 255);
  .header-box {
    height: 250px;
    padding: 40px 0;
    display: flex;
    justify-content: space-between;
    img {
      width:250px;
      height: 250px;
      border-radius: 50%;
      overflow: hidden;
    }
    .msg-box {
      width: 900px;
      padding-top: 20px;
      text-align: left;
      .name {
        font-size: 31px;
        line-height: 50px;
        font-weight: 400;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 70%;
      }
      .desc {
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 3;
        display: -webkit-box;
        -webkit-box-orient: vertical;
      }
      .play {
        display: inline-block;
        text-align: center;
        margin-top: 10px;
        padding: 8px 22px;
        background-color: rgb(58, 163, 255);
        color: #fff;
        border-radius: 2px;
        font-size: 14px;
        &:hover {
          background-color:  rgb(2, 137, 255);
        }
        i {
          display: inline-block;
          width: 13px;
          height: 16px;
          background-position: -80px -220px;
          vertical-align: -3px;
          background-image: url('../../assets/icon_sprite.png');
        }
      }
    }
  }
  .main-box {
    .title {
      font-size: 24px;
      font-weight: 400;
      line-height: 58px;
      font-family: \5FAE\8F6F\96C5\9ED1;
      text-align: left;
    }
  }
  .statistic {
    margin-top: 8px;
    line-height: 23px;
    .statistic-item {
      display: inline-block;
      border-right: solid 1px #c9c9c9;
      text-align: center;
      padding-right: 20px;
      margin-right: 20px;
      font-size: 18px;
      .tit {
        font-size: 18px;
      }
      .number {
        font-size: 25px;
        font-weight: 400;
        margin-left: 10px;
        font-family: monospace,poppin,Tahoma,Arial;
      }
    }
  }
}
</style>