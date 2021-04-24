<template>
  <div class="play-list">
    <div class="m-layout">
      <div class="header-box">
        <img :src="playList.coverImgUrl" alt="">
        <div class="msg-box">
          <p class="name">{{playList.name}}</p>
          <p class="author">
            <i></i>
            <span>{{playList.creator && playList.creator.nickname}}</span>
          </p>
          <p class="count">播放量：{{playUnit(playList.playCount)}}</p>
          <p class="count">收藏量：{{playUnit(playList.subscribedCount)}}</p>
          <p class="count">歌曲数量：{{playList.trackCount}}</p>
          <a class="play" @click="play()"><i></i>播放</a>
        </div>
      </div>
      <div class="main-box">
        <PlayListForm ref="listForm" :listData="playList.tracks" style="width:880px"></PlayListForm>
        <div class="description">
          <h3>简介</h3>
          <p>{{playList.description}}</p>
        </div>
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
      playList: {}
    }
  },
  activated() {
    this.getPlayListInfo()
  },
  methods: {
    playUnit,
    getPlayListInfo() {
      this.$http.get('/playlist/detail', {
        params: {
          id: this.$route.query.id
        }
      }).then((res) => {
        this.playList = res.data.playlist;
      })
    },
    play() {
      this.$refs.listForm.songClick(this.$refs.listForm.listData[0]);
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
      .count {
        margin-bottom: 3px;
        font-size: 14px;
      }
      .author {
        padding-bottom: 8px;
        i {
          display: inline-block;
          width: 16px;
          height: 16px;
          background-position: -20px -240px;
          margin: 5px 7px 0 0;
          background-image: url('../../assets/icon_sprite.png');
        }
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
    display: flex;
    justify-content: space-between;
    .description {
      width: 280px;
      text-align: left;
      font-size: 14px;
      font-family: Microsoft Yahei UI Light,Microsoft Yahei Light;
      h3 {
        font-size: 20px;
        font-weight: 400;
        line-height: 46px;
      }
    }
  }
}
</style>