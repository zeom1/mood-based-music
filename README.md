# 🎶 The Mood Machine: AI-Powered Music Recommender

An interactive, retro-editorial web application that generates highly curated song recommendations based on a user's exact state of mind. Built with React and powered by the Google Gemini API.

## ✨ Features

- **AI-Powered Curation**: Uses advanced prompt engineering to instruct the Gemini API to act as a master DJ, returning structured JSON tracklists rather than raw text.
- **Retro Editorial Interface**: A bespoke design system utilizing custom Tailwind CSS v4 variables, brutalist shadows, and a warm vintage color palette (Playfair Display & Space Mono).
- **Vinyl Player Animations**: Smooth, Framer Motion-powered interactive vinyl record that spins dynamically while the API fetches recommendations.
- **Bento-Grid Presets**: A modern, interactive grid layout for one-click mood selection (e.g., "Late Night Drive", "Sunday Sunshine").
- **Dark Mode Support**: A seamless Light/Dark mode toggle that persists user preference using Local Storage and Tailwind CSS variables.

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **AI Integration**: Google Gen AI SDK (`@google/genai`)

## 🧠 How it Works

The core of this application relies on **Prompt Engineering for Structured Output**. 
Instead of relying on a traditional music database, the app leverages the LLM's vast pre-trained knowledge. By injecting the user's mood into a strict system prompt, we force the AI to return a clean JSON array of tracks instead of conversational text. This allows the React frontend to parse and render the data programmatically.

### Architecture Workflow

```mermaid
flowchart TD

subgraph group_interaction["Mood Interaction"]
  node_mood_input["Mood Input<br/>[App.tsx]"]
  node_mood_presets["Mood Presets<br/>[BentoGrid.tsx]"]
  node_theme_controller["Theme Controller<br/>[App.tsx]"]
end

subgraph group_orchestration["App Orchestration"]
  node_app_shell["App Shell<br/>[App.tsx]"]
  node_track_state["Track State<br/>[App.tsx]"]
  node_error_feedback["Error Feedback<br/>[App.tsx]"]
end

subgraph group_ai["AI Curation"]
  node_recommendation_service["Recommendation Service<br/>[gemini.ts]"]
end

subgraph group_presentation["Music Presentation"]
  node_playlist_renderer["Playlist Renderer<br/>[App.tsx]"]
  node_vinyl_player["Vinyl Player<br/>[VinylPlayer.tsx]"]
  node_retro_styles["Retro Design System<br/>[index.css]"]
end

node_user(("Listener"))
node_theme_storage[("Theme Storage")]
node_gemini_api{{"Gemini API"}}

node_user -->|"enters mood"| node_mood_input
node_user -->|"chooses preset"| node_mood_presets
node_user -->|"toggles theme"| node_theme_controller
node_mood_input -->|"updates mood"| node_app_shell
node_mood_presets -->|"selects mood"| node_app_shell
node_theme_controller -->|"reads preference"| node_theme_storage
node_theme_controller -->|"persists preference"| node_theme_storage
node_theme_controller -->|"applies theme"| node_retro_styles
node_app_shell -->|"requests tracks"| node_recommendation_service
node_recommendation_service -->|"sends prompt"| node_gemini_api
node_gemini_api -->|"returns response"| node_recommendation_service
node_recommendation_service -->|"returns tracks"| node_track_state
node_app_shell -->|"passes recommendations"| node_playlist_renderer
node_app_shell -->|"sets loading state"| node_vinyl_player
node_app_shell -->|"sets errors"| node_error_feedback
node_vinyl_player -->|"uses visual system"| node_retro_styles
node_playlist_renderer -->|"uses visual system"| node_retro_styles

click node_app_shell "https://github.com/zeom1/mood-based-music/blob/master/src/App.tsx"
click node_mood_input "https://github.com/zeom1/mood-based-music/blob/master/src/App.tsx"
click node_mood_presets "https://github.com/zeom1/mood-based-music/blob/master/src/components/BentoGrid.tsx"
click node_theme_controller "https://github.com/zeom1/mood-based-music/blob/master/src/App.tsx"
click node_recommendation_service "https://github.com/zeom1/mood-based-music/blob/master/src/services/gemini.ts"
click node_track_state "https://github.com/zeom1/mood-based-music/blob/master/src/App.tsx"
click node_error_feedback "https://github.com/zeom1/mood-based-music/blob/master/src/App.tsx"
click node_playlist_renderer "https://github.com/zeom1/mood-based-music/blob/master/src/App.tsx"
click node_vinyl_player "https://github.com/zeom1/mood-based-music/blob/master/src/components/VinylPlayer.tsx"
click node_retro_styles "https://github.com/zeom1/mood-based-music/blob/master/src/index.css"

classDef toneNeutral fill:#f8fafc,stroke:#334155,stroke-width:1.5px,color:#0f172a
classDef toneBlue fill:#dbeafe,stroke:#2563eb,stroke-width:1.5px,color:#172554
classDef toneAmber fill:#fef3c7,stroke:#d97706,stroke-width:1.5px,color:#78350f
classDef toneMint fill:#dcfce7,stroke:#16a34a,stroke-width:1.5px,color:#14532d
classDef toneRose fill:#ffe4e6,stroke:#e11d48,stroke-width:1.5px,color:#881337
classDef toneIndigo fill:#e0e7ff,stroke:#4f46e5,stroke-width:1.5px,color:#312e81
classDef toneTeal fill:#ccfbf1,stroke:#0f766e,stroke-width:1.5px,color:#134e4a
class node_mood_input,node_mood_presets,node_theme_controller toneBlue
class node_app_shell,node_track_state,node_error_feedback,node_theme_storage toneAmber
class node_recommendation_service,node_gemini_api toneMint
class node_playlist_renderer,node_vinyl_player,node_retro_styles toneRose
class node_user toneIndigo
```

## 🚀 Getting Started

To run this project locally, you will need Node.js and a Google Gemini API Key.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/zeom1/mood-based-music.git
   cd mood-based-music
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env` file in the root directory and add your Gemini API key:
   ```env
   VITE_GEMINI_API_KEY=your_actual_api_key_here
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open your browser to `http://localhost:5173` to see the app in action!

## 🤝 Contributing
Feel free to fork this project, open issues, or submit PRs if you'd like to add new features or integrations!
