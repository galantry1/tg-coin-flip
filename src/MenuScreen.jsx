import React from "react";

export default function MenuScreen({ onPlay, onProfile, balance }) {
  return (
    <div>
      <div className="menu-header">
        <span className="menu-title">Главное меню</span>
        <span className="menu-balance">{balance} 🪙</span>
      </div>
      <div className="menu-actions">
        <button className="main-btn" onClick={onPlay}>Играть</button>
        <button className="secondary-btn" disabled>
          Играть с другом
        </button>
      </div>
      <div className="menu-tip">
        <span>В будущем тут будет ещё больше фишек 😉</span>
      </div>
    </div>
  );
}
