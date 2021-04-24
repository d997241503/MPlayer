<template>
  <div class="artist m-layout">
    <div class="tags">
      <div class="tags-box">
        <div
          v-for="(item, index) in tagsData"
          :key="index"
          class="tags-row"
        >
          <span
            v-for="(item1, index1) in item.data"
            :key="index1"
            class="tags-row-item"
            :class="{'current': index1 === current[item.rowTag]}"
            @click="tagsChange(item.rowTag, item1.value, index1)"
          >{{item1.name}}</span>
        </div>
      </div>
    </div>
    <div class="artist-list">
      <div
        v-for="(item, index) in artistData"
        :key="index"
        class="artist-list-item"
      >
        <img :src="item.img1v1Url" alt="" @click="artistClick(item)">
        <span @click="artistClick(item)">{{item.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import tagsData from './tagsData'

export default {
  name:'',
  data() {
    return {
      tagsData,
      current: {
        initial: 0,
        type: 0,
        area: 0
      },
      queryParams: {
        type: -1,
        area: -1,
        initial: -1
      },
      artistData: []
    }
  },
  created() {
    this.getList();
  },
  methods: {
    tagsChange(rowTag, value, index) {
      this.current[rowTag] = index;
      this.queryParams[rowTag] = value;
      this.getList();
    },
    getList() {
      this.$http.get('/artist/list', {
        params: this.queryParams
      }).then((res) => {
        this.artistData = res.data.artists
      })
    },
    artistClick(item) {
      this.$router.push({
        path: '/artist-router/artist-detail',
        query: {
          id: item.id
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.artist {
  .tags {
    padding: 40px;
    text-align: left;
    .tags-row {
      margin: 20px 0;
      .tags-row-item {
        padding: 5px 12px;
        cursor: pointer;
        &:hover {
          color:  rgb(58, 163, 255);
        }
        &:nth-child(1) {
          margin-right: 15px;
        }
      }
      .tags-row-item.current {
        background-color:  rgb(58, 163, 255);
        color: #fff;
      }
    }
  }
  .artist-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .artist-list-item {
      width: 18%;
      padding: 25px 40px;
      box-sizing: border-box;
      img {
        width: 100%;
        border-radius: 50%;
        overflow: hidden;
        margin-bottom: 10px;
        cursor: pointer;
      }
      span {
        text-align: center;
        cursor: pointer;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        &:hover {
          color:  rgb(58, 163, 255);
        }
      }
    }
  }
}
</style>