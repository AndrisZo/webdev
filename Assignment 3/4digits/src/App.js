import { useState } from 'react';
import './App.css';

function App() {
  let [text, setText] = useState("")
  let [digits, setDigits] = useState(generateDigits())
  let [guesses, setGuesses] = useState([])
  let [feedback, setFeedback] = useState("")

  const maxGuesses = 8;


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
      console.log("Made guess: " + text)
      guesses.push(text)
      setGuesses(guesses)
      setText("")
      resetFeedback()
    } else {
      setFeedback("Guesses must be 4 unique numbers")
    }
  }

  function isAllUnique(guess) {
    let splitguess = guess.split('')
    let i = 0;
    let j = 0;
    for (i = 0; i < splitguess.length - 1; i++) {
      for (j = i + 1; j < splitguess.length; j++) {
        console.log("Comparing " + splitguess[i] + " with " + splitguess[j])
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
  }

  function RenderGuesses() {
    console.log("Current guesses: " + String(guesses))
    let tablerows = []
    let i = 0;
    for (i = 0; i < maxGuesses; i++) {
      if (i < guesses.length) {
        let [bulls, cows] = countBullsCows(guesses[i])
        tablerows.push(
          <tr>
            <td>{guesses[i]}</td>
            <td>{bulls}</td>
            <td>{cows}</td>
          </tr>
        )
      } else {
        tablerows.push(
          <tr>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        )
      }
    }

    return tablerows
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


  return (
    <div className="App">
      <p>{digits}</p>
      <input type="text" value={text} onChange={updateText} onKeyPress={keyPress}/>
      <p><button onClick={resetGame}> Reset </button></p>
      <p>{feedback}</p>
      <table>
        <tr>
          <th>Guess</th>
          <th>Bulls</th>
          <th>Cows</th>
        </tr>
        <RenderGuesses />
      </table>
    </div>
  );
}

export default App;
