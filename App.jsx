import { useEffect, useMemo, useState } from "react";
import "./App.css";

function App() {
  const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, ""].sort(
    () => Math.random() - 0.5
  );

  const ORDER_WINNER = useMemo(
    () => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, ""],
    []
  );

  const [number, setNumber] = useState(() => {
    const number = JSON.parse(localStorage.getItem("number"));
    console.log(number);
    return number ? number : NUMBERS;
  });

  const [count, setCount] = useState(() => {
    const count = JSON.parse(localStorage.getItem("count"));
    console.log(count);
    return count ? count : 0;
  });

  useEffect(() => {
    for (let index = 0; index < number.length; index++) {
      if (number[index] === ORDER_WINNER[index]) {
        const id = document.getElementById(index);
        id.classList.remove("bg-red-700");
        id.classList.add("bg-green-700");
      } else {
        const id = document.getElementById(index);
        id.classList.remove("bg-green-700");
        id.classList.add("bg-red-700");
      }
    }

    const isWin = number.toString() === ORDER_WINNER.toString();
    isWin && alert("Bạn Đã Chiến Thắng! :)))");
  }, [number, ORDER_WINNER]);

  const moveTile = (index) => {
    const tile = number[index];
    const tileIndex = number.indexOf(tile);
    const emptyIndex = number.indexOf("");

    const tileRow = Math.floor(tileIndex / 4);
    const emptyRow = Math.floor(emptyIndex / 4);
    const tileCol = tileIndex % 4;
    const emptyCol = emptyIndex % 4;

    const isMoveable =
      (tileRow === emptyRow && Math.abs(tileCol - emptyCol) === 1) ||
      (tileCol === emptyCol && Math.abs(tileRow - emptyRow) === 1);

    if (isMoveable) {
      const newNumbers = [...number];
      newNumbers[tileIndex] = "";
      newNumbers[emptyIndex] = tile;
      setNumber(newNumbers);
      const newCount = count + 1;
      setCount(newCount);
      window.localStorage.setItem("number", JSON.stringify(newNumbers));
      window.localStorage.setItem("count", JSON.stringify(newCount));
    }

    const id = document.getElementById(index);
    id.classList.add("transition");
    id.classList.add("duration-500");
    id.classList.add("ease-in-out");
    id.classList.add("transform");

    if (NUMBERS.toString() === ORDER_WINNER.toString()) {
      alert("You Win!");
    }
  };

  const resetGame = () => {
    setNumber(NUMBERS);
    setCount(0);
  };

  return (
    <div className="min-h-screen bg-orange-200 text-white flex flex-col justify-center items-center pt-2">
      <h1 className="flex justify-center text-4xl py-2 text-center font-bold bg-orange-600 rounded-lg p-6">Huỳnh Vĩnh Tiến <br/>15 - Puzzle Game</h1>
      <button
        className="bg-fuchsia-600 border p-3 my-2 text-lg rounded-lg font-bold"
        onClick={() => resetGame()}
      >
        RESET GAME
      </button>
      <div className="puzzle mt-2">
        {number.map((cell, index) => (
          <div
            key={index}
            id={index}
            className="tile"
            onClick={() => moveTile(index)}
          >
            {cell}
          </div>
        ))}
      </div>
      <div className="flex flex-col text-xl items-center pt-6">
        <p className="font-bold bg-cyan-400 p-4 rounded-lg ">Số Lần Bạn Đã Đi: {count}</p>
      </div>
    </div>
  );
}

export default App;
