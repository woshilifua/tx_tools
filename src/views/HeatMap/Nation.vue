<template>
  <div class="content">
    <HeatMap />
    <MapOption />
    <MapTheme />
  </div>
</template>

<script>
import MapTheme from '@/components/tools/map-theme'
import MapOption from '@/components/tools/map-option'
import HeatMap from '@/components/map/heat'

export default {
  components: {
    HeatMap,
    MapTheme,
    MapOption
  }
}
</script>
<style scoped>
.content {
  position: relative;
}
</style>
