<template>
  <div class="playlist">
    <ul class="list-header">
      <li class="blank"></li>
      <li class="name">歌曲</li>
      <li class="author">歌手</li>
      <li class="time">时长</li>
    </ul>
    <ul class="list-body">
      <li class="list-item" v-for="(item, index) in listData" :key="index">
        <div class="number">{{index + 1}}</div>
        <div class="name"><a @click="songClick(item)">{{item.name}}</a></div>
        <div class="artist"><a @click="artistClick(item.ar[0].id)">{{item.ar[0].name}}</a></div>
        <div class="time">{{ item.dt | songTime}}</div>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name:'',
  data() {
    return {
    }
  },
  props: {
    listData: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    songClick(item) {
      let song = {
        pic: item.al.picUrl,
        id: item.id,
        artist: item.ar[0].name,
        name: item.name
      }
      this.$bus.$emit('play', song)
    },
    artistClick(id) {
      this.$router.push({
        path: '/artist-router/artist-detail',
        query: {
          id
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.playlist {
  text-align: left;
  .list-header {
    line-height: 50px;
    height: 50px;
    display: flex;
    background-color: rgb(245, 247, 255);
    color: #999;
    .blank {
      width: 8%;
    }
    .name {
      width: 56%;
    }
    .author {
      width: 23%;
    }
    .time {
      width: 13%;
    }
  }
  .list-body {
    .list-item {
      height: 80px;
      line-height: 80px;
      display: flex;
      &:nth-child(2n) {
        background-color: rgb(245, 247, 255);
      }
      .number {
        width: 8%;
        text-align: center;
        font-size: 24px;
        color: #999;
        font-family: Microsoft Yahei UI Light,Microsoft Yahei Light;
      }
      .name {
        width: 56%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        a:hover {
          color:  rgb(58, 163, 255);
        }
      }
      .artist {
        width: 23%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        a:hover {
          color:  rgb(58, 163, 255);
        }
      }
      .time {
        color: #999;
        width: 13%;
        font-family: Microsoft Yahei UI Light,Microsoft Yahei Light;
      }
    }
  }
}
</style>