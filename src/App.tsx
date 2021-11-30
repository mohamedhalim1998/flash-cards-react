import React from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import NewSet from "./pages/NewSet";
import Cards from "./pages/Cards";

function App() {
  return (
    <div className="App bg-gray-100">
      <NavBar />
      <Routes>
        <Route path="/cardset/new" element={<NewSet />} />
          <Route path="/cardset/:id" element={<Cards />} />
          <Route path="/cardset" element={<Home />} />
          <Route path="/" element={<Home />} />
        </Routes>
    </div>
  );
}

export default App;
