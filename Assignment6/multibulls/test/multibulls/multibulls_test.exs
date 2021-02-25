defmodule Multibulls.MultibullsTest do
  use ExUnit.Case
  import Multibulls.Game

  def getexample() do
    %{
      guesses: [
        ["player1", [1, 2, 3, 4], 0, 0],
        ["player2", [5, 6, 7, 8], 0, 2],
        ["player3", [1, 6, 2, 9], 0, 1],
        ["player4", [5, 3, 2, 1], 0, 0]
      ],
      secret: [7, 8, 9, 0],
      currentguesses: %{
        "player3" => [7, 8, 9, 0],
        "player4" => [8, 0, 7, 9]
      },
      passed: ["player1", "player2"],
      winners: [],
      playerswinloss: %{
        "player1" => [1, 18],
        "player2" => [4, 7],
        "player3" => [2, 12],
        "player4" => [5, 10],
      },
      playersready: ["player1", "player2", "player3", "player4"],
      turnnumber: 2,
      setup: False
    }
  end

  def lesspasses() do
    %{
      guesses: [
        ["player1", [1, 2, 3, 4], 0, 0],
        ["player2", [5, 6, 7, 8], 0, 2],
        ["player3", [1, 6, 2, 9], 0, 1],
        ["player4", [5, 3, 2, 1], 0, 0]
      ],
      secret: [7, 8, 9, 0],
      currentguesses: %{
        "player3" => [7, 8, 9, 0],
        "player4" => [8, 0, 7, 9]
      },
      passed: ["player1"],
      winners: [],
      playerswinloss: %{
        "player1" => [1, 18],
        "player2" => [4, 7],
        "player3" => [2, 12],
        "player4" => [5, 10],
      },
      playersready: ["player1", "player2", "player3", "player4"],
      turnnumber: 2,
      setup: False
    }
  end

  def lessguesses() do
    %{
      guesses: [
        ["player1", [1, 2, 3, 4], 0, 0],
        ["player2", [5, 6, 7, 8], 0, 2],
        ["player3", [1, 6, 2, 9], 0, 1],
        ["player4", [5, 3, 2, 1], 0, 0]
      ],
      secret: [7, 8, 9, 0],
      currentguesses: %{
        "player3" => [7, 8, 9, 0]
      },
      passed: ["player1", "player2"],
      winners: [],
      playerswinloss: %{
        "player1" => [1, 18],
        "player2" => [4, 7],
        "player3" => [2, 12],
        "player4" => [5, 10],
      },
      playersready: ["player1", "player2", "player3", "player4"],
      turnnumber: 2,
      setup: False
    }
  end


  test "test make a guess" do
    assert makeguess(getexample(), "player1", [8, 7, 9, 0]).currentguesses ==
    %{
      "player1" => [8, 7, 9, 0],
      "player3" => [7, 8, 9, 0],
      "player4" => [8, 0, 7, 9]
    }

    assert makeguess(getexample(), "player1", [8, 7, 9, 0]).passed == ["player2"]
    assert makeguess(getexample(), "player1", [8, 7, 9, 0]).turnnumber == 2
  end

  test "test is valid guess" do
      assert isValidGuess([1, 2, 3, 4])
      assert not isValidGuess([1, 2, 3])
      assert not isValidGuess([1, 1, 3, 4])
  end

  test "test all players guessed" do
    assert allplayersguessed(getexample())
    assert not allplayersguessed(lessguesses())
    assert not allplayersguessed(lesspasses())
  end



end
