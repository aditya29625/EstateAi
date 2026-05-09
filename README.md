# EstateAI - AI-Powered Headless Real Estate Platform

EstateAI is a high-performance real estate platform built with **Next.js 15**, **Tailwind CSS**, and **Headless WordPress**. It features AI-driven property recommendations, predictive analytics, and a premium glassmorphic UI.

## 🚀 Key Features

- **Headless WordPress Backend**: Scalable CMS architecture using custom CPTs and REST API.
- **AI Property Assistant**: Interactive chatbot for real-time property Q&A.
- **Smart Analytics**: Real-time dashboards for agents and admins using Recharts.
- **Premium UI/UX**: Dark-themed, responsive design with smooth Framer Motion animations.
- **JWT Authentication**: Secure role-based access for Buyers, Agents, and Admins.

## 📁 Project Structure

```text
estateai/
├── src/                # Next.js Frontend
│   ├── app/            # App Router pages
│   ├── components/     # UI Components
│   ├── lib/            # API Clients & Utilities
│   └── store/          # Zustand State Management
└── wordpress-plugin/   # PHP Plugin for WordPress Backend
    └── wp-estate-ai/   # Custom CPT, REST API, and AI logic
```

## 🛠️ Setup Instructions

### Backend (WordPress)
1. Install WordPress on your server.
2. Copy the `wordpress-plugin/wp-estate-ai` folder to your WordPress `wp-content/plugins/` directory.
3. Activate the **EstateAI** plugin in the WordPress admin.
4. Install the **JWT Authentication for WP REST API** plugin for secure dashboard access.

### Frontend (Next.js)
1. Navigate to the `estateai` directory:
   ```bash
   cd estateai
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file and add your WordPress URL:
   ```env
   NEXT_PUBLIC_WP_API_URL=https://your-wordpress-site.com/wp-json
   OPENAI_API_KEY=your_openai_key
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## 🧠 AI Integration
The platform is designed to connect with OpenAI's API to provide:
- Property description generation
- Market price predictions
- Similarity-based recommendations using embeddings

---
Developed with ❤️ by Antigravity AI.
