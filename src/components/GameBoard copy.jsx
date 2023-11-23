export default function GameOver({ winner }) {
  return (
    <div id="game-over">
      <h2>Fin de Partie!</h2>
      <p>{winner} a gagné</p>
      <p>
        <button>Rejouer</button>
      </p>
    </div>
  );
}
