<template>
  <div class="header m-layout">
        <div class="logo" @click="$router.push({path: '/'})">
            <img src="/logo.ico" alt="">
            <span>MPlayer</span>
        </div>
        <div class="nav">
            <div v-for="(item, index) in navTabs" :key="index" class="item" @click="navClick(item, index)" :class="{'current':currentTab === index}">{{item.tabName}}</div>
        </div>
        <div class="search">
            <input type="text" placeholder="搜索音乐" v-model="inputVal">
            <div class="btn" @click="search()">搜索</div>
        </div>
  </div>
</template>

<script>

export default {
  name: 'Header',
  data() {
    return {
      navTabs: [
        {
          tabName: '首页',
          tabRouter: '/index-router'
        },
        {
          tabName: '歌手',
          tabRouter: '/artist-router'
        },
        {
          tabName: '排行榜',
          tabRouter: '/toplist'
        }
      ],
      currentTab: 0,
      inputVal: ''
    }
  },
  mounted() {
    this.currentTab = +sessionStorage.getItem('curTab') || 0;
  },
  methods: {
    navClick(item, index) {
      if (index === this.currentTab) return;
      this.$router.push({path: item.tabRouter});
    },
    search() {
      if (!this.inputVal) return
      if (this.currentTab === 3) {
        this.$bus.$emit('search', this.inputVal);
      } else {
        this.$router.push({
          path: '/search',
          query: {
            keyWords: this.inputVal
          }
        });
      }
    }
  }
}
</script>

<style lang="less" scoped>
    .header {
        height: 90px;
        display: flex;
        border-bottom: 1px solid #f2f2f2;
        .logo {
            height: 100%;
            width: 180px;
            display: flex;
            align-items: center;
            cursor: pointer;
            img {
                height: 50px;
                margin-right: 10px;
            }
            span {
                font-size: 30px;
                font-family: 'Comic Sans MS', Arial;
            }
        }
        .nav {
            display: flex;
            padding: 10px 0;
            margin-left: 20px;
            .item {
                padding: 0 30px;
                line-height: 70px;
                cursor: pointer;
                transition: .3s;
                font-size: 20px;
                &:hover {
                    background-color: rgb(58, 163, 255);
                    color: #fff;
                }
            }
            .item.current {
              background-color: rgb(58, 163, 255);
              color: #fff;
            }
        }
        .search {
            margin-left: 260px;
            display: flex;
            align-items: center;
            input {
                height: 30px;
                text-indent: 4px;
                border: 1px solid #c9c9c9;
                border-radius: 3px;
                font-size: 14px;
            }
            .btn {
                height: 34px;
                line-height: 34px;
                color: #fff;
                padding: 0px 20px;
                margin-left: -10px;
                border-radius: 3px;
                background-color: rgb(58, 163, 255);
                transition: .3s;
                cursor: pointer;
                &:hover {
                    background-color:  rgb(2, 137, 255);
                }
            }
        }
    }
</style>
