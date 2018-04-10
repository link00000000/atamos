<template>
  <div id="app">
    <game></game>
  </div>
</template>

<script>
  import game from '@/components/Game'

  export default {
    name: 'atomas',
    components: {
      game
    }
  }
</script>

<style>
   @import url('https://fonts.googleapis.com/css?family=Arimo');

  :root {
    --board-size: 80vmin;
    --atom-size: calc(var(--board-size) * .1286);
  }
</style>
