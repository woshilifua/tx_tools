<template>
  <div class="content">
    <GDMap />
    <MapOption />
    <MapTheme />
  </div>
</template>

<script>
import MapTheme from '@/components/tools/map-theme'
import MapOption from '@/components/tools/map-option'
import GDMap from '@/components/gaode-map'

export default {
  components: {
    GDMap,
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
