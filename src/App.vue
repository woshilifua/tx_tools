<template>
  <div id="app">
    <el-header><Header /></el-header>
    <el-container>
      <el-main>
        <router-view v-if="mapLoaded" />
      </el-main>
    </el-container>
  </div>
</template>
<script>
import Header from '@/components/Header'
import remoteLoad from '@/utils/remoteLoad'
export default {
  components: {
    Header
  },
  data() {
    return {
      mapLoaded: false
    }
  },
  beforeMount() {
    console.log(this)
    this.loadMap()
  },
  methods: {
    async loadMap() {
      // TODO 地图加载出错的处理
      await remoteLoad(process.env.VUE_APP_MAP_API_URL)
      await remoteLoad(process.env.VUE_APP_MAP_UI_API_URL)
      this.mapLoaded = true
    }
  }
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
* {
  box-sizing: border-box;
}
.el-header {
  padding: 0 !important;
}
.el-main {
  padding: 0 !important;
}
.mt-10 {
  margin-top: 10px !important;
}
.mt-20 {
  margin-top: 20px !important;
}
.fl {
  float: left;
}
.clear {
  clear: both;
}
</style>
