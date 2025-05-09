import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="not-found">
      <h2>Сторінку не знайдено</h2>
      <p>Повернутися на <Link to="/">головну</Link></p>
    </div>
  );
};

export default NotFoundPage;
