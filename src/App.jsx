import React, { useState, useEffect } from "react";
import MenuScreen from "./MenuScreen";
import ProfileScreen from "./ProfileScreen";
import GameScreen from "./GameScreen";
import BottomNav from "./BottomNav";

function usePersistentState(key, initialValue) {
  const [state, setState] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {}
  }, [key, state]);

  return [state, setState];
}

export default function App() {
  const [screen, setScreen] = useState("menu"); // "menu" | "profile" | "game"
  const [balance, setBalance] = usePersistentState("coin-game-balance", 1000);

  // Навигация
  const goMenu = () => setScreen("menu");
  const goProfile = () => setScreen("profile");
  const goGame = () => setScreen("game");

  return (
    <div className="app-root">
      <div className="main-content">
        {screen === "menu" && (
          <MenuScreen
            onPlay={goGame}
            balance={balance}
          />
        )}
        {screen === "profile" && (
          <ProfileScreen
            balance={balance}
            onBack={goMenu}
          />
        )}
        {screen === "game" && (
          <GameScreen
            balance={balance}
            setBalance={setBalance}
            onBack={goMenu}
          />
        )}
      </div>
      <BottomNav
        screen={screen}
        goMenu={goMenu}
        goProfile={goProfile}
      />
    </div>
  );
}
