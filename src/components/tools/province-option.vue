<template>
  <el-card class="option">
    <el-checkbox class="fl" v-model="all">全选</el-checkbox>
    <div class="clear"></div>
    <el-checkbox-group v-model="checkedAdCodes" class="mt-10">
      <el-checkbox
        v-for="(item, index) in adCodes"
        :label="item.adcode"
        :key="index"
        class="check-label"
        >{{ item.name }}</el-checkbox
      >
    </el-checkbox-group>
    <div class="clear"></div>
  </el-card>
</template>

<script>
import adcodes from '@/data/adcodes'
export default {
  data() {
    return {
      all: false,
      checkedAdCodes: [],
      adCodes: adcodes
    }
  },
  watch: {
    checkedAdCodes: {
      handler(val) {
        this.$bus.$emit('change-adcodes', val)
      },
      immediate: false
    },
    all: {
      handler(val) {
        this.checkedAdCodes = []
        if (val) {
          this._.map(this.adCodes, adCode => {
            this.checkedAdCodes.push(adCode.adcode)
          })
        }
      },
      immediate: false
    }
  },
  methods: {}
}
</script>
<style scoped>
.option {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 300px;
}
.check-label {
  width: 90px;
  text-align: left;
  float: left;
}
</style>
