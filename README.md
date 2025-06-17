# 🤖 Stella-AI

**Smart AI Chatbot for Nova Corp (Private) Ltd**

Stella AI is an intelligent chatbot designed to assist users with cloud service inquiries through an interactive interface and powerful automation. Built with HTML, CSS, JavaScript, and powered by [n8n](https://n8n.io/), this project combines seamless frontend design with robust backend workflows to deliver a personalized support experience.

---

## 🌟 Features

- 💬 **Interactive Chat UI**  
  Responsive and user-friendly interface created using HTML, CSS, and JavaScript.

- ⚙️ **n8n Workflow Automation**  
  Manages message handling, memory storage, and AI interaction with custom nodes.

- 🧠 **OpenAI Integration**  
  Generates human-like responses using OpenAI's chat model.

- 📲 **Contact Collection**  
  Captures user contact numbers for follow-ups or priority support.

- 📊 **Google Sheets Logging**  
  Logs user data and queries for internal tracking and analytics.

- 📧 **Outlook Email Notifications**  
  Sends automated email updates to the team when user submits information.

- 🧬 **Vector Store via Pinecone**  
  Enables context-aware responses using embeddings.

---

## 🚀 How It Works

1. User starts a conversation through the Stella AI chat interface.
2. The message is sent to a webhook connected to n8n.
3. n8n processes the input using:
   - OpenAI Chat Model for response generation
   - Google Sheets for logging
   - Pinecone for semantic memory
   - Outlook for email notifications
4. The chatbot responds in real-time with intelligent answers.

---

## 🛠 Tech Stack

| Layer        | Technology                   |
|--------------|-------------------------------|
| Frontend     | HTML, CSS, JavaScript         |
| Automation   | n8n Workflow Automation        |
| AI Engine    | OpenAI GPT Model              |
| Vector Store | Pinecone                      |
| Logging      | Google Sheets API             |
| Email Alerts | Microsoft Outlook API         |

---

## 📸 Screenshots

### 💬 Chat Interface
[Stella AI](http://localhost:8080/)

### 🧩 n8n Workflow
[n8n Workflow](https://n8n.digiquarter.com/workflow/aSz8BFh62O8zLQjY)



