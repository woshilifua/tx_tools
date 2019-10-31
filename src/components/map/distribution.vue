<template>
  <div id="map"></div>
</template>
<script>
export default {
  data() {
    return {
      map: null,
      disProvince: null,
      codes: {}
    }
  },
  mounted() {
    this.initMap()
    this.$bus.$on('change-adcodes', val => {
      this.initProvince(val)
    })
    this.$bus.$on('change-map-theme', val => {
      this.map.setMapStyle(`amap://styles/${val}`)
    })
  },
  methods: {
    initMap() {
      // eslint-disable-next-line
      this.map = new AMap.Map('map', {
        resizeEnable: true,
        center: [108.953098279, 34.2777998978],
        zoom: 4
      })
      this.initToolBar()
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
    createDistrictLayer(code) {
      // eslint-disable-next-line
      return new AMap.DistrictLayer.Province({
        zIndex: 12,
        adcode: [code],
        depth: 0,
        styles: {
          fill: '#5692f2',
          'province-stroke': 'white',
          'city-stroke': 'white' // 中国地级市边界
        }
      })
    },
    initProvince(codes) {
      // 新增的状态
      this._.map(codes, code => {
        if (!this._.has(this.codes, code)) {
          this.codes[code] = this.createDistrictLayer(code)
          this.codes[code].setMap(this.map)
        }
      })
      // 删除的状态
      let codeKeys = this._.keys(this.codes)
      this._.map(codeKeys, code => {
        if (!this._.includes(codes, Number(code))) {
          this.codes[code].setMap(null)
          delete this.codes[code]
        }
      })
    }
  }
}
</script>

<style scoped>
#map {
  height: calc(100vh - 61px);
}
</style>
