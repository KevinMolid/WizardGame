import { useState, useEffect } from "react";
import floor1 from "../assets/frames/floor_1.png";

const GameScreen = () => {
  const rows = 10;
  const cols = 13;

  // Track player's position on the grid
  const [playerPosition, setPlayerPosition] = useState<{
    row: number;
    col: number;
  }>({
    row: 0,
    col: 0,
  });

  // Create the grid
  const grid = Array.from({ length: rows }, (_, rowIndex) =>
    Array.from({ length: cols }, (_, colIndex) => ({ rowIndex, colIndex }))
  );

  // Handle keypress for movement
  const handleKeyPress = (e: KeyboardEvent) => {
    const { row, col } = playerPosition;

    if (e.key === "ArrowUp" && row > 0) {
      setPlayerPosition({ row: row - 1, col });
    } else if (e.key === "ArrowDown" && row < rows - 1) {
      setPlayerPosition({ row: row + 1, col });
    } else if (e.key === "ArrowLeft" && col > 0) {
      setPlayerPosition({ row, col: col - 1 });
    } else if (e.key === "ArrowRight" && col < cols - 1) {
      setPlayerPosition({ row, col: col + 1 });
    }
  };

  // Listen for keydown events
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [playerPosition]);

  return (
    <div className="w-max mx-auto">
      <div className="grid grid-cols-13 grid-rows-10 gap-0">
        {grid.flat().map((cell, index) => {
          const isPlayer =
            cell.rowIndex === playerPosition.row &&
            cell.colIndex === playerPosition.col;
          return (
            <div
              key={index}
              className={`w-[16px] h-[16px] ${
                isPlayer ? "bg-blue-500" : "bg-gray-900"
              }`}
              style={{
                backgroundImage: `url(${floor1})`,
              }}
            >
              {isPlayer && (
                <div className="w-[16px] h-[16px] absolute bg-blue-500 opacity-75"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GameScreen;
