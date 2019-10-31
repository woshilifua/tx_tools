<template>
  <div class="content">
    <DistributionMap />
    <MapTheme />
    <ProvinceOption />
  </div>
</template>

<script>
import DistributionMap from '@/components/map/distribution'
import ProvinceOption from '@/components/tools/province-option'
import MapTheme from '@/components/tools/map-theme'

export default {
  components: {
    DistributionMap,
    ProvinceOption,
    MapTheme
  },
  mounted() {},
  methods: {}
}
</script>

<style scoped>
.content {
  position: relative;
}
</style>
