<template>
  <div class="container">
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
        <div class="preview">
          <div>
            <div id="export-content" class="content">
              <div class="borders">
                <div class="border_top"></div>
                <div class="border_bot"></div>
                <div class="border_left"></div>
                <div class="border_right"></div>
              </div>

              <!-- Conteneur de l'image avec cadre rond -->
              <img class="cadre" src="@/assets/cadre.svg">
              <div class="image-container" @click="triggerFileInput">
                <img v-if="imageSrc" :src="imageSrc" alt="Image téléchargée" class="uploaded-image" />
                <span v-else class="placeholder-text">Cliquez pour ajouter une image</span>
              </div>

            </div>
            <input style="display: none" ref="fileInput" type="file" @change="handleImageUpload" accept="image/*" />
            <Button type="submit" label="Sauvegarder" class="p-button-primary" @click="exportPdf" />
          </div>
        </div>
      </form>

    </div>

  </div>
</template>

<script>
import { InputText, Textarea, InputNumber, Button } from "primevue";
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
      isDropdownOpen: false, // Gérer l'état du dropdown (ouvert ou fermé)
      imageSrc: null // L'image téléchargée par l'utilisateur
    };
  },
  components: {
    InputText,
    Button,
    Textarea,
    InputNumber,
    // DropdownWithImage
    // Editor,
  },
  methods: {
    exportPdf() {
      const element = document.getElementById("export-content");

      const options = {
        margin: [0, 0, 0, 0], // Ajoute une marge de 10mm
        filename: "export.pdf",
        image: { type: "jpeg", quality: 1 },
        html2canvas: {
          scale: 2, // Augmente la résolution pour des SVG clairs
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  display: flex;
  flex-direction: row;
  height: 100vh;
  margin: 0;
  padding: 10px;
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

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-button {
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  width: 200px;
  z-index: 1;
}

.dropdown-item {
  padding: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.dropdown-item img {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}

.dropdown-item:hover {
  background-color: #f1f1f1;
}

.image-container {
  position: absolute;
  top: 65px;
  left: 50px;
  width: 175px;
  height: 225px;
  overflow: hidden;
  border-radius: 50%; /* Crée un cadre rond */
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ddd;
  cursor: pointer;
}

.uploaded-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Assure que l'image couvre toute la zone sans déformation */
}

.placeholder-text {
  font-size: 16px;
  color: #333;
  text-align: center;
}

#export-content {
  position: relative;
  width: 100%;
  max-width: 210mm; /* Largeur pour un PDF A4 en portrait */
  height: auto;
  aspect-ratio: 210 / 297; /* Maintient le ratio A4 */
  overflow: hidden; /* Empêche les débordements */
}
</style>
