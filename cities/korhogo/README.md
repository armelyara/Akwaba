# Akwaba Korhogo

Akwaba Korhogo est le premier déploiement de la plateforme Akwaba, conçu pour mettre en valeur les commerces et l'artisanat traditionnel Senufo de Korhogo.

## 🎨 Identité Culturelle

### Senufo Culture
Korhogo est la capitale de la région du Poro et le cœur de la culture Senufo en Côte d'Ivoire. La ville est renommée pour son riche patrimoine artisanal :

- **Tissage** - Le célèbre tissu de Korhogo
- **Sculpture** - Masques et statues en bois traditionnels
- **Poterie** - Artisanat en terre cuite
- **Peinture** - Art mural et tissus peints

### Palette de Couleurs
Le thème visuel s'inspire des tons naturels et terreux de l'artisanat Senufo :

- **Primaire** : `#8B4513` (Brun terre - argile/sol)
- **Secondaire** : `#F4A460` (Brun sable - savane)
- **Accent** : `#D2691E` (Chocolat - poterie)
- **Fond** : `#F5F5DC` (Beige - tissu naturel)

### Typographie
- **Titres** : Playfair Display (élégant, traditionnel)
- **Corps** : Lato (moderne, lisible)
- **Accentuation** : Merriweather (traditionnel)

## 📍 Quartiers Couverts

1. **Koko** - Centre administratif
2. **Petit Paris** - Zone commerciale
3. **Sinistré** - Marché central
4. **Tchengué** - Quartier résidentiel
5. **Soba** - Zone artisanale
6. **Kapélé** - Quartier traditionnel
7. **Lataha** - Zone universitaire
8. **Cocody** - Quartier moderne

## 🏪 Catégories de Commerces

- 🍽️ Restaurants & Maquis
- 🎨 Artisanat Traditionnel
- 🧵 Tissage & Textiles
- 🗿 Sculpture sur Bois
- 👗 Boutiques & Mode
- 🛒 Marchés
- 🏥 Santé & Pharmacies
- 📚 Écoles & Formation
- 💇 Beauté & Coiffure
- 💻 Technologie & Services
- 🌾 Agriculture & Élevage
- 🚗 Automobile & Mécanique

## 🚀 Développement

### Structure des Fichiers

```
korhogo/
├── public/
│   ├── index.html              # Page d'accueil
│   ├── businesses.html         # Liste des commerces (à créer)
│   ├── events.html             # Événements (à créer)
│   ├── about.html              # À propos (à créer)
│   ├── css/
│   │   └── korhogo-theme.css   # Thème Senufo
│   ├── js/
│   │   └── config.js           # Configuration de Korhogo
│   ├── assets/
│   │   ├── images/             # Images locales
│   │   ├── icons/              # Icônes PWA
│   │   └── patterns/           # Motifs Senufo
│   ├── manifest.json           # Configuration PWA
│   └── service-worker.js       # Service Worker
└── README.md
```

### Servir Localement

```bash
# Depuis la racine du projet
firebase serve --only hosting:akwaba-korhogo

# Ou utiliser npm
npm run serve:korhogo
```

### Déployer

```bash
# Déployer uniquement Korhogo
firebase deploy --only hosting:akwaba-korhogo

# Ou utiliser npm
npm run deploy:korhogo
```

## 📱 Progressive Web App (PWA)

### Fonctionnalités
- ✅ Installation sur l'écran d'accueil
- ✅ Fonctionnement hors ligne
- ✅ Notifications push
- ✅ Mise en cache intelligente
- ✅ Géolocalisation pour trouver commerces à proximité
- ✅ Actions rapides (appel, navigation)

### Configuration
Le fichier `manifest.json` définit :
- Nom de l'application : "Akwaba Korhogo"
- Couleur du thème : `#8B4513` (brun terre)
- Icônes pour toutes les tailles
- Raccourcis vers les pages principales

## 🎯 Prochaines Étapes

### Phase 1 : Contenu Initial (En cours)
- [x] Page d'accueil
- [ ] Page liste des commerces
- [ ] Page détail d'un commerce
- [ ] Page événements
- [ ] Page à propos

### Phase 2 : Fonctionnalités
- [ ] Système de recherche avancé
- [ ] Filtres par catégorie et quartier
- [ ] Géolocalisation et commerces à proximité
- [ ] Favoris
- [ ] Avis et notes

### Phase 3 : Contenu
- [ ] Ajouter 50+ commerces
- [ ] Photographier les commerces
- [ ] Créer des événements
- [ ] Interviews d'artisans

### Phase 4 : Marketing
- [ ] Lancement officiel
- [ ] Partenariats avec chambres de commerce
- [ ] Promotion sur réseaux sociaux
- [ ] Formation des commerçants

## 🔧 Configuration Firebase

### Collections Firestore
- `businesses` - Commerces (filtrés par `cityId: 'korhogo'`)
- `events` - Événements locaux
- `reviews` - Avis clients
- `categories` - Catégories de commerces
- `users` - Utilisateurs

### Storage
```
/korhogo/
  ├── businesses/
  │   └── {businessId}/
  │       ├── logo.jpg
  │       └── photos/
  ├── events/
  └── cultural-assets/
```

## 👥 Contributeurs

- **Armely Ara** - Project Lead
- **The Day Info** - Développement
- **GDG Cloud Abidjan** - Support technique

## 📞 Contact

Pour toute question concernant Akwaba Korhogo :
- Email : contact@akwaba-korhogo.ci
- Téléphone : +225 25 86 00 00 00
- WhatsApp : +225 25 86 00 00 00

## 📄 Licence

Apache License 2.0 - Voir le fichier [LICENSE](../../LICENSE)

---

**Fait avec ❤️ pour Korhogo et la culture Senufo**
