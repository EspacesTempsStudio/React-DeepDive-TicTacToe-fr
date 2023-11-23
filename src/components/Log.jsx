export default function Log({ played }) {
  return (
    <ol id="log">
      {played.map((turn) => {
        return (
          <li key={"R" + turn.square.row + ",C" + turn.square.col}>
            {turn.player} a joué en R{turn.square.row + 1},C
            {turn.square.col + 1}
          </li>
        );
      })}
    </ol>
  );
}
