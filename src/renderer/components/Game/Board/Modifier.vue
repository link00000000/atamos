<template>
  <atom atomicNumber=0></atom>
</template>

<script>
import atom from './Atom'

export default {
  name: 'Modifier',
  components: { atom },
  props: ['symbol'],
  mounted: function () {
    this.$el.querySelector('.symbol').innerHTML = this.symbol
    this.$el.querySelector('.number').innerHTML = ''
  }
}
</script>

<style>
</style>
