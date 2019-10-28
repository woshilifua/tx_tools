<template>
  <div class="content">
    <div id="map"></div>
    <div class="option">
      <el-card>
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          :autosize="{ minRows: 5, maxRows: 100}"
          v-model="heatMapData"
          >
        </el-input>
        <el-button type="primary" class="mt-10 fl" @click="loadHeatMapData">绘制</el-button>
      </el-card>
    </div>
  </div>
</template>

<script>
import province from '@/data/province.js'

export default {
  data() {
    return {
      map: null,
      heatMap: null,
      heatMapData: null
    }
  },
  mounted() {
    this.initMap()
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
      this.map.plugin(['AMap.Heatmap'], function () {
        // eslint-disable-next-line
        this.heatmap = new AMap.Heatmap(this.map, {
            radius: 25,
            opacity: [0, 0.8]
        })
      }.bind(this))
    },
    loadHeatMapData() {
      if (!this.heatMapData) {
        return
      }
      let data = this.formatData(this.heatMapData)
      this.heatmap.setDataSet({
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
            'lng': obj.lg[0],
            'lat': obj.lg[1],
            'count': Number(item.value)
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
  right: 20px;
  width: 300px;
}
</style>
