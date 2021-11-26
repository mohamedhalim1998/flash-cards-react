import React from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import NewSet from "./pages/NewSet";


function App() {
  return (
    <div className="App bg-gray-100">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cardset/new" element={<NewSet />} />
      </Routes>
    </div>
  );
}

export default App;
