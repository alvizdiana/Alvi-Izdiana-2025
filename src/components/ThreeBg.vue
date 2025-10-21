<script setup>
import { onMounted, onBeforeUnmount } from 'vue'

let vantaEffect = null

onMounted(() => {
  if (window.innerWidth > 768) {
    vantaEffect = window.VANTA?.BIRDS?.({
      el: document.getElementById('vanta-bg'),
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      colorMode: 'variance',
      birdSize: 0.7,
      wingSpan: 20.0,
      speedLimit: 4.0,
      separation: 50.0,
    })
  }
})

onBeforeUnmount(() => {
  if (vantaEffect) vantaEffect.destroy()
})
</script>

<template>
  <div id="vanta-bg"></div>
</template>

<style scoped>
#vanta-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  z-index: -1;
}
</style>
