<template>
  <div class="content">
    <div id="map"></div>
    <el-card class="option">
      <p class="steps">
        使用
        <a href="https://www.bejson.com/json/col2json/" target="blank"
          >格式转换工具</a
        >
        将 excel 文件转换成 json 文件, 然后粘贴到下面输入框中
      </p>
      <el-input
        type="textarea"
        :rows="2"
        placeholder="请输入内容"
        :autosize="{ minRows: 5, maxRows: 25 }"
        v-model="heatMapData"
      >
      </el-input>
      <div class="option-1 mt-20">
        <el-tag effect="dark" size="mini">设置热力半径</el-tag>
        <el-slider v-model="option.radius" :show-tooltip="true"></el-slider>
      </div>
      <el-button type="primary" class="mt-10 fl" @click="loadHeatMapData"
        >绘制</el-button
      >
      <div class="clear"></div>
    </el-card>
    <MapTheme />
  </div>
</template>

<script>
import province from '@/data/province.js'
import MapTheme from '@/components/tools/map-theme'

export default {
  components: {
    MapTheme
  },
  data() {
    return {
      map: null,
      heatMap: null,
      heatMapData: JSON.stringify([
        { name: '安庆', value: '206' },
        { name: '蚌埠', value: '128' },
        { name: '亳州', value: '67' },
        { name: '池州', value: '71' },
        { name: '滁州', value: '123' },
        { name: '省直辖县级行政区划', value: '41' }
      ]),
      option: {
        radius: 25
      }
    }
  },
  mounted() {
    this.initMap()
    this.$bus.$on('change-map-theme', val => {
      this.map.setMapStyle(`amap://styles/${val}`)
    })
  },
  watch: {
    'option.radius': {
      handler: function(val) {
        if (!this.heatMapData) {
          return
        }
        this.heatMap.setOptions({
          radius: val
        })
      },
      immediate: false
    }
  },
  methods: {
    initMap() {
      // eslint-disable-next-line
      this.map = new AMap.Map('map', {
        resizeEnable: true,
        center: [108.953098279, 34.2777998978],
        zoom: 5
      })
      // eslint-disable-next-line
      this.map.plugin(
        ['AMap.Heatmap'],
        function() {
          console.log('heatmap')
          // eslint-disable-next-line
          this.heatMap = new AMap.Heatmap(this.map, {
            radius: this.option.radius,
            opacity: [0, 0.8]
          })
        }.bind(this)
      )
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
    loadHeatMapData() {
      if (!this.heatMapData) {
        return
      }
      this.heatMap.setDataSet({
        data: []
      })
      let data = this.formatData(this.heatMapData)
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
.content {
  position: relative;
}
#map {
  height: calc(100vh - 61px);
}
.option {
  position: absolute;
  top: 20px;
  color: #606266;
  right: 20px;
  width: 300px;
  text-align: left;
}
.steps {
  color: #606266;
  font-size: 12px;
}
</style>
