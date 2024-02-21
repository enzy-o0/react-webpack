import React from "react";
import TestComponent from "./components/TestComponent";
import "./App.css";

const App = () => {
  return (
    // kelly-sikkema-4JxV3Gs42Ks-unsplash
    <div
      style={{
        // backgroundImage: "url(./assets/images/bg.jpg)",
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255)), url('${require("../assets/images/bg.jpg")}')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        width: "100vw",
        minHeight: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <h1>끝말잇기</h1>
      <TestComponent />
    </div>
  );
};

export default App;
