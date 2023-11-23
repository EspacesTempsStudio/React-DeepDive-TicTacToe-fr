import { useState } from "react";
import GameBoard from "./components/GameBoard.jsx";
import Player from "./components/Player.jsx";
import Log from "./components/Log.jsx";
import GameOver from "./components/GameOver.jsx";

import {
  initialBoard,
  playerSymbols,
  WINNING_COMBINATIONS,
} from "./_constants";

function deriveActivePlayer(gameTurns) {
  let currentPlayer = playerSymbols[0];
  if (gameTurns.length > 0 && gameTurns[0].player === playerSymbols[0]) {
    currentPlayer = playerSymbols[1];
  }
  return currentPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const currentPlayer = deriveActivePlayer(gameTurns);

  let gameBoard = initialBoard;
  let winner;

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  for (const combination of WINNING_COMBINATIONS) {
    const firstSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSymbol = gameBoard[combination[2].row][combination[2].column];

    if (
      firstSymbol &&
      firstSymbol === secondSymbol &&
      secondSymbol === thirdSymbol
    ) {
      winner = firstSymbol;
    }
  }
  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  function handleResetBoard() {
    setGameTurns([]);
    winner = undefined;
    gameBoard = initialBoard;
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name="Joueur 1"
            symbol={playerSymbols[0]}
            isActive={currentPlayer === playerSymbols[0]}
          />
          <Player
            name="Joueur 2"
            symbol={playerSymbols[1]}
            isActive={currentPlayer === playerSymbols[1]}
          />
        </ol>
        {winner && <GameOver />}
        {!winner && (
          <center>
            <em>@ vous de jouer "{currentPlayer}" </em>
            <GameBoard board={gameBoard} onSelectSquare={handleSelectSquare} />
          </center>
        )}
      </div>
      <Log played={gameTurns} />
    </main>
  );
}

export default App;
