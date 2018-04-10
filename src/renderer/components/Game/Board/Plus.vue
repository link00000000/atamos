<template>
  <modifier symbol="+" class="plus"></modifier>
</template>

<script>
import modifier from './Modifier'

export default {
  name: 'Plus',
  components: { modifier }
}
</script>

<style scoped>
  .atom {
    background-color: #B03D38 !important
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
    background-color: #B03D38;
    border-radius: 50%;
    animation: infinite radiate-out 2000ms;
  }
  .atom::before {
    animation-delay: 0;
  }
  .atom::after {
    animation-delay: 200ms;
  }

  @keyframes radiate-out {
    0% {
      opacity: .5;
      transform: scale(1);
    }
    50%, 100% {
      opacity: 0;
      transform: scale(2);
    }
  }
</style>