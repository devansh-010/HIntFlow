const button = document.createElement("button");

button.innerText = "💡 HintFlow";
button.id = "hintflow-button";

const panel = document.createElement("div");

panel.id = "hintflow-panel";

panel.innerHTML = `
  <h3>HintFlow</h3>

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
`;

document.body.appendChild(button);
document.body.appendChild(panel);

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

  console.log(
    "HintFlow Title:",
    titleElement?.innerText
  );
}, 5000);