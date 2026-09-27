# Tutorial: Building an AI-Powered Web App with **Lovable** and **n8n**

This tutorial is based on this video: [Build Anything with Lovable + n8n AI Agents (beginner's guide)](https://www.youtube.com/watch?v=kUpTUEwKnrk)

This tutorial walks you through creating a simple web app using **Lovable** for the frontend and **n8n** for the backend workflow automation. You’ll build a fun app called **“Get Me Out of This”** that generates creative excuses with the help of an AI agent.

---

## 1. Understanding the Architecture

* **Lovable**: Used to build the frontend (the web page the user interacts with). You describe your app in natural language, and Lovable generates the code.
* **n8n**: A workflow automation platform. It connects your Lovable frontend to actions like AI text generation, APIs, or other integrations.
* **Flow**:

  1. User submits input in the Lovable app.
  2. Lovable sends the input to an n8n webhook.
  3. n8n processes it with an AI agent.
  4. Response is sent back to Lovable and displayed to the user.

---

## 2. Setting Up the Lovable App

1. Go to **Lovable** and start a new project.
2. In natural language, describe your app:

   * Example:

     ```
     Help me create a web app called "Get Me Out of This" where a user can submit a problem they're having.
     ```
3. Optionally, upload a screenshot of a landing page design for inspiration.
4. Lovable will generate a preview of your site. Use the chat panel to refine it:

   * “Make this page more simple.”
   * “Add a logo in the top left.”
   * “Change text color to black.”

💡 You can restore older versions if you don’t like a change.

---

## 3. Setting Up the n8n Workflow

1. Open **n8n** and create a new workflow.
2. Add a **Webhook node**:

   * Copy the test webhook URL.
   * This will receive data from Lovable.
3. In Lovable, configure the submit button to **send data via POST** to the n8n webhook.

---

## 4. Connecting an AI Agent in n8n

1. In the workflow, add an **AI Agent node**.
2. Configure it to use the problem submitted by the user:

   * Input: `problem` field from the webhook body.
   * System message example:

     ```
     You are an AI excuse generator. Create clever, creative, and humorous excuses someone could use to avoid a situation. Only return the excuse.
     ```
3. Add an **OpenAI Chat Model** node:

   * Connect your OpenAI API key.
   * Save credentials.

---

## 5. Sending Responses Back to Lovable

1. After the AI Agent node, add a **Respond to Webhook node**.
2. Configure the webhook node to **respond using this node** instead of immediately.
3. In Lovable, set the frontend to wait for the webhook response and display it under “Here is your excuse.”

---

## 6. Enhancing the App

* **Level System**: Add a dynamic system where users gain points for each submission (e.g., 5 points = Level 2).
* **Dropdown for Tone Selection**:

  1. Add a dropdown with options like *realistic, funny, ridiculous, outrageous*.
  2. Pass the selected tone to n8n.
  3. Update the system message to adjust excuses based on tone.
* Example outrageous excuse:

  > “I was trying to summon a unicorn, but accidentally transformed your iPhone into a rogue toaster.” 🦄🔥

---

## 7. Going Live

1. Switch the n8n workflow from **Test** to **Active**.
2. Replace the Lovable webhook URL with the **production URL**.
3. Publish your app:

   * Either to Lovable’s hosted domain.
   * Or connect to your custom domain.

---

## 8. Next Steps

* Add authentication (Supabase, Firebase) to save user levels and data.
* Explore more n8n integrations (Slack, Gmail, Airtable, QuickBooks).
* Optimize UI for mobile using Lovable’s preview options.
* Deploy advanced workflows with multiple AI agents.

---

✅ **You now have a working AI-powered web app** that generates excuses, complete with user levels and customizable tones. This is just the beginning—n8n’s integrations make it possible to connect your app to nearly any service.

---


