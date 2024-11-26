import { createApp } from 'vue'; // Importation de Vue 3
import App from './App.vue'; // Le composant principal de votre application
import PrimeVue from 'primevue/config'; // Configuration de PrimeVue
import Aura from '@primevue/themes/aura';



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

// Montage de l'application sur le div avec id "app"
app.mount('#app');