# AI-angel-workflow
A lightweight monitoring and reliability solution designed for digital entrepreneurs utilizing AI-powered automation in their creator workflows.
ai-angel-workflow/
│
├── server.js
├── package.json
│
├── guardian/
│   ├── rules.js
│   ├── notifier.js
│   ├── aiSummaries.js
│   └── storage.js
│
├── dashboard/
│   └── index.html
│
└── data/
    └── events.db
# AI Workflow Guardian for Digital Entrepreneurs

A lightweight reliability and monitoring tool designed for creators, solopreneurs, and digital entrepreneurs who rely on AI-powered workflows.  
The Guardian watches your automations, detects failures, and notifies you when something breaks — so you never miss a post, upload, or campaign step again.

---

##  Why This Exists

Digital entrepreneurs increasingly depend on AI tools, automations, and multi-step workflows (YouTube automation, blog generation, affiliate funnels, newsletters, etc.).  
When something silently fails — a thumbnail doesn’t generate, an API times out, a script doesn’t save — you often discover it too late.

**AI Workflow Guardian solves that.**

It acts as a simple, universal “watchdog” for your workflows.

---

##  What It Does (MVP)

- Receives workflow events (success, error, warning)
- Classifies failures and severity
- Stores events for visibility
- Sends email notifications when something breaks
- (Optional) Uses an LLM to generate human-friendly explanations and suggested fixes
- Displays workflow status on a simple dashboard

---

##  Architecture Overview

**Core components:**

1. **Event Receiver (API Endpoint)**  
   A single `/event` endpoint that accepts JSON from any workflow tool (Zapier, Make, Node-RED, Python scripts, etc.).

2. **Guardian Engine**  
   A tiny rules engine that:
   - Detects errors  
   - Classifies severity  
   - Triggers retries (mocked for MVP)  
   - Escalates repeated failures  

3. **Notification System**  
   Sends email alerts using SendGrid.

4. **Optional AI Layer**  
   Uses an LLM to summarize errors and suggest fixes.

5. **Dashboard**  
   A simple HTML page showing:
   - Workflow status  
   - Recent events  
   - Guardian actions  

---

##  Tech Stack

- **Node.js + Express** (backend)
- **SQLite** (lightweight storage)
- **SendGrid** (email notifications)
- **OpenAI / Azure OpenAI** (optional AI summaries)
- **HTML + Fetch API** (dashboard)
- **Render.com** (recommended deployment)

---

##  Example Event Payloads

### Success event
```json
{
  "workflow": "YouTube Automation",
  "status": "success",
  "message": "Thumbnail generated successfully"
}
