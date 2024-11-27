import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AddSignature from "./AddSignature";
import EVOS from "./EVOS";

function App() {
  return (
    <Router>
    <div className="App">
      <header className="App-header">

      <h1>Early Verification of Signatures (EVOS)</h1>

      {/* Navigation Buttons */}
      <nav>
            <Link to="/addsignature">
              <button>Add Signature</button>
            </Link>
            <Link to="/verifysignature">
              <button>Verify Signature</button>
            </Link>
      </nav>
      <Routes>
            {/* Route for AddSignature */}
            <Route path="/addsignature" element={<AddSignature />} />

            {/* Route for EVOS */}
            <Route path="/verifysignature" element={<EVOS />} />
          </Routes>
      </header>
    </div>
    </Router>
  );
}

export default App;
