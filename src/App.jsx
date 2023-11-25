import { useState } from "react";
import GameBoard from "./components/GameBoard.jsx";
import Player from "./components/Player.jsx";
import Log from "./components/Log.jsx";
import GameOver from "./components/GameOver.jsx";

import { PLAYERS_SYMBOLS, INITIAL_PLAYERS } from "./_constants";

import {
  deriveActivePlayer,
  deriveGameBoard,
  deriveWinner,
} from "./_functions";

function App() {
  const [players, setPlayers] = useState(INITIAL_PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);
  const currentPlayer = deriveActivePlayer(gameTurns);

  // BAD WAY TO UPDATE ARRAY
  // IMMUTABILITY MATTERS - ALWAYS!
  // let gameBoard = initialBoard;
  const gameBoard = deriveGameBoard(gameTurns);

  const winner = deriveWinner(gameBoard, players);

  const hasDraw = gameTurns.length === 9 && !winner;

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
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name={INITIAL_PLAYERS.X}
            symbol={PLAYERS_SYMBOLS[0]}
            isActive={currentPlayer === PLAYERS_SYMBOLS[0]}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            name={INITIAL_PLAYERS.O}
            symbol={PLAYERS_SYMBOLS[1]}
            isActive={currentPlayer === PLAYERS_SYMBOLS[1]}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onReplay={handleResetBoard} />
        )}

        <center>
          <em>@ vous de jouer "{currentPlayer}" </em>
          <GameBoard board={gameBoard} onSelectSquare={handleSelectSquare} />
        </center>
      </div>
      <Log played={gameTurns} />
    </main>
  );
}

export default App;
