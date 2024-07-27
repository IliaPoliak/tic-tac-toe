import React, { useEffect, useState } from 'react';

export default function App() {
  // state to manage the squares on the board
  const [squares, setSquares] = useState(['', '', '', '', '', '', '', '', '']);
  // state to track whose turn it is
  const [isXTurn, setIsXTurn] = useState(true);
  // state to display the game status
  const [status, setStatus] = useState('');
  // state to check if the game is finished
  const [isFinished, setIsFinished] = useState(false);

   // function to determine the winner of the game
  function getWinner(squares) {
    const winningPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
      [0, 3, 6],
      [1, 4, 7],
    ];

    for (const [x, y, z] of winningPatterns) {
      if (
        squares[x] &&
        squares[x] === squares[y] &&
        squares[x] === squares[z]
      ) {
        return squares[x];
      }
    }

    return null;
  }

  // handle a click on a square
  function handleClick(currentSquare) {
     // copy the squares array to avoid changing the "squares" state
    let cpySquares = [...squares];
    // if the square is already filled or the game is finished, do nothing
    if (cpySquares[currentSquare] || isFinished) {
      return;
    }
    // set the current square to 'X' or 'O' based on whose turn it is
    cpySquares[currentSquare] = isXTurn ? 'X' : 'O';
    // toggle the turn
    setIsXTurn(!isXTurn);
    // update the squares state
    setSquares(cpySquares);
  }

  // handle restarting the game
  function handleRestart() {
    // reset the game state
    setIsFinished(false);
    setIsXTurn(true);
    setSquares(['', '', '', '', '', '', '', '', '']);
  }

  // use effect to update the game status whenever "squares" or "isXTurn" changes
  useEffect(() => {
    const winner = getWinner(squares);

    // if there's a winner, set the status and mark the game as finished
    if (winner) {
      setStatus(`Winner is ${winner}`);
      setIsFinished(true);
    // if all squares are filled and there's no winner, it's a tie
    } else if (squares.every((squares) => squares)) {
      setStatus('This is a tie');
    // otherwise, display whose turn it is next
    } else {
      setStatus(`Next player is ${isXTurn ? 'X' : 'O'}`);
    }
  }, [squares, isXTurn]);

  return (
    <div className="App">
      <h1>{status}</h1>
      <div>
        <button className="square" onClick={() => handleClick(0)}>
          {squares[0]}
        </button>
        <button className="square" onClick={() => handleClick(1)}>
          {squares[1]}
        </button>
        <button className="square" onClick={() => handleClick(2)}>
          {squares[2]}
        </button>
      </div>
      <div>
        <button className="square" onClick={() => handleClick(3)}>
          {squares[3]}
        </button>
        <button className="square" onClick={() => handleClick(4)}>
          {squares[4]}
        </button>
        <button className="square" onClick={() => handleClick(5)}>
          {squares[5]}
        </button>
      </div>
      <div>
        <button className="square" onClick={() => handleClick(6)}>
          {squares[6]}
        </button>
        <button className="square" onClick={() => handleClick(7)}>
          {squares[7]}
        </button>
        <button className="square" onClick={() => handleClick(8)}>
          {squares[8]}
        </button>
      </div>
      <button onClick={handleRestart}>Restart</button>
    </div>
  );
}
