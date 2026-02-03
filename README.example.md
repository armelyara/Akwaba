# Akwaba - Digital Platform for Ivorian Cities

> **Note**: This is a template README. Copy this to `README.md` for your local documentation.

## About Akwaba

Akwaba is a digital platform initiative by **The Day Info** in collaboration with **GDG (Google Developer Group) Cloud Abidjan** to provide every city in Côte d'Ivoire with a professional website and mobile application.

The project was launched in January 2026 with the mission to:
- Promote local businesses and tourism
- Digitalize commercial activities
- Support economic development through technology
- Showcase the cultural richness of Ivorian cities

## Project Structure

```
akwaba/
├── cities/           # City-specific implementations
│   └── korhogo/     # Korhogo city site
├── core/            # Shared core functionality
├── functions/       # Firebase Cloud Functions
└── ...
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Firebase CLI
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/armelyara/Akwaba.git
cd akwaba
```

2. Install dependencies:
```bash
npm install
```

3. Set up Firebase configuration:
   - Copy `cities/korhogo/public/js/config.example.js` to `cities/korhogo/public/js/config.js`
   - Replace placeholder values with your actual Firebase configuration
   - **Never commit the actual config.js file**

### Firebase Setup

1. Create a Firebase project at https://console.firebase.google.com/
2. Enable Firestore Database
3. Enable Firebase Storage
4. Enable Firebase Authentication
5. Copy your Firebase configuration to `config.js`

### Running Locally

```bash
# Serve the site locally
firebase serve

# Or use a local server for the public directory
cd cities/korhogo/public
python3 -m http.server 8000
```

## Security

⚠️ **Important Security Notes:**

- **Never commit** files containing API keys or sensitive credentials
- The `.gitignore` is configured to exclude:
  - `*.md` files (documentation)
  - `**/config.js` (configuration with keys)
  - `.env*` files
  - Algolia configuration files
  - Service account keys

- Always use the `.example` files as templates
- Keep your Firebase configuration private

## Contributing

This project is developed by:
- **The Day Info** - Project initiator
- **GDG Cloud Abidjan** - Technical partner

## License

See LICENSE file for details.

## Contact

For inquiries about the Akwaba project:
- Email: contact@akwaba-korhogo.ci
- Website: https://korhogo.akwaba.ci

---

**Akwaba** - Welcoming you to discover Côte d'Ivoire's cities 🇨🇮
