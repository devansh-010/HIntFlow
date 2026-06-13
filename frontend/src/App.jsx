import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [problem, setProblem] = useState("");
  const [language, setLanguage] = useState("cpp");
  const [hintLevel, setHintLevel] = useState(1);
  const [code, setCode] = useState("");
  const [hint, setHint] = useState("");
  const [loading, setLoading] = useState(false);

  const generateHint = async () => {
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/generate-hint",
        {
          problem,
          language,
          code,
          hintLevel
        }
      );

      setHint(response.data.hint);
      setLoading(false);

    } catch (error) {
      console.error(error);
      setHint("Failed to generate hint.");
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>HintFlow</h1>
      <p>AI DSA Mentor</p>

      <input
        type="text"
        placeholder="Problem Name"
        value={problem}
        onChange={(e) => setProblem(e.target.value)}
      />

      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        <option value="cpp">C++</option>
        <option value="java">Java</option>
        <option value="python">Python</option>
      </select>

      <select
        value={hintLevel}
        onChange={(e) => setHintLevel(Number(e.target.value))}
      >
        <option value={1}>Hint Level 1</option>
        <option value={2}>Hint Level 2</option>
        <option value={3}>Hint Level 3</option>
        <option value={4}>Hint Level 4</option>
      </select>

      <textarea
        rows="10"
        placeholder="Paste your code here..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <button
        onClick={generateHint}
        disabled={loading}
      >
        {loading
          ? "Generating Hint..."
          : "Generate Hint"}
      </button>

      <div className="hint-box">
        {hint || "AI Hint will appear here"}
      </div>
    </div>
  );
}

export default App;