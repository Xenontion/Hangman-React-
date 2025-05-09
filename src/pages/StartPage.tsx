import { useNavigate } from "react-router-dom";

const StartPage = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/game");
  };

  return (
    <div className="start-page">
      <h2>Ласкаво просимо до гри "Вгадай Слово"</h2>
      <button onClick={handleStart}>Почати гру</button>
    </div>
  );
};

export default StartPage;