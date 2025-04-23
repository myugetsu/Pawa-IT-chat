# Pawa IT Chat Bot

This repository contains the **Pawa IT Chat Bot**, a project that combines a Python backend with a Next.js frontend to deliver a seamless chat experience.

## Project Structure

```
/pawa_it_chat_bot
  ├── backend/ # Python backend code
  ├── pawa-it-chat-client/ # Next.js frontend code
  ├── .gitignore # Git ignore rules
  ├── README.md # Project documentation
```

### Backend

The backend is built with Python and provides the core functionality of the chat bot.

#### Key Features:
- Handles chat bot logic.
- API endpoints for communication with the frontend.
- Python environment setup with `venv`.

#### Setup Instructions:
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create a virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Set up environment variables:
   - Create a `.env` file in the `backend/` directory.
   - Add the required environment variables. For example:
     ```
      LLM_PROVIDER=your_api_provider
      OPENAI_API_KEY=your_api_key_here
      ANTHROPIC_API_KEY=your_api_key_here
      GOOGLE_API_KEY=your_api_key_here
     ```
   - Replace `your_api_key` with actual values.
5. Run the backend server:
   ```bash
   uvicorn app.main:app --reload
   ```

---

### Frontend (pawa-it-chat-client)

The frontend is built with Next.js and provides the user interface for the chat bot.

#### Key Features:
- Interactive chat interface.
- Responsive design.
- Integration with the backend API.

#### Setup Instructions:
1. Navigate to the frontend directory:
   ```bash
   cd pawa-it-chat-client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open the app in your browser at [http://localhost:3000](http://localhost:3000).

---

### Development

#### Prerequisites:
- Python 3.8+
- Node.js 16+
- npm or yarn

#### Running the Full Stack Locally:
1. Start the backend server (see backend setup instructions).
2. Start the frontend server (see frontend setup instructions).

