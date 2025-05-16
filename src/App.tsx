import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import GamePage from "./pages/GamePage";
import StartPage from "./pages/StartPage";
import NotFoundPage from "./pages/NotFoundPage";
import StatisticsPage from "./pages/StatisticsPage";
import "./styles/styles.css";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" Component={StartPage} />
          <Route path="/game" Component={GamePage} />
          <Route path="/stats" Component={StatisticsPage} />
          <Route path="*" Component={NotFoundPage} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
