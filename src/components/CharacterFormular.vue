<template>
  <div class="character-sheet">
    <h1>Fiche de Personnage</h1>
    <form @submit.prevent="submitForm">
      <div class="p-field">
        <label for="name">Nom :</label>
        <InputText id="name" v-model="character.name" placeholder="Entrez le nom" />
      </div>
      <div class="p-field">
        <label for="origin">Origine :</label>
        <InputText id="origin" v-model="character.origin" placeholder="Entrez l'origine" />
      </div>
      <div class="p-field">
        <label for="exclusive-maneuvers">Manoeuvres Exclusives :</label>
        <InputTextarea id="exclusive-maneuvers" v-model="character.exclusiveManeuvers" rows="4" cols="30"
          placeholder="Décrivez les manœuvres" />
      </div>
      <div class="p-field">
        <label>Stats :</label>
        <div class="p-grid">
          <div class="p-col-6" v-for="(value, stat) in character.stats" :key="stat">
            <label :for="stat">{{ stat }} :</label>
            <InputNumber :id="stat" v-model="character.stats[stat]" mode="decimal" />
          </div>
        </div>
      </div>
      <div class="p-field">
        <label for="injuries">Blessures :</label>
        <InputText id="injuries" v-model="character.injuries" placeholder="Décrivez les blessures" />
      </div>
      <div class="p-field">
        <label for="heat">Chaleur :</label>
        <InputNumber id="heat" v-model="character.heat" mode="decimal" />
      </div>
      <div class="p-field">
        <label>Émotions :</label>
        <div class="p-grid">
          <div class="p-col-6" v-for="(value, emotion) in character.emotions" :key="emotion">
            <label :for="emotion">{{ emotion }} :</label>
            <InputNumber :id="emotion" v-model="character.emotions[emotion]" mode="decimal" />
          </div>
        </div>
      </div>
      <div class="p-field">
        <label for="skills">Compétences :</label>
        <Textarea id="skills" v-model="character.skills" rows="4" cols="30" placeholder="Décrivez les compétences" />
      </div>
      <div class="p-field">
        <label for="techniques">Techniques :</label>
        <Textarea id="techniques" v-model="character.techniques" rows="4" cols="30"
          placeholder="Décrivez les techniques" />
      </div>
      <div class="p-field">
        <label for="inventory">Inventaire :</label>
        <Textarea id="inventory" v-model="character.inventory" rows="4" cols="30" placeholder="Listez l'inventaire" />
      </div>
      <Button type="submit" label="Sauvegarder" class="p-button-primary" />
    </form>
   
  </div>
  
  <Button label="Télécharger ma fiche" @click="pdfDownload()" />
  <vue3-simple-html2pdf ref="vue3SimpleHtml2pdf" :options="pdfOptions" :filename="exportFilename">
    <div>
      f
    </div>
  </vue3-simple-html2pdf>
</template>

<script>
import { InputText, Textarea, InputNumber, Button } from "primevue";
export default {
  name: 'CharacterFormular',
  props: {
    pdfOptions: {
      margin: -1000,
      padding: 0,
      image: {
        type: 'jpeg',
        quality: 2,
      },
      jsPDF: {
        format: "a4",
        unit: 'mm',
        orientation: 'p',
      },
    },
    exportFilename: {
      type: String,
      default: 'my-custom-file.pdf'
    },
    initialValues: {

    }
  },
  data() {
    return {
      character: {
        name: "",
        origin: "",
        exclusiveManeuvers: "",
        stats: {
          force: 0,
          agility: 0,
          endurance: 0,
          intelligence: 0,
          willpower: 0,
          style: 0,
        },
        injuries: "",
        heat: 0,
        emotions: {
          anger: 0,
          joy: 0,
          fear: 0,
          serenity: 0,
          sadness: 0,
          surprise: 0,
        },
        skills: "",
        techniques: "",
        inventory: "",
      },
    };
  },
  components: {
    InputText,
    Button,
    Textarea,
    InputNumber
    // Editor,
  },
  methods: {
    // toggleDarkMode() {
    //   document.documentElement.classList.toggle('my-app-dark');
    // },
    submitForm() {
      console.log("Fiche sauvegardée :", this.character);
    },
    pdfDownload() {
      this.$refs.vue3SimpleHtml2pdf.download();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.character-sheet {
  max-width: 800px;
  margin: auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.p-field {
  margin-bottom: 1.5rem;
}

.p-grid {
  display: flex;
  flex-wrap: wrap;
}

.p-col-6 {
  flex: 0 0 50%;
  padding: 0.5rem;
}
</style>
