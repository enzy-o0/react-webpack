const React = require('react');
const { Component } = React;

class TestComponent extends Component {
    state = {
        word: 'Webpack',
        value: '',
        result: '',
    };

    onSubmitForm = (e) => {
        e.preventDefault();
        if (this.state.word[this.state.word.length - 1] === this.state.value[0]) {
            this.setState({
                result: '정답입니다',
                word: this.state.value,
                value: "",
            });
            this.input.focus();
        } else {
            this.setState({
                result: '틀렸습니다',
                value: "",
            });
            this.input.focus();
        }
    };

    onChangeInput = (e) => {
        this.setState({ value: e.target.value })
    };

    input;

    onRefInput = (c) => {
        this.input = c;
    }

    render() {
        return (
            <>
                <div>{this.state.word}</div>
                <form onSubmit={this.onSubmitForm}>
                    <input ref={this.onRefInput} value={this.state.value} onChange={this.onChangeInput} />
                </form>
                <div>{this.state.result}</div>
            </>
        )
    }
}

module.exports = TestComponent;