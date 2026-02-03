/**
 * Korhogo City Configuration Template
 * Copy this file to config.js and replace with your actual values
 */

const CITY_CONFIG = {
    // City Identity
    cityId: 'korhogo',
    cityName: 'Korhogo',
    displayName: 'Akwaba Korhogo',
    tagline: 'Découvrez les trésors artisanaux et commerces de Korhogo',
    description: 'Votre guide local pour découvrir et soutenir les commerces et artisans de Korhogo',

    // Contact Information
    contact: {
        email: 'contact@akwaba-korhogo.ci',
        phone: '+225 25 86 00 00 00',
        address: 'Quartier Koko, Korhogo, Côte d\'Ivoire',
        website: 'https://korhogo.akwaba.ci'
    },

    // Geography - Korhogo Neighborhoods
    neighborhoods: [
        { id: 'koko', name: 'Koko', description: 'Centre administratif' },
        { id: 'petit-paris', name: 'Petit Paris', description: 'Zone commerciale' },
        { id: 'sinistre', name: 'Sinistré', description: 'Marché central' },
        { id: 'tchengue', name: 'Tchengué', description: 'Quartier résidentiel' },
        { id: 'soba', name: 'Soba', description: 'Zone artisanale' },
        { id: 'kapele', name: 'Kapélé', description: 'Quartier traditionnel' },
        { id: 'lataha', name: 'Lataha', description: 'Zone universitaire' },
        { id: 'cocody', name: 'Cocody', description: 'Quartier moderne' }
    ],

    // Business Categories (Korhogo-specific)
    categories: [
        { id: 'restaurants', name: 'Restaurants & Maquis', icon: '🍽️', color: '#8B4513' },
        { id: 'artisanat', name: 'Artisanat Traditionnel', icon: '🎨', color: '#CD853F' },
        { id: 'textile', name: 'Tissage & Textiles', icon: '🧵', color: '#F4A460' },
        { id: 'sculpture', name: 'Sculpture sur Bois', icon: '🗿', color: '#8B7355' },
        { id: 'boutiques', name: 'Boutiques & Mode', icon: '👗', color: '#DEB887' },
        { id: 'marches', name: 'Marchés', icon: '🛒', color: '#D2691E' },
        { id: 'sante', name: 'Santé & Pharmacies', icon: '🏥', color: '#228B22' },
        { id: 'education', name: 'Écoles & Formation', icon: '📚', color: '#4682B4' },
        { id: 'beaute', name: 'Beauté & Coiffure', icon: '💇', color: '#FF69B4' },
        { id: 'tech', name: 'Technologie & Services', icon: '💻', color: '#4169E1' },
        { id: 'agriculture', name: 'Agriculture & Élevage', icon: '🌾', color: '#6B8E23' },
        { id: 'automobile', name: 'Automobile & Mécanique', icon: '🚗', color: '#2F4F4F' }
    ],

    // Cultural Elements (Senufo)
    culture: {
        patterns: {
            primary: 'senufo-cloth',
            secondary: 'geometric-traditional',
            accent: 'mask-pattern'
        },
        colors: {
            earth: '#8B4513',     // Brown - clay/soil
            sand: '#F4A460',      // Sandy brown - savanna
            slate: '#2F4F4F',     // Dark slate - traditional cloth
            cotton: '#CD853F',    // Peru - cotton fields
            pottery: '#D2691E'    // Chocolate - pottery
        }
    },

    // Map Configuration (Korhogo coordinates)
    map: {
        center: {
            lat: 9.4580,  // Korhogo latitude
            lng: -5.6294  // Korhogo longitude
        },
        zoom: 13,
        defaultRadius: 10 // km for nearby search
    },

    // PWA Configuration
    pwa: {
        name: 'Akwaba Korhogo',
        shortName: 'Akwaba KGO',
        description: 'Découvrez et soutenez les commerces et artisans locaux de Korhogo',
        themeColor: '#8B4513',
        backgroundColor: '#F5F5DC',
        startUrl: '/',
        display: 'standalone',
        orientation: 'portrait-primary',
        categories: ['business', 'shopping', 'lifestyle', 'local'],
        lang: 'fr-CI'
    },

    // Social Media
    social: {
        facebook: 'https://facebook.com/akwaba.korhogo',
        instagram: 'https://instagram.com/akwaba_korhogo',
        twitter: 'https://twitter.com/akwaba_kgo',
        whatsapp: '+225 25 86 00 00 00'
    },

    // Featured Content
    featured: {
        categories: ['artisanat', 'textile', 'restaurants'],
        showCount: 6
    },

    // Search Settings
    search: {
        placeholder: 'Rechercher un commerce, un artisan, un service...',
        minChars: 2,
        maxResults: 20
    },

    // Localization
    locale: 'fr-CI',
    currency: 'XOF',
    timezone: 'Africa/Abidjan',

    // Feature Flags
    features: {
        geolocation: true,
        favorites: true,
        reviews: true,
        events: true,
        notifications: true,
        darkMode: false
    }
};

// Firebase Configuration (shared across all cities)
// IMPORTANT: Replace these placeholder values with your actual Firebase config
// Get your config from: https://console.firebase.google.com/
const FIREBASE_CONFIG = {
    apiKey: "YOUR_FIREBASE_API_KEY_HERE",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Export configuration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CITY_CONFIG, FIREBASE_CONFIG };
}
