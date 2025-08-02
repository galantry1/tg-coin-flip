
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const choices = ["Орел", "Решка", "Ребро"];
const outcomes = {
  "Орел:Решка": "Орел выигрывает",
  "Орел:Ребро": "Ребро выигрывает",
  "Решка:Орел": "Решка выигрывает",
  "Решка:Ребро": "Решка выигрывает",
  "Ребро:Орел": "Орел выигрывает",
  "Ребро:Решка": "Ребро выигрывает",
};

export default function CoinGame() {
  const [userChoice, setUserChoice] = useState(null);
  const [opponentChoice, setOpponentChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [spinning, setSpinning] = useState(false);

  useEffect(() => {
    if (userChoice && opponentChoice) {
      const key = `${userChoice}:${opponentChoice}`;
      const reverseKey = `${opponentChoice}:${userChoice}`;
      if (userChoice === opponentChoice) {
        setResult("Ничья! Перезапуск...");
      } else {
        setResult(outcomes[key] || outcomes[reverseKey]);
      }
    }
  }, [userChoice, opponentChoice]);

  const handleChoice = (choice) => {
    setUserChoice(choice);
    setOpponentChoice(choices[Math.floor(Math.random() * 3)]);
    setSpinning(true);
    setTimeout(() => setSpinning(false), 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6 p-4 bg-gray-100">
      <motion.div
        animate={{ rotate: spinning ? 360 * 3 : 0 }}
        transition={{ duration: 1.5 }}
        className="w-32 h-32 rounded-full bg-yellow-400 shadow-lg flex items-center justify-center text-xl font-bold"
      >
        🪙
      </motion.div>

      <div className="flex gap-4">
        {choices.map((choice) => (
          <button key={choice} onClick={() => handleChoice(choice)}>{choice}</button>
        ))}
      </div>

      {userChoice && opponentChoice && (
        <div className="text-center mt-6">
          <p>Ты выбрал: <strong>{userChoice}</strong></p>
          <p>Соперник выбрал: <strong>{opponentChoice}</strong></p>
          <p className="mt-2 text-lg font-semibold">{result}</p>
        </div>
      )}
    </div>
  );
}
