import React, { useState, useEffect } from "react";

const bets = [5, 10, 25, 50, 100, 500];
const choices = ["Орел", "Решка", "Ребро"];

function getRandomChoice() {
  return choices[Math.floor(Math.random() * choices.length)];
}

function getResult(user, opponent) {
  if (user === opponent) return "Ничья!";
  if (
    (user === "Орел" && opponent === "Решка") ||
    (user === "Решка" && opponent === "Ребро") ||
    (user === "Ребро" && opponent === "Орел")
  ) {
    return "Ты выиграл!";
  }
  return "Ты проиграл!";
}

export default function GameScreen({ onBack, balance, setBalance }) {
  const [step, setStep] = useState(0);
  const [selectedBet, setSelectedBet] = useState(null);
  const [timer, setTimer] = useState(10);
  const [userChoice, setUserChoice] = useState(null);
  const [opponentChoice, setOpponentChoice] = useState(null);
  const [result, setResult] = useState("");
  const [betApplied, setBetApplied] = useState(false);

  useEffect(() => {
    if (step === 1 && selectedBet && !betApplied) {
      setBalance(balance - selectedBet);
      setBetApplied(true);
    }
    // eslint-disable-next-line
  }, [step, selectedBet, betApplied]);

  useEffect(() => {
    if (step === 1 && timer > 0 && !userChoice) {
      const t = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(t);
    }
    if (step === 1 && timer === 0 && !userChoice) {
      setUserChoice("—");
      setOpponentChoice(getRandomChoice());
      setResult("Время вышло! Ты проиграл 😬");
      setStep(2);
    }
  }, [timer, step, userChoice]);

  useEffect(() => {
    if (userChoice && step === 1) {
      const opp = getRandomChoice();
      setOpponentChoice(opp);
      setTimeout(() => {
        const res = getResult(userChoice, opp);
        setResult(res);

        if (res.includes("выиграл")) setBalance(balance + selectedBet * 2);
        if (res.includes("Ничья")) setBalance(balance + selectedBet);

        setStep(2);
      }, 800);
    }
    // eslint-disable-next-line
  }, [userChoice, step, selectedBet, setBalance]);

  function resetGame() {
    setStep(0);
    setSelectedBet(null);
    setTimer(10);
    setUserChoice(null);
    setOpponentChoice(null);
    setResult("");
    setBetApplied(false);
  }

  if (!selectedBet) {
    return (
      <div className="game-screen centered-screen">
        <div className="game-title big-title">Выбери ставку</div>
        <div className="bets-grid">
          {bets.map((bet) => (
            <button
              key={bet}
              className="bet-btn big-bet-btn"
              onClick={() => {
                if (balance >= bet) {
                  setSelectedBet(bet);
                  setStep(1);
                } else {
                  alert("Недостаточно монет для ставки");
                }
              }}
            >
              {bet} 🪙
            </button>
          ))}
        </div>
        <button className="back-btn" onClick={() => { resetGame(); onBack(); }}>
          Назад
        </button>
      </div>
    );
  }

  if (step === 1) {
    return (
      <div className="game-screen centered-screen">
        <div className="game-title">Твой выбор (осталось {timer} сек):</div>
        <div className="choices-list">
          {choices.map((choice) => (
            <button
              key={choice}
              className="choice-btn"
              onClick={() => setUserChoice(choice)}
              disabled={!!userChoice}
            >
              {choice}
            </button>
          ))}
        </div>
        <button className="back-btn" onClick={() => { resetGame(); onBack(); }}>
          Назад
        </button>
      </div>
    );
  }

  if (step === 2) {
    let resultClass = "result-neutral";
    if (result.includes("выиграл")) resultClass = "result-win";
    if (result.includes("проиграл")) resultClass = "result-lose";

    return (
      <div className="game-screen centered-screen">
        <div className={`result-banner ${resultClass}`}>
          {result}
        </div>
        {userChoice !== "—" && (
          <div className="result-details">
            <div>
              Ты выбрал: <b>{userChoice}</b>
            </div>
            <div>
              Соперник: <b>{opponentChoice}</b>
            </div>
          </div>
        )}
        <button className="back-btn" onClick={() => { resetGame(); onBack(); }}>
          Назад в меню
        </button>
      </div>
    );
  }

  return null;
}
