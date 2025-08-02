import React from "react";

export default function ProfileScreen({ balance }) {
  const username = "Ваш Ник";
  return (
    <div className="profile-screen">
      <div className="profile-header">
        <div className="profile-avatar"></div>
        <div>
          <div className="profile-username">{username}</div>
          <div className="profile-balance">{balance} 🪙</div>
        </div>
      </div>
      <div className="profile-actions">
        <button className="main-btn">Пополнение</button>
        <button className="main-btn">Обмен</button>
      </div>
    </div>
  );
}
