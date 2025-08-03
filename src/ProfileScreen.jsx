import React from "react";

export default function ProfileScreen({ user, balance, onBack }) {
  return (
    <div className="profile-screen centered-screen">
      <div className="profile-header">
        <img
          src={user?.photo_url || "https://i.ibb.co/ySgJXrL/avatar-placeholder.png"}
          alt="avatar"
          className="profile-avatar"
        />
        <div>
          <div className="profile-username">
            {user?.first_name} {user?.last_name}
          </div>
          <div style={{ color: "#8a8a8a" }}>@{user?.username}</div>
        </div>
      </div>
      <div className="profile-balance">{balance} 🪙</div>
      <button className="back-btn" onClick={onBack}>Назад в меню</button>
    </div>
  );
}
