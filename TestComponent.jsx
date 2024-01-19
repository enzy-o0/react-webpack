const React = require('react');
const { useState, useRef } = React;

const TestComponent = function() {
    const [word, setWord] = useState('Webpack');
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const inputRef = useRef(null);

    const onSubmitForm = (e) => {
        e.preventDefault();
        if (word[word.length - 1] === value[0]) {
            setResult('정답입니다');
            setWord(value);
            setValue("");
        
            inputRef.current.focus();
        } else {
            setResult('틀렸습니다');
            setValue("");
           
            inputRef.current.focus();
        }
    };

    const onChangeInput = (e) => {
        setValue(e.target.value);
    };

    return (
        <>
            <div>{word}</div>
            <form onSubmit={onSubmitForm}>
                <input ref={inputRef} value={value} onChange={onChangeInput} />
            </form>
            <div>{result}</div>
        </>
    )
    
}

module.exports = TestComponent;