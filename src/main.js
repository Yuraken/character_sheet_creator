import { createApp } from 'vue'; // Importation de Vue 3
import App from './App.vue'; // Le composant principal de votre application
import PrimeVue from 'primevue/config'; // Configuration de PrimeVue
import Material from '@primevue/themes/material';



// Création de l'application Vue
const app = createApp(App);

// Utilisation de PrimeVue dans l'application
app.use(PrimeVue,{
    theme: {
        preset: Material,
        options: {
            darkModeSelector: '.my-app-dark',
        }
    }
});

// Montage de l'application sur le div avec id "app"
app.mount('#app');