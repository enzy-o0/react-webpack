import React from "react";
import {createRoot} from "react-dom/client";
import App from './src/App.jsx';
import './src/App.css';

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);

// ReactDom.render(<TestComponent />, document.querySelector("#root"));

