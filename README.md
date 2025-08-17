# 🤖 Sum It Up - AI Meeting Summarizer

A full-stack application that transforms lengthy meeting transcripts into clear, structured, and sharable summaries using AI. This project was built as a technical assignment, focusing on core functionality, API integration, and rapid deployment.

**Live Demo:** **[sum-it-up-ai-meeting-summarizer-one.vercel.app](https://sum-it-up-ai-meeting-summarizer-one.vercel.app/)**

---

## Features

* **Upload/Paste Transcripts:** Users can easily input long-form text from meetings or calls.
* **Custom Prompts:** Guide the AI with specific instructions (e.g., "summarize for executives," "extract only action items").
* **AI-Powered Summarization:** Leverages the Groq API for incredibly fast and accurate summary generation.
* **Editable Output:** The generated summary can be edited and refined directly in the user interface.
* **Email Sharing:** Share the final summary with multiple recipients via email.

## Screenshot

<img width="1895" height="973" alt="image" src="https://github.com/user-attachments/assets/4bff7331-32c5-4cd7-8bf4-4cd98b3d89a6" />


## 🛠️ Tech Stack

| Area      | Technology                                                                                                                              |
| :-------- | :-------------------------------------------------------------------------------------------------------------------------------------- |
| **Frontend** | ![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black) ![Axios](https://img.shields.io/badge/Axios-5A29E4?logo=axios&logoColor=white)     |
| **Backend** | ![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white) ![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white) |
| **AI Service**| **Groq API** (for high-speed LLM inference)                                                                                             |
| **Email** | ![Nodemailer](https://img.shields.io/badge/Nodemailer-2B5A6A) **Gmail SMTP** |
| **Deployment**| ![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white) (Frontend) & **Render** (Backend)                       |


---

## 🚀 Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

* Node.js (v18 or later)
* npm or yarn
* Git

### Local Setup

1.  **Clone the repository:**
    ```bash
    git clone [Link to your new GitHub monorepo]
    cd ai-meeting-summarizer
    ```

2.  **Setup the Backend:**
    ```bash
    cd backend
    npm install
    ```
    Create a `.env` file in the `backend` directory and add the following variables:
    ```
    GROQ_API_KEY="your_groq_api_key_here"
    EMAIL_HOST="smtp.gmail.com"
    EMAIL_PORT=587
    EMAIL_USER="your-email@gmail.com"
    EMAIL_PASS="your-16-digit-google-app-password"
    ```
    Start the backend server:
    ```bash
    npm start 
    # The server will run on http://localhost:5000
    ```

3.  **Setup the Frontend:**
    Open a new terminal window.
    ```bash
    cd frontend
    npm install
    ```
    The frontend will automatically connect to the backend server running on port 5000. Start the React app:
    ```bash
    npm start
    # The app will open in your browser at http://localhost:3000
    ```

---

## Deployment

The application is deployed with a decoupled architecture:
* The **React frontend** is hosted on **Vercel**, providing a fast global CDN and seamless CI/CD from the `frontend` directory.
* The **Node.js/Express backend** is hosted on **Render**, which manages the server environment and environment variables from the `backend` directory.

---

## Future Improvements

* **User Authentication:** Add user accounts to save and manage past summaries.
* **Database Integration:** Use MongoDB to store user data and summaries.
* **File Uploads:** Allow direct upload of `.txt` or `.docx` files instead of pasting text.
* **Model Selection:** Allow users to choose between different AI models for summarization.

---
