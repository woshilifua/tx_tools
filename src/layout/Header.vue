<template>
  <div style="width: 100%">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-submenu index="hot-map">
        <template slot="title"
          >热力图</template
        >
        <el-menu-item index="nation-hot">
          <router-link tag="li" to="/hot-map/nation">全国热力图</router-link>
        </el-menu-item>
        <el-menu-item index="province-hot">省市热力图</el-menu-item>
      </el-submenu>
      <el-submenu index="distribution-map">
        <template slot="title"
          >区域分布图</template
        >
        <el-menu-item index="nation-distribution">全国分布图</el-menu-item>
        <el-menu-item index="province-distribution">省市分布图</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: 'hot-map'
    }
  },
  methods: {
    handleSelect() {}
  }
}
</script>
