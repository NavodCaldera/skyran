import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UnitTrustRates from "./components/UnitTrustRates";
import AuthPage from "./components/Signup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/unit-trust-rates" element={<UnitTrustRates />} />
        <Route 
          path="/" 
          element={
            <div className="text-center p-8">
              <Link to="/unit-trust-rates" className="text-blue-600 text-4xl font-bold hover:underline">
                Unit Trust
              </Link>
            </div>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
