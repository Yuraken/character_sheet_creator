<template>
  <div class="character-sheet">
    <h1>Fiche de Personnage</h1>
    <form @submit.prevent="submitForm">
      <div>
        <label for="name">Nom :</label>
        <input type="text" id="name" v-model="character.name" />
      </div>
      <div>
        <label for="origin">Origine :</label>
        <input type="text" id="origin" v-model="character.origin" />
      </div>
      <div>
        <label for="exclusive-maneuvers">Manoeuvres Exclusives :</label>
        <textarea id="exclusive-maneuvers" v-model="character.exclusiveManeuvers"></textarea>
      </div>
      <div>
        <label>Stats :</label>
        <ul>
          <li>Force : <input type="number" v-model="character.stats.force" /></li>
          <li>Agilité : <input type="number" v-model="character.stats.agility" /></li>
          <li>Endurance : <input type="number" v-model="character.stats.endurance" /></li>
          <li>Intelligence : <input type="number" v-model="character.stats.intelligence" /></li>
          <li>Volonté : <input type="number" v-model="character.stats.willpower" /></li>
          <li>Style : <input type="number" v-model="character.stats.style" /></li>
        </ul>
      </div>
      <div>
        <label for="injuries">Blessures :</label>
        <input type="text" id="injuries" v-model="character.injuries" />
      </div>
      <div>
        <label for="heat">Chaleur :</label>
        <input type="number" id="heat" v-model="character.heat" />
      </div>
      <div>
        <label>Émotions :</label>
        <ul>
          <li>Colère : <input type="number" v-model="character.emotions.anger" /></li>
          <li>Joie : <input type="number" v-model="character.emotions.joy" /></li>
          <li>Peur : <input type="number" v-model="character.emotions.fear" /></li>
          <li>Sérénité : <input type="number" v-model="character.emotions.serenity" /></li>
          <li>Tristesse : <input type="number" v-model="character.emotions.sadness" /></li>
          <li>Surprise : <input type="number" v-model="character.emotions.surprise" /></li>
        </ul>
      </div>
      <div>
        <label for="skills">Compétences :</label>
        <textarea id="skills" v-model="character.skills"></textarea>
      </div>
      <div>
        <label for="techniques">Techniques :</label>
        <textarea id="techniques" v-model="character.techniques"></textarea>
      </div>
      <div>
        <label for="inventory">Inventaire :</label>
        <textarea id="inventory" v-model="character.inventory"></textarea>
      </div>
      <button type="submit">Sauvegarder</button>
    </form>
  </div>
</template>

<script>
export default {
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
  methods: {
    submitForm() {
      console.log("Fiche sauvegardée :", this.character);
    },
  },
};
</script>

<style scoped>
.character-sheet {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #f9f9f9;
}
label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}
input,
textarea {
  width: 100%;
  margin-bottom: 16px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
button {
  display: inline-block;
  padding: 10px 20px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
</style>