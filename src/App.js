import React from "react";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/about" element={<div>About Us</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
