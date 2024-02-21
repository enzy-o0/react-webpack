const React = require("react");
const { useState, useRef } = React;
const SearchIcon = require("../../assets/icons/search.svg");

const TestComponent = function () {
  const [word, setWord] = useState("웹팩");
  const [value, setValue] = useState("");
  const [resultText, setResultText] = useState("");
  const [result, setResult] = useState([]);
  const inputRef = useRef(null);

  const onSubmitForm = (e) => {
    e.preventDefault();
    const isDuplicated = result.find((word) => value === word);
    if (!isDuplicated && word[word.length - 1] === value[0]) {
      setResultText("정답입니다");
      setWord(value);

      const resultArr = [...result];
      resultArr.push(value);
      setResult(resultArr);

      setValue("");

      inputRef.current.focus();
    } else {
      setResultText("틀렸습니다");
      setValue("");

      inputRef.current.focus();
    }
  };

  const onChangeInput = (e) => {
    setValue(e.target.value);
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "2rem",
      }}
    >
      <p>마지막으로 입력된 단어</p>
      <p>{word}</p>
      <form onSubmit={onSubmitForm}>
        <div
          style={{
            borderRadius: "30px",
            padding: "0.5rem 2rem",
            width: "500px",
            margin: "2rem 0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0px 5px 24.3px 2.7px rgba(0, 0, 0, 0.09)",
          }}
        >
          <img src={SearchIcon} alt="검색 아이콘" width={20} height={20} />
          <input
            ref={inputRef}
            value={value}
            onChange={onChangeInput}
            style={{
              border: "none",
              width: "100%",
              margin: "0 1rem",
              background: "transparent",
            }}
          />
          <button
            style={{
              backgroundColor: "#e0462e",
              color: "#fff",
              borderRadius: "30px",
              padding: "0.5rem 2rem",
              border: "none",
            }}
          >
            search
          </button>
        </div>
      </form>
      <p>{resultText}</p>
      <div
        style={{
          padding: "1rem 0.5rem",
          margin: "2rem 0",
          maxWidth: "500px",
          overflow: "scroll",
        }}
      >
        {/* <h3
          style={{
            padding: "1rem 0.5rem",
            margin: "2rem 0",
          }}
        >
          끝말잇기한 단어들
        </h3> */}
        <ul
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            justifyContent: "flex-start",
            rowGap: "1rem",
            textAlign: "center",
          }}
        >
          {result.map((e) => {
            return (
              <li
                style={{
                  border: "1px solid #edecef",
                  borderRadius: "10px",
                  padding: "0.3rem",
                  listStyle: "none",
                  margin: "0 1rem",
                }}
              >
                #{e}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

module.exports = TestComponent;
