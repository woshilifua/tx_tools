<template>
  <div id="map"></div>
</template>

<script>
import province from '@/data/province.js'

export default {
  data() {
    return {
      map: null,
      heatMap: null
    }
  },
  mounted() {
    this.initMap()
    this.$bus.$on('change-map-theme', val => {
      this.map.setMapStyle(`amap://styles/${val}`)
    })
    this.$bus.$on('load-heat-map-data', val => {
      this.loadHeatMapData(val)
    })
    this.$bus.$on('change-radius', val => {
      this.heatMap.setOptions({
        radius: val
      })
    })
  },
  methods: {
    initMap() {
      // eslint-disable-next-line
      this.map = new AMap.Map('map', {
        resizeEnable: true,
        center: [108.953098279, 34.2777998978],
        zoom: 5
      })
      this.initToolBar()
      this.initHeatMap()
    },
    initHeatMap() {
      this.map.plugin(
        ['AMap.Heatmap'],
        function() {
          // eslint-disable-next-line
          this.heatMap = new AMap.Heatmap(this.map, {
            radius: 25,
            opacity: [0, 0.8]
          })
        }.bind(this)
      )
    },
    initToolBar() {
      // eslint-disable-next-line
      this.map.plugin(
        ['AMap.ToolBar'],
        function() {
          // eslint-disable-next-line
          var tool = new AMap.ToolBar()
          this.map.addControl(tool)
        }.bind(this)
      )
    },
    loadHeatMapData(heatMapData) {
      this.heatMap.setDataSet({
        data: []
      })
      let data = this.formatData(heatMapData)
      this.heatMap.setDataSet({
        data: data,
        max: 100
      })
    },
    formatData(val) {
      let data = JSON.parse(val)
      let result = []
      data.forEach(function(item) {
        let obj = province[item.name]
        if (obj) {
          result.push({
            lng: obj.lg[0],
            lat: obj.lg[1],
            count: Number(item.value)
          })
        }
      })
      return result
    }
  }
}
</script>

<style scoped>
#map {
  height: calc(100vh - 61px);
}
</style>
