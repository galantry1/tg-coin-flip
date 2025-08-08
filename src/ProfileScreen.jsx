import React from "react";

export default function ProfileScreen({ balance, name, username, photo, onBack }) {
  return (
    <div className="profile-screen">
      <div className="profile-header">
        <img src={photo} alt="avatar" className="profile-avatar" />
        <div>
          <div className="profile-username">{name}</div>
          <div style={{ color: "#94a3b8", fontWeight: 500 }}>@{username}</div>
        </div>
      </div>

      <div className="profile-balance" style={{ marginLeft: 16 }}>{balance} 🪙</div>

      <div className="profile-actions">
        <button className="main-btn" disabled>Пополнение</button>
        <button className="secondary-btn" disabled>Обмен</button>
      </div>

      <button className="back-btn" onClick={onBack} style={{ marginTop: 24 }}>
        Назад в меню
      </button>
    </div>
  );
}
