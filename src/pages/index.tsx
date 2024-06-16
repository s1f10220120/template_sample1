import { useState } from 'react';
import styles from './index.module.css';

const initialBoard: number[][] = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 2, 0, 0, 0],
  [0, 0, 0, 2, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];

const Home = () => {
  const [board, setBoard] = useState<number[][]>(initialBoard);
  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  const contStones = (board: number[][]) => {
    let black = 0;
    let white = 0;
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        if (board[y][x] === 1) black++;
        else if (board[y][x] === 2) white++;
      }
    }
    return { black, white };
  };
  const [turnColor, setTurnColor] = useState(1);
  const clickCell = (x: number, y: number) => {
    const newboard = JSON.parse(JSON.stringify(board));
    if (newboard[y][x] !== 0) return;
    for (const direction of directions) {
      for (let distance = 1; distance < 8; distance++) {
        if (newboard[y + direction[0] * distance] === undefined) break;
        else if (newboard[y + direction[0] * distance][x + direction[1] * distance] === 0) break;
        else if (newboard[y + direction[0] * distance][x + direction[1] * distance] === undefined)
          break;
        else if (newboard[y + direction[0] * distance][x + direction[1] * distance] === turnColor) {
          if (distance > 1) {
            for (let back = distance; back >= 0; back--) {
              newboard[y + direction[0] * back][x + direction[1] * back] = turnColor;
            }
            setBoard(newboard);
            setTurnColor(3 - turnColor);
          }
          break;
        } else if (
          newboard[y + direction[0] * distance][x + direction[1] * distance] ===
          3 - turnColor
        )
          continue;
      }
    }
  };

  const { black, white } = contStones(board);

  return (
    <div className={styles.container}>
      <div className={styles.turn}>
        <span>Current Turn: {turnColor === 1 ? 'Black' : 'White'}</span>
      </div>
      <div className={styles.score}>
        <div>Black: {black}</div>
        <div>White: {white}</div>
      </div>
      <div className={styles.board}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <div className={styles.cell} key={`${x}-${y}`} onClick={() => clickCell(x, y)}>
              <div
                className={styles.stone}
                style={{
                  backgroundColor: color === 1 ? 'black' : color === 2 ? 'white' : 'transparent',
                }}
              />
            </div>
          )),
        )}
      </div>
    </div>
  );
};

export default Home;
