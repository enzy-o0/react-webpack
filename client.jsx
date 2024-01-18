const React = require("react");
const {createRoot} = require("react-dom/client");
const TestComponent = require("./TestComponent");

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<TestComponent />);

// ReactDom.render(<TestComponent />, document.querySelector("#root"));

