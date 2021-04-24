<template>
  <div class="m-layout">
    <PlayListForm :listData="listData"></PlayListForm>
  </div>
</template>

<script>
import PlayListForm from '@/components/PlayListForm'

export default {
  name:'',
  components: {
    PlayListForm
  },
  data() {
    return {
      listData: []
    }
  },
  created() {
    this.$bus.$on('search', (keyWords) => {
      this.getListData(keyWords)
    })
  },
  activated() {
    this.getListData(this.$route.query.keyWords)
  },
  methods: {
    getListData(keyWords) {
      this.$http.get('/cloudsearch', {
        params: {
          limit: 15,
          keywords: keyWords
        }
      }).then((res) => {
        this.listData = res.data.result.songs;
      })
    }
  }
}
</script>

<style scoped>

</style>