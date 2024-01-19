const React = require("react");
const TestComponent = require("./TestComponent")
require("./App.css");

const App = () => {
    return (
        <div style={{ fontWeight: 'bold' }}><TestComponent /></div>
    )
}

module.exports = App