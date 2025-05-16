import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const StatisticsPage = () => {
  const [username, setUsername] = useState("");
  const [guessedWords, setGuessedWords] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setUsername(localStorage.getItem("username") || "");
    setGuessedWords(Number(localStorage.getItem("guessedWords") || 0));
  }, []);

  return (
    <div className="statistics-page">
      <h2>Статистика</h2>
      <p>
        <strong>{username}</strong>: вгадано слів — <strong>{guessedWords}</strong>
      </p>
      <button
        className="stats-btn"
        onClick={() => navigate("/")}
        type="button"
        style={{ marginTop: 24 }}
      >
        На головну
      </button>
    </div>
  );
};

export default StatisticsPage;