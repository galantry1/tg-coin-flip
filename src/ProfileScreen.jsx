import React from "react";

export default function ProfileScreen({ user, balance, onMenu }) {
  if (!user) return <div>Загрузка...</div>;

  return (
    <div>
      <div className="profile-header">
        <img
          className="profile-avatar"
          src={user.photo_url}
          alt={user.first_name}
        />
        <div>
          <div className="profile-username">
            {user.first_name} {user.last_name}
          </div>
          <div className="profile-username">@{user.username}</div>
          <div className="profile-balance">{balance} 🪙</div>
        </div>
      </div>
      <div className="profile-actions">
        <button className="main-btn" disabled>Пополнение</button>
        <button className="secondary-btn" disabled>Обмен</button>
      </div>
      <button className="back-btn" onClick={onMenu}>
        Назад в меню
      </button>
    </div>
  );
}
