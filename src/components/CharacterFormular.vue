<template>
  <header>
    <Message severity="info" class="message">
      <li>Pour changer de playbook, cliquez sur l'icone du playbook actuel</li>
      <li>Le maximum d'une stat est +2 (+3 si vous avez la compétence correspondante)</li>
      <li>Cochez 1 compétence de départ.</li>
    </Message>
  </header>
  <form>
    <div id="export-content" class="container">
      <div class="content">
        <div class="borders">
          <div class="border_top"></div>
          <div class="border_bot"></div>
          <div class="border_left"></div>
          <div class="border_right"></div>
        </div>

        <img class="cadre" src="@/assets/cadre.svg">
        <div class="image-container" @click="triggerFileInput">
          <img v-if="imageSrc" :src="imageSrc" alt="Image téléchargée" class="uploaded-image" />
          <div v-else class="placeholder-text">Cliquez pour ajouter une image</div>
        </div>

        <img class="playbook-icon" :src="require('@/assets/' + selectedPlaybook.value + '.svg')" @click="openDropdown"
          alt="Playbook Icon" />

        <Select ref="dropdown" v-model="selectedPlaybook" :options="playbooks" optionLabel="label"
          style="display: none;" />
        <div class="top-input-section">
          <div class="normal-custom-input" id="name">
            <svg width="300" height="40" xmlns="http://www.w3.org/2000/svg" class="input-border">
              <rect x="1" y="1" width="448" height="38" rx="10" ry="10" fill="none" stroke="black" stroke-width="2" />
            </svg>
            <label class="input_name">Nom: </label>
            <input v-model="name" type="text" class="text-input input-large" />
          </div>
        </div>
        <div class="mid-input-section">
          <div class="normal-custom-input" id="origine">
            <svg width="300" height="40" xmlns="http://www.w3.org/2000/svg" class="input-border">
              <rect x="1" y="1" width="248" height="38" rx="10" ry="10" fill="none" stroke="black" stroke-width="2" />
            </svg>
            <p class="input_name">Origine: </p>
            <input v-model="origin" type="text" class="text-input input-medium" />
          </div>
          <div class="small-custom-input" id="lvl">
            <svg width="100" height="40" xmlns="http://www.w3.org/2000/svg" class="input-border">
              <rect x="1" y="1" width="98" height="38" rx="10" ry="10" fill="none" stroke="black" stroke-width="2" />
            </svg>
            <p class="input_name">Lvl: </p>
            <input v-model.number="level" type="number" class="text-input input-small" />
          </div>
          <div class="small-custom-input" id="xp">
            <svg width="100" height="40" xmlns="http://www.w3.org/2000/svg" class="input-border">
              <rect x="1" y="1" width="98" height="38" rx="10" ry="10" fill="none" stroke="black" stroke-width="2" />
            </svg>
            <p class="input_name">XP: </p>
            <input v-model.number="xp" type="number" class="text-input input-small" />
          </div>
        </div>
        <div class="bot-input-section">
          <div class="injuries">
            <div style="font-family: edo; font-size: 25px">Blessures :</div>
            <svg width="5mm" height="5mm" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="1" width="5mm" height="5mm" fill="none" stroke="black" stroke-width="2" />
            </svg>
            <svg width="5mm" height="5mm" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="1" width="5mm" height="5mm" fill="none" stroke="black" stroke-width="2" />
            </svg>
            <svg width="5mm" height="5mm" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="1" width="5mm" height="5mm" fill="none" stroke="black" stroke-width="2" />
            </svg>
            <svg width="5mm" height="5mm" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="1" width="5mm" height="5mm" fill="none" stroke="black" stroke-width="2" />
            </svg>
            <svg width="5mm" height="5mm" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="1" width="5mm" height="5mm" fill="none" stroke="black" stroke-width="2" />
            </svg>
          </div>
          <div class="heat">
            <div style="font-family: edo; font-size: 25px">Chaleur :</div>
            <div style="font-family: edo; font-size: 25px">/3</div>
          </div>
          <div class="states">
            <div>
              <p style="font-size: 17px">
                Colère :
              </p>
              <svg width="3mm" height="3mm" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="1" width="3mm" height="3mm" fill="none" stroke="black" stroke-width="2" />
              </svg>
            </div>
            <div>
              <p style="font-size: 17px">
                Joie :
              </p>
              <svg width="3mm" height="3mm" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="1" width="3mm" height="3mm" fill="none" stroke="black" stroke-width="2" />
              </svg>
            </div>
            <div>
              <p style="font-size: 17px">
                Peur :
              </p>
              <svg width="3mm" height="3mm" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="1" width="3mm" height="3mm" fill="none" stroke="black" stroke-width="2" />
              </svg>
            </div>
            <div>
              <p style="font-size: 17px">
                Tristesse :
              </p>
              <svg width="3mm" height="3mm" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="1" width="3mm" height="3mm" fill="none" stroke="black" stroke-width="2" />
              </svg>
            </div>
            <div>
              <p style="font-size: 17px">
                Sérénité :
              </p>
              <svg width="3mm" height="3mm" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="1" width="3mm" height="3mm" fill="none" stroke="black" stroke-width="2" />
              </svg>
            </div>
            <div>
              <p style="font-size: 17px">
                Surprise :
              </p>
              <svg width="3mm" height="3mm" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="1" width="3mm" height="3mm" fill="none" stroke="black" stroke-width="2" />
              </svg>
            </div>
          </div>
        </div>
        <div class="stat-section">
          <svg width="300" height="400" xmlns="http://www.w3.org/2000/svg" class="stat-section-svg">
            <rect x="1" y="1" width="180mm" height="70mm" rx="10" ry="10" fill="none" stroke="black" stroke-width="2" />
          </svg>
          <p class="edo title">Stats :</p>
          <div class="force"><img class="stats-cadre" src="@/assets/cadre.svg" alt="">
            <input v-model.number="stats.force" type="number" class="stat-input input-small" />
            <p class="edo">Force ( )></p>
          </div>
          <div class="endu"><img class="stats-cadre" src="@/assets/cadre.svg" alt="">
            <input v-model.number="stats.endu" type="number" class="stat-input input-small" />
            <p class="edo">Endurance ( )></p>
          </div>
          <div class="vol"><img class="stats-cadre" src="@/assets/cadre.svg" alt="">
            <input v-model.number="stats.vol" type="number" class="stat-input input-small" />
            <p class="edo">Volonté ( )></p>
          </div>
          <div class="agi"><img class="stats-cadre" src="@/assets/cadre.svg" alt="">
            <input v-model.number="stats.agi" type="number" class="stat-input input-small" />
            <p class="edo">Agilité ( )></p>
          </div>
          <div class="intel"><img class="stats-cadre" src="@/assets/cadre.svg" alt="">
            <input v-model.number="stats.intel" type="number" class="stat-input input-small" />
            <p class="edo">Intelligence ( )></p>
          </div>
          <div class="style"><img class="stats-cadre" src="@/assets/cadre.svg" alt="">
            <input v-model.number="stats.style" type="number" class="stat-input input-small" />
            <p class="edo">Style ( )></p>
          </div>
        </div>
        <div class="maneuver-first-section">
          <svg width="300" height="180mm" xmlns="http://www.w3.org/2000/svg" class="stat-section-svg">
            <rect x="1" y="1" width="180mm" height="120mm" rx="10" ry="10" fill="none" stroke="black"
              stroke-width="2" />
          </svg>
          <p class="edo title">Manoeuvres exclusives :</p>
          <div class="first-maneuver">
            <p class="maneuver-title">{{ currentPlaybook?.firstManeuverTitle }}</p>
            <div class="maneuver" v-html="currentPlaybook?.firstManeuverContent">
            </div>
          </div>
          <div class="second-maneuver">
            <p class="maneuver-title">{{ currentPlaybook?.secondManeuverTitle }}</p>
            <div class="maneuver" v-html="currentPlaybook?.secondManeuverContent">
            </div>
          </div>
        </div>
        <input style="display: none" ref="fileInput" type="file" @change="handleImageUpload" accept="image/*" />
        <div class="borders-second">
          <div class="border_top"></div>
          <div class="border_bot"></div>
          <div class="border_left"></div>
          <div class="border_right"></div>
        </div>
      </div>
      <div class="content">
        <div class="skill-section">
          <svg width="300" height="400" xmlns="http://www.w3.org/2000/svg" class="stat-section-svg">
            <rect x="1" y="1" width="180mm" height="145mm" rx="10" ry="10" fill="none" stroke="black"
              stroke-width="2" />
          </svg>
          <p class="edo title">Compétences :</p>
          <div class="first-skill" v-on:click="firstSkill = !firstSkill">
            <svg width="3mm" height="3mm" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="1" width="3mm" height="3mm" fill="none" stroke="black" stroke-width="2" />
              <line v-if="firstSkill" x1="0" y1="0" x2="3mm" y2="3mm" stroke="black" stroke-width="2" />
              <line v-if="firstSkill" x1="3mm" y1="0" x2="0" y2="3mm" stroke="black" stroke-width="2" />
            </svg>
            <p class="skill-title">{{ currentPlaybook?.firstSkillTitle }}</p>
            <div class="skill" v-html="currentPlaybook?.firstSkillContent">
            </div>
          </div>
          <div class="second-skill" v-on:click="secondSkill = !secondSkill">
            <svg width="5mm" height="5mm" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="1" width="3mm" height="3mm" fill="none" stroke="black" stroke-width="2" />
              <line v-if="secondSkill" x1="0" y1="0" x2="3mm" y2="3mm" stroke="black" stroke-width="2" />
              <line v-if="secondSkill" x1="3mm" y1="0" x2="0" y2="3mm" stroke="black" stroke-width="2" />
            </svg>
            <p class="skill-title">{{ currentPlaybook?.secondSkillTitle }}</p>
            <div :class="'skill ' + selectedPlaybook.value + '-second-skill'"
              v-html="currentPlaybook?.secondSkillContent">
            </div>
          </div>
          <div class="third-skill" v-on:click="thirdSkill = !thirdSkill">
            <svg width="3mm" height="3mm" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="1" width="3mm" height="3mm" fill="none" stroke="black" stroke-width="2" />
              <line v-if="thirdSkill" x1="0" y1="0" x2="3mm" y2="3mm" stroke="black" stroke-width="2" />
              <line v-if="thirdSkill" x1="3mm" y1="0" x2="0" y2="3mm" stroke="black" stroke-width="2" />
            </svg>
            <p class="skill-title">{{ currentPlaybook?.thirdSkillTitle }}</p>
            <div class="skill" v-html="currentPlaybook?.thirdSkillContent">
            </div>
          </div>
        </div>
        <div class="tech-section">
          <svg width="300" height="400" xmlns="http://www.w3.org/2000/svg" class="tech-section-svg">
            <rect x="1" y="1" width="87mm" height="120mm" rx="10" ry="10" fill="none" stroke="black" stroke-width="2" />
          </svg>
          <p class="edo title">Techniques :</p>
          <div class="first-tech">
            <svg width="300" height="400" xmlns="http://www.w3.org/2000/svg" class="tech-section-svg">
              <rect x="1" y="1" width="82mm" height="33mm" rx="10" ry="10" fill="none" stroke="black"
                stroke-width="2" />
            </svg>
            <p class="tech-title">{{ currentPlaybook?.firstTechTitle }}</p>
            <div class="tech" v-html="currentPlaybook?.firstTechContent">
            </div>
          </div>
          <div class="second-tech">
            <svg width="300" height="400" xmlns="http://www.w3.org/2000/svg" class="tech-section-svg">
              <rect x="1" y="1" width="82mm" height="33mm" rx="10" ry="10" fill="none" stroke="black"
                stroke-width="2" />
            </svg>
          </div>
          <div class="third-tech">
            <svg width="300" height="400" xmlns="http://www.w3.org/2000/svg" class="tech-section-svg">
              <rect x="1" y="1" width="82mm" height="33mm" rx="10" ry="10" fill="none" stroke="black"
                stroke-width="2" />
            </svg>
          </div>
        </div>
        <div class="inventory-section">
          <svg width="300" height="400" xmlns="http://www.w3.org/2000/svg" class="inventory-section-svg">
            <rect x="1" y="1" width="87mm" height="120mm" rx="10" ry="10" fill="none" stroke="black" stroke-width="2" />
          </svg>
          <p class="edo title">Inventaire :</p>

        </div>
        <div class="borders">
          <div class="border_top"></div>
          <div class="border_bot"></div>
          <div class="border_left"></div>
          <div class="border_right"></div>
        </div>
      </div>
    </div>
  </form>
  <div class="footer">
    <Message severity="error" class="message" v-if="error">{{ errorMessage }}</Message>
    <Button label="Sauvegarder" class="p-button-primary submit" @click="exportPdf" />
  </div>
</template>

<script>
import { Button } from "primevue";
import html2pdf from "html2pdf.js";
import Select from 'primevue/select';
import playbooksDataConfig from '../config/playbooks.json';
import Message from "primevue/message";
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
      },
      isDropdownOpen: false,
      imageSrc: null,
      textName: "",
      level: null,
      xp: "",
      selectedPlaybook: { label: 'Musicien', value: 'musicien' }, // Valeur sélectionnée
      playbooks: playbooksDataConfig.playbooks,
      playbooksData: {
        yakuza: playbooksDataConfig.yakuza,
        host: playbooksDataConfig.host,
        sdf: playbooksDataConfig.sdf,
        salaryman: playbooksDataConfig.salaryman,
        ouvrier: playbooksDataConfig.ouvrier,
        policier: playbooksDataConfig.policier,
        musicien: playbooksDataConfig.musicien,
        journaliste: playbooksDataConfig.journaliste
      },
      firstSkill: false,
      secondSkill: false,
      thirdSkill: false,
      format: false,
      error: false,
      errorMessage: '',
      stats: {
        agi: "",
        endu: "",
        force: "",
        intel: "",
        style: "",
        vol: ""
      },
      totalStats: 0
    };
  },
  computed: {
    currentPlaybook() {
      return this.playbooksData[this.selectedPlaybook.value] || null;
    }
  },
  components: {
    Button,
    Select,
    Message
  },
  methods: {
    exportPdf() {
      if (this.name == undefined || this.origin == undefined) {
        this.error = true;
        this.errorMessage = "Veuillez renseigner le nom et l'origine de votre personnage."
        return null
      }
      if (this.imageSrc == null) {
        this.error = true;
        this.errorMessage = "Veuillez ajouter une image à votre fiche personnage."
        return null
      }
      this.error = false;
      const element = document.getElementById("export-content");
      const options = {
        margin: [0, 0, 0, 0],
        image: { type: "jpeg", quality: 1 },
        html2canvas: {
          scale: 5,
          useCORS: true,
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
        },
      };
      html2pdf().set(options).from(element).toPdf().get('pdf').then((pdf) => {
        pdf.deletePage(3);
        pdf.save(this.name + ".pdf");
      });
    },

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
    openDropdown() {
      this.$refs.dropdown.show();
    }
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
    "stats.agi"(value) {
      if (value > 3) { // exemple de condition
        this.stats.agi = 3;
      }
      if (value < -1) {
          this.stats.agi = -1;
        }
      
    },
    "stats.endu"(value) {
      if (value > 3) {
        this.stats.endu = 3;
      }
      if (value < -1) {
        this.stats.endu = -1;
      }

    },
    "stats.force"(value) {
      if (value > 3) {
        this.stats.force = 3;
      }
      if (value < -1) {
        this.stats.force = -1;
      }
    },
    "stats.intel"(value) {
      if (value > 3) {
        this.stats.intel = 3;
      }
      if (value < -1) {
        this.stats.intel = -1;
      }
    },
    "stats.style"(value) {
      if (value > 3) {
        this.stats.style = 3;
      }
      if (value < -1) {
        this.stats.style = -1;
      }
    },
    "stats.vol"(value) {
      if (value > 3) {
        this.stats.vol = 3;
      }
      if (value < -1) {
        this.stats.vol = -1;
      }
    },
  }
}
</script>

<style scoped>
form {
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.content {
  width: 210mm;
  height: 297mm;
  border: 2px solid black;
  position: relative;
  box-sizing: border-box;
  background-color: white;
}

.cadre,
.cadre_image {
  height: 250px;
  width: 200px;
  position: absolute;
  top: 50px;
  left: 35px;
  cursor: pointer;
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
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ddd;
  cursor: pointer;
}

.uploaded-image {
  height: 100%;
  object-fit: cover;
}

.placeholder-text {
  font-size: 16px;
  color: #333;
  text-align: center;
}

#export-content {
  position: relative;
  max-width: 210mm;
  height: auto;
  aspect-ratio: 210 / 297;
}

.playbook-icon {
  position: absolute;
  top: 60mm;
  left: 55mm;
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
  height: 100%;
  border: none;
  outline: none;
  background: transparent;
  font-family: Edo;
  padding: 10px 40px;
  font-size: 16px;
}

.stat-input {
  position: absolute;
  top: 38px;
  left: -25px;
  z-index: 3;
  height: 20px;
  border: none;
  outline: none;
  background: transparent;
  font-family: Edo;
  font-size: 22px;
}

.input-large {
  width: 350px;
  left: 30px;
}

.input-small {
  width: 140px;
}

.input-medium {
  width: 200px;
  left: 30px;
}

.top-input-section {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  position: absolute;
  top: 50px;
  right: 50px;
}

.mid-input-section {
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  top: 100px;
  right: 50px;

}

.bot-input-section {
  position: absolute;
  top: 150px;
  right: 100px;
  height: 5mm;
  width: 100mm;
  font-family: edo;
}

.input_name {
  position: absolute;
  left: 5px;
  font-family: Edo;
}

.playbook-dropdown {
  position: absolute;
  top: 230px;
  left: 180px;
}



.stat-section {
  position: absolute;
  top: 85mm;
  left: 15mm;
  height: 71mm;
  width: 181mm;
  z-index: 3;
}

.skill-section {
  position: absolute;
  top: 15mm;
  left: 15mm;
  height: 147mm;
  width: 182mm;
  z-index: 3;
}

.tech-section,
.inventory-section {
  position: absolute;
  top: 165mm;
  left: 15mm;
  height: 122mm;
  width: 92mm;
  z-index: 3;
}

.inventory-section {
  left: 108mm;
}

.maneuver-first-section {
  position: absolute;
  top: 160mm;
  left: 15mm;
  height: 122mm;
  width: 181mm;
  z-index: 3;
}

.force {
  position: absolute;
  top: 10mm;
  left: 25mm;
  width: 100%;
}

.endu {
  position: absolute;
  top: 25mm;
  left: 25mm;
  width: 100%;
}

.vol {
  position: absolute;
  top: 40mm;
  left: 25mm;
  width: 100%;
}

.agi {
  position: absolute;
  top: 10mm;
  left: 110mm;
  width: 100%;
}

.intel {
  position: absolute;
  top: 25mm;
  left: 110mm;
  width: 100%;
}

.style {
  position: absolute;
  top: 40mm;
  left: 110mm;
  width: 100%;
}

.edo {
  position: absolute;
  font-family: Edo;
  font-size: 30px;
  left: 10px;
}

.title {
  top: -5mm;
  left: 5mm;
}

.stats-cadre {
  width: 10mm;
  height: 10mm;
  position: absolute;
  left: -10mm;
  top: 8mm;
}

.injuries>svg {
  height: 6mm;
  width: 6mm;
}

.injuries {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
}

.heat {
  display: flex;
  justify-content: space-between;
  width: 70%;
  align-items: center;
  align-self: flex-start;
}

.states {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;
}

.states>div>svg {
  height: 4mm;
  width: 4mm;
}

.states>div {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100px;
}

.first-maneuver,
.first-skill {
  position: absolute;
  top: 13mm;
  left: 5mm;
  width: 175mm;
  height: 50mm;
}

.second-maneuver,
.second-skill {
  position: absolute;
  left: 5mm;
  width: 175mm;
  height: 50mm;
}

.second-skill {
  top: 68mm;
  left: 5mm;
}

.second-maneuver {
  top: 60mm;
}

.third-skill {
  position: absolute;
  top: 123mm;
  left: 5mm;
  width: 175mm;
  height: 50mm;
}

.maneuver-title,
.skill-title,
.tech-title,
.tech-title-input {
  position: absolute;
  top: -3mm;
  left: 1mm;
  font-family: Edo;
  font-size: 16px;
}

.maneuver,
.skill,
.tech {
  position: absolute;
  top: 3mm;
  left: 3mm;
  text-align: left;
  font-size: 15px;
  font-family: Arial, Helvetica, sans-serif;
}

.skill {
  margin-left: 7mm;
  margin-top: -2mm;
}

.tech {
  margin-top: 2mm;
  left: 1mm;
  font-size: 14px;
}

.first-skill>svg,
.second-skill>svg,
.third-skill>svg {
  position: absolute;
  left: 0;
  top: 0;
  width: 5mm;
  height: 5mm;
}

.first-skill>p,
.second-skill>p,
.third-skill>p {
  margin-left: 7mm;
  margin-top: 2.5mm;
}

.first-tech,
.second-tech,
.third-tech {
  position: absolute;
  top: 13mm;
  left: 2.5mm;
  width: 83mm;
  height: 35mm;
}

.second-tech {
  top: 49mm;
}

.third-tech {
  top: 85mm;
}

.tech-title-input {
  height: auto;
  padding: 4mm 1mm;
  width: 95%;
}

.ouvrier-second-skill {
  font-size: 14px;
}

header {
  max-width: 300mm;
}

.message {
  text-align: left;
}
</style>
