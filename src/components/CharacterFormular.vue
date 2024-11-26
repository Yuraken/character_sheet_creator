<template>
  <div>
    <Form v-slot="$form" :initialValues="initialValues" @submit="onFormSubmit" class="grid lg:grid-cols-2 gap-4 w-full">
      <div class="flex flex-col justify-center items-center gap-4">
        <InputText name="username" type="text" placeholder="Username" class="w-full sm:w-56" />
      </div>
      <div class="flex flex-col justify-center items-center gap-4">
        <InputText name="Level" type="text" placeholder="Level" class="w-full sm:w-56" />
      </div>
      <div class="flex flex-col justify-center items-center gap-4">
        <Select v-model="playbookSelected" :options="playbooks" optionLabel="name" placeholder="Playbook"
          class="w-full md:w-56" name="playbook" />

      </div>
      <div class="flex flex-col justify-center items-center gap-4" v-if="playbookSelected">
        <Select v-model="manoeuvresSelected" :options="manoeuvres[playbookSelected.value]" optionLabel="name"
          placeholder="Playbook" class="w-full md:w-56" name="playbook" />
      </div>
      <!-- <Editor v-model="skill" editorStyle="height: 320px" /> -->
      <Fieldset legend="Form States" class="h-10 overflow-hidden">
        <pre class="whitespace-pre-wrap">{{ $form }}</pre>
      </Fieldset>
    </Form>
    <Button label="Toggle Dark Mode" @click="toggleDarkMode()" />

  </div>


</template>

<script>
// import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { Form } from '@primevue/forms';
import Select from 'primevue/select';
// import Editor from 'primevue/editor';
export default {
  name: 'CharacterFormular',
  props: {},
  data() {
    return {
      // Initialisation du tableau 'value'
      value: "test", // Exemple avec quelques éléments,
      initialValues: { username: "test" },
      playbooks: [{ name: "yakuza", value: 0 },
      { name: "Policier", value: 1 }],
      manoeuvres: [
        [
          { name: "Flatter", value: 0 },
          { name: "Divertir", value: 1 },
          { name: "Charmer", value: 2 }
        ],
        [
          { name: "Flotter", value: 0 },
          { name: "Drov", value: 1 },
          { name: "Chorb", value: 2 }
        ]
      ], playbookSelected: null,
      manoeuvresSelected: [],
      skill : null
    };
  },
  components: {
    InputText,
    Button,
    Select,
    Form,
    // Editor
  },
  methods: {
    toggleDarkMode() {
      document.documentElement.classList.toggle('my-app-dark');
    },
    onFormSubmit() {
      return true;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
