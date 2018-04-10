<template>
  <modifier symbol="+" class="dark-plus"></modifier>
</template>

<script>
import modifier from './Modifier'

export default {
  name: 'Dark-Plus',
  components: { modifier }
}
</script>

<style scoped>
  .atom {
    background-color: #050102 !important
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
    background-color: #050102;
    border-radius: 50%;
  }
  .atom::before {
    animation: infinite radiate-out 2000ms;
  }
  .atom::after {
    animation: infinite radiate-in 2000ms;
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