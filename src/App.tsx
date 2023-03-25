import { useEffect, useRef, useState } from "react";
import randomWords from "random-words";
import Word from "./components/Word/Word";
import WPM from "./components/WPM/WPM";
import settings from "/settings.svg";
import refresh from "/refresh.svg";
import useTimeStore from "./store/time";

function App() {
  const { clearTimeElapsed } = useTimeStore();
  const [userInput, setUserInput] = useState("");
  const [words, setWords] = useState<string[]>([]);
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [correctWordsArray, setCorrectWordsArray] = useState<boolean[]>([]);
  const [incorrectWordsArray, setIncorrectWordsArray] = useState<boolean[]>([]);
  const [isTimerStarted, setIsTimerStarted] = useState(false);
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [generatedWordsLength, setGeneratedWordsLength] = useState(30);
  const [wordLength, setWordLength] = useState(7);
  const [isSettingsActive, setIsSettingsActive] = useState(false);
  const textInput = useRef<HTMLInputElement>(null);
  const correctWordsLength = correctWordsArray.filter(
    (word) => word === true
  ).length;
  const incorrectWordsLength = incorrectWordsArray.filter(
    (word) => word === true
  ).length;
  const accuracy = Math.floor(
    ((words.length - incorrectWordsLength) / words.length) * 100
  );

  const generateWords = () => {
    setWords(
      randomWords({ exactly: generatedWordsLength, maxLength: wordLength })
    );
  };

  console.log(generatedWordsLength);

  const isWordCorrect = () => {
    const currentWord = words[activeWordIndex];

    setCorrectWordsArray([
      ...correctWordsArray,
      currentWord === userInput ? true : false,
    ]);
    setIncorrectWordsArray([
      ...incorrectWordsArray,
      currentWord !== userInput ? true : false,
    ]);
  };

  const processInput = (input: string) => {
    if (!isTimerStarted) {
      setIsTimerStarted(true);
    }

    if (input.endsWith(" ")) {
      if (userInput === "") return;

      if (activeWordIndex === words.length - 1) {
        setIsInputDisabled(true);
        setIsTimerStarted(false);
      }

      isWordCorrect();
      setUserInput("");
      setActiveWordIndex((prev) => prev + 1);
    } else {
      setUserInput(input);
    }
  };

  const refreshTest = () => {
    generateWords();
    clearTimeElapsed();
    setActiveWordIndex(0);
    setCorrectWordsArray([]);
    setIncorrectWordsArray([]);
    setIsInputDisabled(false);
    setIsTimerStarted(false);
    return;
  };

  useEffect(() => {
    textInput.current?.focus();
    generateWords();
  }, []);

  useEffect(() => {
    generateWords();
  }, [generatedWordsLength, wordLength]);

  return (
    <div className="app">
      <h1>typedash</h1>
      <div className="top">
        <div className="statistics">
          <WPM
            correctWords={correctWordsLength}
            isTimerStarted={isTimerStarted}
          />
          <span className="acc">
            accuracy: <br />
            {accuracy}%
          </span>
        </div>
        <div className="buttons">
          <button onClick={() => setIsSettingsActive((prev) => !prev)}>
            <img src={settings} alt="settings" />
          </button>
          <button onClick={() => refreshTest()}>
            <img src={refresh} alt="settings" />
          </button>
        </div>
        {isSettingsActive && (
          <div className={`settings${isSettingsActive ? " active" : ""}`}>
            <div className="setting-container">
              <span className="setting-label">
                max word length: {wordLength}
              </span>
              <input
                className="setting"
                value={wordLength}
                onChange={(e) => setWordLength(Number(e.target.value))}
                type="range"
                step={1}
                min={5}
                max={15}
              />
            </div>
            <div className="setting-container">
              <span className="setting-label">
                amount of words: {generatedWordsLength}
              </span>
              <input
                className="setting"
                value={generatedWordsLength}
                onChange={(e) =>
                  setGeneratedWordsLength(Number(e.target.value))
                }
                type="range"
                step={5}
                min={15}
                max={90}
              />
            </div>
          </div>
        )}
      </div>
      <p className="words">
        {words.map((word, index) => {
          return (
            <Word
              text={word}
              isActive={index === activeWordIndex}
              isCorrect={correctWordsArray[index] === !!words[index]}
              isIncorrect={incorrectWordsArray[index] === !!words[index]}
              key={index}
            />
          );
        })}
      </p>
      <input
        className="main-input"
        value={userInput}
        ref={textInput}
        onChange={(e) => processInput(e.target.value)}
        type="text"
        placeholder="start typing..."
        disabled={isInputDisabled}
      />
    </div>
  );
}

export default App;
