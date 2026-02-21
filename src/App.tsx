import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Rounds from "./components/Rounds";
import Footer from "./components/Footer";
import Round from "./components/RoundCard";
import Problem from "./components/Problem";
import LeaderboardPage from "./pages/LeaderboardPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Rounds />
              </>
            }
          />
          <Route path="/rounds/:roundId" element={<Round />} />
          <Route
            path="/rounds/:roundId/problem/:problemId"
            element={<Problem />}
          />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
