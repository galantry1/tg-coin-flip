import React from "react";

export default function BottomNav({ activeTab, setActiveTab }) {
  return (
    <div className="bottom-nav">
      <button
        className={`nav-btn ${activeTab === "menu" ? "nav-active" : ""}`}
        onClick={() => setActiveTab("menu")}
      >
        Меню
      </button>
      <button
        className={`nav-btn ${activeTab === "profile" ? "nav-active" : ""}`}
        onClick={() => setActiveTab("profile")}
      >
        Профиль
      </button>
    </div>
  );
}
