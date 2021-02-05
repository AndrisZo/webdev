import { useState } from 'react';
import './App.css';

function App() {
  const win = "win"
  const lose = "lose"
  const guessing = "guessing"
  const maxGuesses = 8;

  let [text, setText] = useState("")
  let [digits, setDigits] = useState(generateDigits())
  let [guesses, setGuesses] = useState([])
  let [feedback, setFeedback] = useState("")
  let [gamestate, setGamestate] = useState(guessing)

  function generateDigits() {
    let validDigits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    let output = []
    let i = 0;
    let temp;
    for (i = 0; i < 4; i++) {
      temp = Math.floor(Math.random() * validDigits.length)
      output.push(validDigits[temp])
      validDigits.splice(temp, 1)
    }
    return output
  }

  function updateText(ev) {
    if (!isNaN(ev.target.value) && ev.target.value.length < 5) {
      setText(ev.target.value)
    }
  }

  function keyPress(ev) {
    if (ev.key === "Enter") {
      makeGuess()
    }
  }

  function resetFeedback() {
    setFeedback("")
  }

  function makeGuess() {
    if (text.length === 4 && isAllUnique(text)) {
      guesses.push(text)
      setGuesses(guesses)
      setText("")
      resetFeedback()
      updateGamestate()
    } else {
      setFeedback("Guesses must be 4 unique numbers")
    }
  }

  function updateGamestate() {
    let thing = guesses[guesses.length - 1]
    console.log("Thing: " + String(thing))
    console.log("Digits: " + String(digits.join('')))
    if (guesses[guesses.length - 1] == digits.join('')) {
      console.log("Set gamestate to win")
      setGamestate(win)
    } else if (guesses.length >= 8) {
      console.log("Set gamestate to lose")
      setGamestate(lose)
    }
  }

  function isAllUnique(guess) {
    let splitguess = guess.split('')
    let i = 0;
    let j = 0;
    for (i = 0; i < splitguess.length - 1; i++) {
      for (j = i + 1; j < splitguess.length; j++) {
        if (splitguess[i] === splitguess[j]) {
          return false
        }
      }
    }
    return true
  }

  function resetGame() {
    setDigits(generateDigits())
    setText("")
    setGuesses([])
    setFeedback("")
    setGamestate(guessing)
  }

  function RenderGuesses() {
    let tablerows = [
      <tr>
        <th className="tableheader">Guess</th>
        <th className="tableheader">Bulls</th>
        <th className="tableheader">Cows</th>
      </tr>]
    let i = 0;
    for (i = 0; i < maxGuesses; i++) {
      if (i < guesses.length) {
        let [bulls, cows] = countBullsCows(guesses[i])
        tablerows.push(
          <tr>
            <td className="guess">{guesses[i]}</td>
            <td className="bulls">{bulls}</td>
            <td className="cows">{cows}</td>
          </tr>
        )
      } else {
        tablerows.push(
          <tr>
            <td className="guess"></td>
            <td className="bulls"></td>
            <td className="cows"></td>
          </tr>
        )
      }
    }

    return <table className="guesstable">{tablerows}</table>
  }

  function countBullsCows(guess) {
    let guessarray = guess.split('').map((stringguess) => (Number(stringguess)))
    let bulls = 0;
    let cows = 0;
    let i = 0;
    for (i = 0; i < guess.length; i++) {
      if (guess[i] == digits[i]) {
        bulls++
      } else if (digits.includes(guessarray[i])) {
        cows++
      }
    }
    return [bulls, cows]
  }

  function ResetButton() {
    return <button onClick={resetGame}> Reset </button>
  }

  let body = <p>Gamestate unknown</p>;

  if (gamestate === lose) {
    body = (
      <div>
        <h1>You lose!</h1>
        <p>The secret digits were {digits}</p>
        <ResetButton />
        <RenderGuesses />
      </div>
    )
  } else if (gamestate === win) {
    let isPlural = 'es'
    if (guesses.length <= 1) {
      isPlural = ''
    }
    body = (
      <div>
        <h1>You won in {guesses.length} guess{isPlural}!</h1>
        <p>The secret digits were {digits}</p>
        <ResetButton />
        <RenderGuesses />
      </div>
    )
  } else if (gamestate === guessing) {
    body = (
      <div>
        <h1>4 digits</h1>
        <input type="text" value={text} onChange={updateText} onKeyPress={keyPress} />
        <p><ResetButton /></p>
        <p>{feedback}</p>
        <RenderGuesses />
      </div>
    )
  }

  return (
    <div className="App">
      {body}
    </div>
  );
}

export default App;
