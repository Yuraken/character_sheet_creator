import { createApp } from 'vue'; // Importation de Vue 3
import App from './App.vue'; // Le composant principal de votre application
import PrimeVue from 'primevue/config'; // Configuration de PrimeVue
import Aura from '@primevue/themes/aura';
import Vue3SimpleHtml2pdf from "vue3-simple-html2pdf";


// Création de l'application Vue
const app = createApp(App);

// Utilisation de PrimeVue dans l'application
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            darkModeSelector: '.my-app-dark',
            cssLayer: false
        }
    },
    ripple: true
 });
 app.use(Vue3SimpleHtml2pdf);
// Montage de l'application sur le div avec id "app"
app.mount('#app');