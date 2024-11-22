<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <FloatLabel>
    <InputText id="username" v-model="value" />
    <label for="username">Username</label>
    </FloatLabel>
    <Button label="Toggle Dark Mode" @click="toggleDarkMode()" />

  </div>


</template>

<script>
import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext'; 
import Button from 'primevue/button';
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  data() {
    return {
      // Initialisation du tableau 'value'
      value: "test", // Exemple avec quelques éléments
    };
  },
  components: {
    FloatLabel, // Assurez-vous d'utiliser la bonne syntaxe
    InputText,
    Button
  }, 
  methods: {
    toggleDarkMode() {
      document.documentElement.classList.toggle('my-app-dark');
}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
