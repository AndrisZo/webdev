"""
{
  guesses: [
      [Username, [1, 2, 3, 4], bulls, cows],
      [Username, [1, 2, 3, 4], bulls, cows],
      [Username, [1, 2, 3, 4], bulls, cows],
      [Username, [1, 2, 3, 4], bulls, cows]
  ],
  secret: [1, 2, 3, 4],
  currentguesses: {
      username : [currentguess],
      username : [currentguess],
      username : [currentguess],
  }
  passed: [Username, Username],
  winners: [Username, Username],
  playerswinloss: {
      Username : [win, loss],
      Username : [win, loss],
  }
  players-ready: [Username, Username]
  turnnumber: integer
  setup: boolean
}

Calls the user can make to the server:
- "makeguess"
- "pass"
- "login"
- "ready-up"
- "ready-down"
- "becomeplayer"
- "becomeobserver"
- "exitgame"
- "joingame"
- "ping"
"""

defmodule Multibulls do
  def makeguess(gamestate, name, guess) do
    if isValidGuess(guess) do
      gamestate = Map.put(gamestate, :currentguesses, Map.put(gamestate.currentguesses.put(name, guess)))
      Map.put(gamestate, :passed, List.delete(gamestate.passed, name))
    end
  end

  def isValidGuess(guess) do
    Enum.uniq(guess) == guess
  end

  def allplayersguessed(gamestate) do
    Enum.sort(Enum.concat(Map.keys(gamestate.playerswinloss), gamestate.passed)) == Enum.sort(gamestate.currentguesses.keys())
  end

  def pushguesses(gamestate) do
    # Take all the guesses out, store them with their usernames
    # Get the cows and bulls for every guess
    # Add all of that to the guesses array in the proper format
    # Reset current guesses to an empty array
  end

  def pass(gamestate, name) do
    gamestate = Map.put(gamestate, :passed, [name | gamestate.passed])
    Map.put(gamestate, :currentguesses, Map.drop(gamestate.currentgueses, [name]))
  end

  def addplayer(gamestate, name) do

  end

  def removeplayer(gamestate, name) do

  end

  def readyplayer(gamestate, name) do
    Map.put(gamestate, :players-ready, [name | gamestate.players-ready])
  end

  def unreadyplayer(gamestate, name) do

  end

    # Create a random list of 4 digits
  def random_digits() do
    get_digits(4, [], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
  end

  # Helper for random_digits with an accumulator of the secret being built and the remaining uniq numbers
  def get_digits(numdigits, digits, avail) do
    cond do
      numdigits <= 0 -> digits
      numdigits > 0 ->
        {adddigit, newavail} = List.pop_at(avail, :rand.uniform(Enum.count(avail) - 1))
        get_digits(numdigits - 1, [adddigit | digits], newavail)
    end
  end

  # Take a list of guesses and make a list of cows and bulls for the given secret
  def all_cows_bulls(guesses, digits) do
    Enum.map(guesses, fn guess -> cows_bulls(guess, digits) end)
  end

  # Takes a guess and gives the number of cows and bulls for the guess
  def cows_bulls(guess, digits) do
    cows_bulls(guess, digits, digits, 0, 0)
  end

  # Helper for cows_bulls with accumulators to keep track of numbers of cows and bulls
  def cows_bulls(guessrem, digitsrem, digits, cows, bulls) do
    cond do
      Enum.empty?(guessrem) -> [cows, bulls]
      hd(guessrem) == hd(digitsrem) -> cows_bulls(tl(guessrem), tl(digitsrem), digits, cows, bulls + 1)
      Enum.member?(digits, hd(guessrem)) -> cows_bulls(tl(guessrem), tl(digitsrem), digits, cows + 1, bulls)
      true -> cows_bulls(tl(guessrem), tl(digitsrem), digits, cows, bulls)
    end
  end

end
