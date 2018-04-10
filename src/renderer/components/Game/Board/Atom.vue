<template>
  <div class="atom" :style="`background-color: ${require('./atoms.json')[atomicNumber].color}`">
    <div class="symbol">{{ require('./atoms.json')[atomicNumber].symbol }}</div>
    <div class="number">{{ atomicNumber }}</div>
  </div>
</template>

<script>
export default {
  name: 'Atom',
  props: ['atomicNumber'],
  methods: {

  }
}
</script>

<style>
.atom {
  display: inline-block;
  width: var(--atom-size);
  height: var(--atom-size);
  border-radius: 50%;
  color: #fff;
  user-select: none;
  cursor: default;
  position: absolute;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, .1);
  left: calc(var(--board-size) * .5);
  top: calc(var(--board-size) * .5);
  transform: translate(-50%, -50%);
  pointer-events: none;
  animation: spawn 250ms ease-out;
  transition: top 200ms, left 200ms;
}

.atom .symbol {
  font-size: calc(var(--atom-size) * .35);
  line-height: var(--atom-size);
  text-align: center;
  font-family: Helvetica, Arial, sans-serif;
}

.atom .number {
  font-size: calc(var(--atom-size) * .22);
  position: absolute;
  left: 50%;
  top: 80%;
  transform: translate(-50%, -50%);
  font-family: Helvetica, Arial, sans-serif;
  opacity: .6;
}

@keyframes spawn {
  0% {
    transform: translate(-50%, -50%) scale(0)
  }
  80% {
    transform: translate(-50%, -50%) scale(1.1)
  }
  100% {
    transform: translate(-50%, -50%) scale(1)
  }
}

@keyframes pop {
  0% {
    transform: translate(-50%, -50%) scale(1.1)
  }
  100% {
    transform: translate(-50%, -50%) scale(1)
  }
}
</style>

