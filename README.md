# Akwaba - Multi-City Local Business Platform for Côte d'Ivoire

**Akwaba** is a multi-city platform connecting residents with local businesses across Ivorian cities. Built with vanilla JavaScript, HTML5, CSS3, and PWA technology for optimal performance and cultural customization.

## 🎯 Project Vision

Create a unified platform architecture that adapts to each city's unique culture while maintaining consistent functionality. Each city gets its own branded website and Progressive Web App.

## 🌍 Cities

### Current:
- **Korhogo** - First city (Senufo culture, traditional crafts)

### Planned:
- Abidjan
- Bouaké
- Yamoussoukro
- Daloa
- San-Pédro

## 🏗️ Architecture

### Single Firebase Project, Multiple Sites
- Shared backend infrastructure
- City-specific frontends
- Multi-tenant database with city filtering
- Cost-effective scaling

### Technology Stack
- **Frontend:** Vanilla JavaScript (ES6+), HTML5, CSS3
- **Backend:** Firebase (Firestore, Auth, Storage, Functions, Hosting)
- **Mobile:** Progressive Web App (PWA)
- **Deployment:** Firebase Multi-Site Hosting

## 📁 Project Structure

```
akwaba/
├── core/                           # Shared functionality
│   ├── js/                         # Core JavaScript
│   ├── css/                        # Core CSS
│   └── html/                       # Reusable HTML components
├── cities/                         # City-specific sites
│   └── korhogo/                    # Korhogo city
│       ├── public/                 # Deployable files
│       │   ├── css/                # Korhogo theme
│       │   ├── js/                 # City config
│       │   ├── assets/             # Images, icons, patterns
│       │   ├── manifest.json       # PWA manifest
│       │   └── service-worker.js   # Offline support
│       └── README.md
├── functions/                      # Cloud Functions
├── firebase.json                   # Multi-site hosting config
├── firestore.rules                 # Database security rules
└── storage.rules                   # Storage security rules
```

## 🎨 Design Philosophy

### Website vs Mobile App
- **Website (Desktop):** Full information, detailed descriptions, galleries
- **Mobile App (PWA):** Essential info only - quick actions (call, navigate, open hours)

### Cultural Authenticity
Each city's design reflects its unique cultural identity:
- **Korhogo:** Senufo patterns, earth tones, traditional crafts aesthetic
- **Future cities:** Custom themes based on local culture

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Firebase CLI (`npm install -g firebase-tools`)
- Git

### Installation

```bash
# Clone repository
git clone https://github.com/armelyara/Akwaba.git
cd akwaba

# Install dependencies
npm install

# Login to Firebase
firebase login

# Initialize Firebase project
firebase init
```

### Development

```bash
# Serve locally (Korhogo)
firebase serve --only hosting:akwaba-korhogo

# Deploy specific city
firebase deploy --only hosting:akwaba-korhogo

# Deploy all
firebase deploy
```

## 📱 PWA Features

- ✅ Installable to home screen
- ✅ Offline functionality
- ✅ Push notifications for events
- ✅ Location-based business discovery
- ✅ Click-to-call, click-to-navigate
- ✅ Share businesses via native share

## 🔥 Firebase Structure

### Collections
- `cities` - City configurations
- `businesses` - Business listings (with cityId)
- `events` - Community events (with cityId)
- `users` - User accounts
- `categories` - Business categories

### Storage
```
/korhogo/businesses/{businessId}/
/korhogo/events/{eventId}/
/shared/defaults/
```

## 🌐 Deployment

### Multi-Site Hosting
Each city has its own Firebase Hosting site:
- `akwaba-korhogo` → korhogo.akwaba.ci
- `akwaba-abidjan` → abidjan.akwaba.ci
- `akwaba-bouake` → bouake.akwaba.ci

## 📊 Key Features

### For Users
- 🔍 Search businesses by name, category, neighborhood
- 📍 Location-based discovery (mobile)
- ⭐ Business ratings and reviews
- 📅 Community events calendar
- 💾 Save favorites
- 📱 PWA installation
- 🌐 Offline browsing

### For Business Owners
- 👤 Business profile management
- 📸 Photo gallery upload
- ⏰ Hours management
- 📢 Event posting
- 📊 Basic analytics

### For Admins
- ✅ Approve/reject business listings
- 🎯 Moderate content
- 📈 Platform analytics
- 🏙️ City management

## 🛠️ Development Guidelines

### Adding a New City

1. Create city folder structure
2. Configure city theme (CSS)
3. Set up city configuration (JS)
4. Create PWA manifest
5. Add to firebase.json
6. Deploy

```bash
# Script coming soon
./scripts/create-city.sh yamoussoukro
```

### Code Standards
- Vanilla JavaScript - No frameworks
- Mobile-first CSS
- Semantic HTML5
- Accessible (WCAG 2.1 AA)
- Progressive enhancement

## 📝 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Project Lead:** Armely Ara
- **Architecture:** Akwaba Development Team

## 🔗 Links

- **GitHub Repo:** https://github.com/armelyara/Akwaba
- **Project Board:** https://github.com/users/armelyara/projects/2
- **Documentation:** Coming soon

## 📞 Contact

For questions or collaboration: [Add contact info]

---

**By The Day Info X GDG Cloud Abidjan**