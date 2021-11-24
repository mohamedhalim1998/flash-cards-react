import React from "react";
import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/NavBar";
import CardSetData from "./components/CardSet";
import CardSetGrid from "./components/CardSetGrid";

function App() {
  return (
    <div className="App">
      <NavBar />
      <CardSetGrid />
    </div>
  );
}

export default App;
