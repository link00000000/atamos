<template>
  <modifier symbol="-" class="minus"></modifier>
</template>

<script>
import modifier from './Modifier'

export default {
  name: 'Minus',
  components: { modifier }
}
</script>

<style scoped>
  .atom {
    background-color: #3B79C6 !important
  }
  .atom::before, .atom::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    display: inline-block;
    z-index: -1;
    width: 100%;
    height: 100%;
    background-color: #3B79C6;
    border-radius: 50%;
    animation: infinite radiate-in 2000ms;
  }
  .atom::before {
    animation-delay: 0;
  }
  .atom::after {
    animation-delay: 200ms;
  }

  @keyframes radiate-in {
    0% {
      opacity: 0;
      transform: scale(2);
    }
    50%, 100% {
      opacity: .5;
      transform: scale(1);
    }
  }
</style>