<template>
  <el-card class="theme-option" :body-style="{ padding: '6px' }">
    <el-radio-group v-model="theme" size="mini">
      <el-radio
        :label="theme.value"
        v-for="(theme, index) in themes"
        v-bind:key="index"
        >{{ theme.name }}</el-radio
      >
    </el-radio-group>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      theme: 'normal',
      themes: [
        { name: '标准', value: 'normal' },
        { name: '幻影黑', value: 'dark' },
        { name: '月光银', value: 'light' },
        { name: '远山黛', value: 'whitesmoke' },
        { name: '草色青', value: 'fresh' },
        { name: '雅士灰', value: 'grey' }
      ]
    }
  },
  watch: {
    theme: {
      handler: function(val) {
        this.$bus.$emit('change-map-theme', val)
      },
      immediate: false
    }
  }
}
</script>

<style scoped>
.theme-option {
  background-color: #fff;
  padding: 12px;
  position: absolute;
  bottom: 20px;
  left: 20px;
  text-align: left;
}
.theme-option label {
  display: block;
  height: 24px;
  line-height: 24px;
  margin-right: 0;
}
</style>
