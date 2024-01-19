const React = require("react");
const {createRoot} = require("react-dom/client");
const App = require("./App");

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);

// ReactDom.render(<TestComponent />, document.querySelector("#root"));

