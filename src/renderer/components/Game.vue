<template>
  <div id="wrapper">
    <board></board>
  </div>
</template>

<script>
  import board from './Game/Board'

  export default {
    name: 'Game',
    components: { board },
    methods: {

    }
  }
</script>

<style>
body {
  margin: 0;
  background: radial-gradient(#6F222E, #42212C);
  height: 100vh;
  width: 100vw;
}
</style>
