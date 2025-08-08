import React from "react";

export default function MenuScreen({ balance, onPlay, onProfile }) {
  return (
    <div className="menu-screen">
      <div className="menu-header">
        <span className="menu-title">Главное меню</span>
        <span className="menu-balance">{balance} 🪙</span>
      </div>

      <div className="menu-actions">
        <button className="main-btn" onClick={onPlay}>Играть</button>
        <button className="secondary-btn" disabled>Играть с другом</button>
      </div>

      <div className="menu-tip">
        <span>&lt;ень, ТЫ САМАЯ КРАСИВАЯ&gt;</span>
      </div>

      <div style={{ textAlign: "center", color: "#94a3b8" }}>
        В профиле: ник и аватар из Телеги
      </div>
    </div>
  );
}
