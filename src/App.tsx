import "./App.css";
import { Route, Routes } from "react-router";
import Home from "./page/Home";

function App() {
  return (
    <div>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
