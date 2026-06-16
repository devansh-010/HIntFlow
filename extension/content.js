let currentHint = "";
let chatHistory = [];

const button = document.createElement("button");

button.innerText = "💡 HintFlow";
button.id = "hintflow-button";

const panel = document.createElement("div");

panel.id = "hintflow-panel";

panel.innerHTML = `
  <div id="hintflow-hero">
    <span id="hintflow-hero-icon">💡</span>
    <span id="hintflow-hero-title">HintFlow</span>
    <span id="hintflow-hero-tagline">Your AI Hint Companion</span>
  </div>

  <div id="problem-title">
    Detecting problem...
  </div>

  <div id="hint-level-dropdown" class="custom-dropdown">
    <div class="custom-dropdown-selected" id="dropdown-selected">
      <span>Hint Level 1</span>
      <svg class="dropdown-arrow" width="12" height="12" viewBox="0 0 16 16" fill="#9ca3af">
        <path d="M4 6l4 4 4-4"/>
      </svg>
    </div>
    <ul class="custom-dropdown-options" id="dropdown-options">
      <li data-value="1" class="active">Hint Level 1</li>
      <li data-value="2">Hint Level 2</li>
      <li data-value="3">Hint Level 3</li>
      <li data-value="4">Hint Level 4</li>
    </ul>
    <input type="hidden" id="hint-level" value="1">
  </div>

  <button id="generate-hint-btn">
    Generate Hint
  </button>

  <div id="hint-result">
    Hint will appear here
  </div>

  <hr>

  <div id="chat-section" style="display:none;">

    <hr>

    <div id="chat-history"></div>

    <div id="chat-input-container">

      <div id="chat-controls">

      <textarea
        id="chat-input"
        placeholder="Ask about the hint..."
      ></textarea>

      <button id="send-chat-btn">
        ➤
      </button>

    </div>

    </div>

  </div>
`;

document.body.appendChild(button);
document.body.appendChild(panel);

// Custom dropdown logic
const dropdownEl = document.getElementById("hint-level-dropdown");
const dropdownSelected = document.getElementById("dropdown-selected");
const dropdownOptions = document.getElementById("dropdown-options");
const hiddenInput = document.getElementById("hint-level");

dropdownSelected.addEventListener("click", (e) => {
  e.stopPropagation();
  dropdownEl.classList.toggle("open");
});

dropdownOptions.addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (!li) return;
  dropdownOptions.querySelectorAll("li").forEach(el => el.classList.remove("active"));
  li.classList.add("active");
  dropdownSelected.querySelector("span").textContent = li.textContent;
  hiddenInput.value = li.dataset.value;
  dropdownEl.classList.remove("open");
});

document.addEventListener("click", () => {
  dropdownEl.classList.remove("open");
});

dropdownEl.addEventListener("click", (e) => e.stopPropagation());


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

    const examples = Array.from(
      document.querySelectorAll("pre")
    )
      .slice(0, 3)
      .map(pre => pre.innerText);

    const constraints = Array.from(
      document.querySelectorAll("ul")
    )
      .map(ul => ul.innerText)
      .find(text =>
        text.includes("nums.length") ||
        text.includes("target")
      ) || "";

    console.log(
      "HintFlow Constraints:",
      constraints
    );

    const hintLevel =
      Number(
        document.getElementById("hint-level").value
      );

    const hintResult =
      document.getElementById("hint-result");

    hintResult.innerText = "Generating hint...";

    try {
      console.log("Sending examples:", examples);
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
            hintLevel,
            examples,
            constraints
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

document
  .getElementById("chat-input")
  .addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      document.getElementById("send-chat-btn").click();
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

setTimeout(() => {

  const examples = Array.from(
    document.querySelectorAll("pre")
  ).map(pre => pre.innerText);

  console.log(
    "HintFlow Examples:",
    examples
  );

}, 5000);

setTimeout(() => {

  const allLists = Array.from(
    document.querySelectorAll("ul")
  );

  console.log(
    "HintFlow ULs:",
    allLists.map(
      ul => ul.innerText
    )
  );

}, 5000);