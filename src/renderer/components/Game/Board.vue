<template>
  <div class="board" v-on:click="moveAtom">
    <div v-for="atom in atoms">
      <atom v-bind:atomicNumber=atom.number :style="`left: ${atom.xOffset}px; top: ${atom.yOffset}px`"></atom> 
    </div>
  </div>
</template>

<script>
import atom from './Board/Atom'
import plus from './Board/Plus'
import minus from './Board/Minus'
import neutrino from './Board/Neutrino'
import darkPlus from './Board/DarkPlus'

export default {
  name: 'Board',
  components: { atom, plus, minus, neutrino, darkPlus },
  data () {
    return {
      atoms: [{number: 1, angle: 0, xOffset: 0, yOffset: 0}, {number: 1, angle: 0, xOffset: 0, yOffset: 0}, {number: 1, angle: 0, xOffset: 0, yOffset: 0}]
    }
  },
  methods: {

    moveAtom: function (e) {
      var currentAtom = this.$children[this.$children.length - 1].$el
      var xPos = e.offsetX - e.target.offsetWidth / 2
      var yPos = e.offsetY - e.target.offsetHeight / 2
      var angle = Math.atan2(yPos, xPos)
      var mag = e.target.offsetWidth / 2
      var atomSize = currentAtom.offsetWidth / 2
      var padding = 10
      var xOffset = (mag - atomSize - padding) * Math.cos(angle) + mag
      var yOffset = (mag - atomSize - padding) * Math.sin(angle) + mag

      for (var i = 0; i < this.atoms.length - 1; i++) {
        if (angle < this.atoms[i].angle) {
          this.atoms.splice(i, 0, this.atoms[this.atoms.length - 1])
          break
        }
      }
      this.atoms.pop()

      this.atoms[this.atoms.length - 1].angle = angle
      this.atoms[this.atoms.length - 1].xOffset = xOffset
      this.atoms[this.atoms.length - 1].yOffset = yOffset

      this.atoms.sort((a, b) => a.angle - b.angle)

      this.spawnAtom()
    },
    spawnAtom: function () {
      var atomicNumber = Math.floor(Math.random() * 124) + 1
      this.atoms.push({number: atomicNumber, angle: 0})
      console.log(this.atoms)
    }
  }
}
</script>

<style>
  .board {
    box-shadow: inset 0 0 0 2px #961d25;
    width: var(--board-size);
    height: var(--board-size);
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
  }
</style>
