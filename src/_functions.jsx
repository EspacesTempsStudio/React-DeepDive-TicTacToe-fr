import {
  INITIAL_BOARD,
  PLAYERS_SYMBOLS,
  WINNING_COMBINATIONS,
} from "./_constants";

export function deriveActivePlayer(gameTurns) {
  let currentPlayer = PLAYERS_SYMBOLS[0];
  if (gameTurns.length > 0 && gameTurns[0].player === PLAYERS_SYMBOLS[0]) {
    currentPlayer = PLAYERS_SYMBOLS[1];
  }
  return currentPlayer;
}

export function deriveWinner(gameBoard, players) {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSymbol = gameBoard[combination[2].row][combination[2].column];

    if (
      firstSymbol &&
      firstSymbol === secondSymbol &&
      secondSymbol === thirdSymbol
    ) {
      winner = players[firstSymbol];
    }
  }

  return winner;
}

export function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_BOARD.map((arr) => [...arr])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  return gameBoard;
}
