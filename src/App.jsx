import React, { useState } from "react";
import MenuScreen from "./MenuScreen";
import ProfileScreen from "./ProfileScreen";
import BottomNav from "./BottomNav";
import GameScreen from "./GameScreen";

export default function App() {
  const [activeTab, setActiveTab] = useState("menu");
  const [gameActive, setGameActive] = useState(false);
  const [balance, setBalance] = useState(1000);

  return (
    <div className="app-root">
      <div className="main-content">
        {gameActive ? (
          <GameScreen
            onBack={() => setGameActive(false)}
            balance={balance}
            setBalance={setBalance}
          />
        ) : activeTab === "menu" ? (
          <MenuScreen
            onPlay={() => setGameActive(true)}
            balance={balance}
          />
        ) : (
          <ProfileScreen balance={balance} />
        )}
      </div>
      {!gameActive && <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />}
    </div>
  );
}
