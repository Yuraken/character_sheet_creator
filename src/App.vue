<template>
  <CharacterFormular/>
</template>

<script>
import CharacterFormular from './components/CharacterFormular.vue';

export default {
  name: 'App',
  components: {
    CharacterFormular
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

@font-face {
    font-family: Edo;
    src: url('~@/assets/edosz.ttf');
}
</style>
