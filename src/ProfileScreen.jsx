import React from "react";

export default function ProfileScreen({ balance, setActiveTab, user }) {
  return (
    <div>
      <div className="profile-header">
        <img
          className="profile-avatar"
          src={user.photo_url || "https://t.me/i/userpic/320/testuser.jpg"}
          alt="avatar"
        />
        <div>
          <div className="profile-username">
            {user.first_name} {user.last_name}
            {user.username && (
              <span style={{ color: "#9ca3af", fontWeight: 400, marginLeft: 7 }}>
                @{user.username}
              </span>
            )}
          </div>
          <div className="profile-balance">{balance} 🪙</div>
        </div>
      </div>
      <div className="profile-actions">
        <button className="main-btn" disabled>
          Пополнение
        </button>
        <button className="secondary-btn" disabled>
          Обмен
        </button>
      </div>
    </div>
  );
}
