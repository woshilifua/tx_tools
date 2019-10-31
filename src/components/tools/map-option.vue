<template>
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
      :autosize="{ minRows: 10, maxRows: 10 }"
      v-model="heatMapData"
    >
    </el-input>
    <div class="option-1 mt-20">
      <el-tag effect="dark" size="mini">设置热力半径</el-tag>
      <el-slider v-model="radius" :show-tooltip="true"></el-slider>
    </div>
    <el-button type="primary" class="mt-10 fl" @click="loadHeatMapData"
      >绘制</el-button
    >
    <div class="clear"></div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      radius: 25,
      heatMapData: null
    }
  },
  watch: {
    radius: {
      handler: function(val) {
        if (!this.heatMapData) {
          return
        }
        this.$bus.$emit('change-radius', val)
      },
      immediate: false
    }
  },
  methods: {
    loadHeatMapData() {
      this.$bus.$emit('load-heat-map-data', this.heatMapData)
    }
  }
}
</script>

<style scoped>
.option {
  position: absolute;
  top: 20px;
  color: #606266;
  right: 20px;
  width: 300px;
  text-align: left;
  min-height: 420px;
}
.steps {
  color: #606266;
  font-size: 12px;
}
</style>
