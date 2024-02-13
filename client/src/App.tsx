import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import CardArea from "./components/CardArea/CardArea";

function App() {
  return (
    <div className="container">
      <Navbar />
      <CardArea />
    </div>
  );
}

export default App;
