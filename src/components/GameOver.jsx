export default function GameOver({ winner, onReplay }) {
  let message = <p>{winner} a gagné</p>;

  if (!winner) {
    message = <p>Personne n'a gagné</p>;
  }
  return (
    <div id="game-over">
      <h2>Fin de Partie!</h2>
      {message}
      <p>
        <button onClick={onReplay}>Rejouer</button>
      </p>
    </div>
  );
}
