let currentHint = "";
let chatHistory = [];

const button = document.createElement("button");

button.innerText = "💡 HintFlow";
button.id = "hintflow-button";

const panel = document.createElement("div");

panel.id = "hintflow-panel";

panel.innerHTML = `
  <h3>HintFlow</h3>

  <div id="problem-title">
    Detecting problem...
  </div>

  <select id="hint-level">
    <option value="1">Hint Level 1</option>
    <option value="2">Hint Level 2</option>
    <option value="3">Hint Level 3</option>
    <option value="4">Hint Level 4</option>
  </select>

  <button id="generate-hint-btn">
    Generate Hint
  </button>

  <div id="hint-result">
    Hint will appear here
  </div>

  <hr>

  <div id="chat-section" style="display:none;">

    <hr>

    <h4>Ask HintFlow</h4>

    <textarea
      id="chat-input"
      placeholder="Ask about the hint..."
    ></textarea>

    <button id="send-chat-btn">
      Send
    </button>

    <div id="chat-history"></div>

  </div>
`;

document.body.appendChild(button);
document.body.appendChild(panel);

document
  .getElementById("generate-hint-btn")
  .addEventListener("click", async () => {

    const currentPath = window.location.pathname;

    const titleElement = Array.from(
      document.querySelectorAll('a[href^="/problems/"]')
    ).find(link => {
      const href = link.getAttribute("href");
      return currentPath.startsWith(href);
    });

    const problem =
      titleElement?.innerText.replace(/^\d+\.\s*/, "") ||
      "Unknown Problem";

    const code =
      document.querySelector(".view-lines")
        ?.innerText || "";

    const hintLevel =
      Number(
        document.getElementById("hint-level").value
      );

    const hintResult =
      document.getElementById("hint-result");

    hintResult.innerText = "Generating hint...";

    try {

      const response = await fetch(
        "http://localhost:5000/api/generate-hint",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            problem,
            code,
            language: "cpp",
            hintLevel
          })
        }
      );

      const data = await response.json();

      currentHint = data.hint;
      hintResult.innerText = data.hint;

      document.getElementById(
        "chat-section"
      ).style.display = "block";

    } catch (error) {

      console.error("Hint Error:", error);

      hintResult.innerText =
        "Failed to generate hint.";

    }

  });

document
  .getElementById("send-chat-btn")
  .addEventListener("click", async () => {

    const currentPath =
      window.location.pathname;

    const titleElement = Array.from(
      document.querySelectorAll(
        'a[href^="/problems/"]'
      )
    ).find(link => {
      const href =
        link.getAttribute("href");

      return currentPath.startsWith(href);
    });

    const problem =
      titleElement?.innerText
        .replace(/^\d+\.\s*/, "") ||
      "Unknown Problem";

    const code =
      document.querySelector(".view-lines")
        ?.innerText || "";

    const hintLevel =
      Number(
        document.getElementById("hint-level").value
      );

    const chatInput =
      document.getElementById("chat-input");

    const question =
      chatInput.value;

    if (!question.trim()) {
      return;
    }

    chatHistory.push({
      role: "user",
      content: question
    });

    chatInput.value = "";

    const chatHistoryDiv =
      document.getElementById(
        "chat-history"
      );

    chatHistoryDiv.innerHTML += `
      <div class="user-message">
        <strong>You:</strong><br>
        ${question}
      </div>

      <div class="ai-message">
        <strong>HintFlow:</strong><br>
        Thinking...
      </div>
    `;

    try {

      const response =
        await fetch(
          "http://localhost:5000/api/chat",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body: JSON.stringify({
              problem,
              code,
              currentHint,
              hintLevel,
              question,
              chatHistory
            })
          }
        );

      const data =
        await response.json();

      const aiMessages =
        document.querySelectorAll(
          ".ai-message"
        );

      const lastAiMessage =
        aiMessages[aiMessages.length - 1];

      lastAiMessage.innerHTML = `
        <strong>HintFlow:</strong><br>
        ${data.response}
      `;

      chatHistoryDiv.scrollTop =
        chatHistoryDiv.scrollHeight;

      chatHistory.push({
        role: "assistant",
        content: data.response
      });

    } catch (error) {

      console.error("Chat Error:", error);

      const aiMessages =
        document.querySelectorAll(
          ".ai-message"
        );

      const lastAiMessage =
        aiMessages[aiMessages.length - 1];

      lastAiMessage.innerHTML = `
        <strong>HintFlow:</strong><br>
        Failed to get response.
      `;

    }

  });

button.addEventListener("click", () => {
  panel.classList.toggle("show");
});

setTimeout(() => {
  const currentPath = window.location.pathname;

  const titleElement = Array.from(
    document.querySelectorAll('a[href^="/problems/"]')
  ).find(link => {
    const href = link.getAttribute("href");
    return currentPath.startsWith(href);
  });

  const title = titleElement?.innerText || "Unknown Problem";

  console.log("HintFlow Title:", title);

  const problemTitleDiv =
    document.getElementById("problem-title");

  if (problemTitleDiv) {
    problemTitleDiv.innerText =
      `Problem: ${title}`;
  }
}, 5000);

setTimeout(() => {
  const editor = document.querySelector(".view-lines");

  console.log(
    "HintFlow Code:",
    editor?.innerText
  );
}, 5000);