import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AddSignature from "./AddSignature";
import EVOS from "./EVOS";
import About from "./About";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
            {/* Logo and Title as a Link to Main Page */}
            <Link to="/" className="logo-link">
            <img src="/logo.png" alt="EVOS Logo" className="logo" />
          </Link>

          {/* Styled Navbar */}
          <nav className="navbar">
            <Link to="/about" className="nav-link">
              About EVOS
            </Link>
            <Link to="/addsignature" className="nav-link">
              Add Signature
            </Link>
            <Link to="/verifysignature" className="nav-link">
              Verify Signature
            </Link>
          </nav>

          {/* Routes */}
          <Routes>
            <Route path="/addsignature" element={<AddSignature />} />
            <Route path="/verifysignature" element={<EVOS />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
