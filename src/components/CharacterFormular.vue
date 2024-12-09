<template>
  <form>
    <div class="container">
      <div id="export-content" class="content">
        <div class="borders">
          <div class="border_top"></div>
          <div class="border_bot"></div>
          <div class="border_left"></div>
          <div class="border_right"></div>
        </div>

        <img class="cadre" src="@/assets/cadre.svg">
        <div class="image-container" @click="triggerFileInput">
          <img v-if="imageSrc" :src="imageSrc" alt="Image téléchargée" class="uploaded-image" />
          <span v-else class="placeholder-text">Cliquez pour ajouter une image</span>
        </div>
        <img class="playbook-icon" :src="require('@/assets/' + playbookIcon + '.svg')">
        <div class="top-input-section">
          <div class="normal-custom-input" id="name">
            <svg width="300" height="40" xmlns="http://www.w3.org/2000/svg" class="input-border">
              <rect x="1" y="1" width="448" height="38" rx="10" ry="10" fill="none" stroke="black" stroke-width="2" />
            </svg>
            <label class="input_name">Nom: </label>
            <input v-model="name" type="text" class="text-input input-large" placeholder="Nom du perso" />
          </div>
        </div>
        <div class="bot-input-section">
            <div class="normal-custom-input" id="origine">
              <svg width="300" height="40" xmlns="http://www.w3.org/2000/svg" class="input-border">
                <rect x="1" y="1" width="248" height="38" rx="10" ry="10" fill="none" stroke="black" stroke-width="2" />
              </svg>
              <p class="input_name">Origine: </p>
              <input v-model="origin" type="text" class="text-input input-medium" placeholder="Origine du perso" />
            </div>
            <div class="small-custom-input" id="lvl">
              <svg width="100" height="40" xmlns="http://www.w3.org/2000/svg" class="input-border">
                <rect x="1" y="1" width="98" height="38" rx="10" ry="10" fill="none" stroke="black" stroke-width="2" />
              </svg>
              <p class="input_name">Lvl:  </p>
              <!-- <input v-model.number="level" type="text" class="text-input input-small" placeholder="0" /> -->
            </div>
            <div class="small-custom-input" id="xp">
              <svg width="100" height="40" xmlns="http://www.w3.org/2000/svg" class="input-border">
                <rect x="1" y="1" width="98" height="38" rx="10" ry="10" fill="none" stroke="black" stroke-width="2" />
              </svg>
              <p class="input_name">XP: </p>
              <!-- <input v-model.number="xp" type="number" class="text-input input-small" placeholder="0"/> -->
            </div>
      </div>

      <input style="display: none" ref="fileInput" type="file" @change="handleImageUpload" accept="image/*" />
    </div>
    </div>
    <Button label="Sauvegarder" class="p-button-primary" @click="exportPdf" />
  </form>
</template>

<script>
import { Button } from "primevue";
import html2pdf from "html2pdf.js";
export default {
  name: 'CharacterFormular',
  props: {
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
      isDropdownOpen: false,
      imageSrc: null,
      playbookIcon: "Musicien",
      textName: "", 
      level: null, 
      xp: "",
    };
  },
  components: {
    Button
  },
  methods: {
    exportPdf() {
      const element = document.getElementById("export-content");
      const options = {
        margin: [0, 0, 0, 0], // Ajoute une marge de 10mm
        filename: this.name+".pdf",
        image: { type: "jpeg", quality: 1 },
        html2canvas: {
          scale: 5, // Augmente la résolution pour des SVG clairs
          useCORS: true, // Gère les images externes si nécessaire
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
        },
      };

      html2pdf().set(options).from(element).save();
    },
    // Fonction pour gérer le téléchargement d'une image
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        if (!file.type.startsWith('image')) {
          alert('Veuillez sélectionner un fichier image.');
          return;
        }
        if (file.size > 2 * 1024 * 1024) { // 2 Mo
          alert('L\'image est trop grande. Taille maximale autorisée : 2 Mo.');
          return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageSrc = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    deleteImage() {
      this.imageSrc = null;
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
  },
  watch: {
    xp(value) {
      if (value > 999) {
        this.xp = 999; 
      }
    },
    level(value) {
      if (value > 10) {
        this.level = 10; 
      }
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  width: 210mm;
  /* Largeur d'une page A4 */
  height: 296.5mm;
  /* Hauteur d'une page A4 */
  border: 2px solid black;
  position: relative;
  box-sizing: border-box;
  /* Inclut les bordures dans les dimensions */
  background-color: white;
  /* Fond blanc pour le PDF */
}

.cadre,
.cadre_image {
  height: 250px;
  width: 200px;
  position: absolute;
  top: 50px;
  left: 35px;
  cursor: pointer;
  /* Changer le curseur pour indiquer que c'est cliquable */
}

.cadre_image {
  position: absolute;
  top: 65px;
  left: 50px;
  width: 175px;
  height: 225px;
  overflow: hidden;
}

svg {
  width: 100%;
  height: 100%;
}

.border_top,
.border_bot {
  position: absolute;
  left: 35px;
  width: 192.5mm;
  height: 35px;
}

.border_left,
.border_right {
  width: 296.5mm;
  height: 35px;
  bottom: -35px;
  position: absolute;
}

.border_top,
.border_bot,
.border_left,
.border_right {
  background-image: url('@/assets/bord_fiche.svg');
}

.border_bot {
  bottom: 0;
  transform: rotate(180deg);
}

.border_right {
  right: 0;
  transform: rotate(90deg);
  transform-origin: top right;
}

.border_left {
  left: 0;
  transform: rotate(270deg);
  transform-origin: top left;
}

.character-sheet {
  height: 100vh;
  max-width: 50vw;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.image-container {
  position: absolute;
  top: 65px;
  left: 50px;
  width: 175px;
  height: 225px;
  overflow: hidden;
  border-radius: 50%;
  /* Crée un cadre rond */
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ddd;
  cursor: pointer;
}

.uploaded-image {
  height: 100%;
  object-fit: cover;
  /* Assure que l'image couvre toute la zone sans déformation */
}

.placeholder-text {
  font-size: 16px;
  color: #333;
  text-align: center;
}

#export-content {
  position: relative;
  max-width: 210mm;
  /* Largeur pour un PDF A4 en portrait */
  height: auto;
  aspect-ratio: 210 / 297;
  /* Maintient le ratio A4 */
  /* Empêche les débordements */
}

.playbook-icon {
  position: absolute;
  top: 230px;
  left: 180px;
  width: 10%;
}

#name {
  position: relative;
  width: 450px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: text;
}
#origine {
  position: relative;
  width: 250px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: text;
}

.small-custom-input {
  position: relative;
  width: 100px;
  height: 40px;
  cursor: text;
  display: flex;
  justify-content: center;
  align-items: center;
}

.input-border {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

.text-input {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  height: 100%; /* Pour correspondre à la hauteur du parent */
  border: none;
  outline: none;
  background: transparent;
  font-family: Edo;
  padding: 10px 40px; /* Ajustez pour aligner avec le contenu du SVG */
  font-size: 16px; /* Ajustez selon vos besoins */
}
.input-large{
  width: 350px;
  left: 30px;
}
.input-small{
  width: 140px;
}
.input-medium{
  width: 200px;
  left: 30px;
}

.top-input-section {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  position: absolute;
  top: 100px;
  right: 50px;
}

.bot-input-section {
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  top: 150px;
  right: 50px;
  
}
.input_name{
  position: absolute;
  left: 5px;
  font-family: Edo;
}
</style>
