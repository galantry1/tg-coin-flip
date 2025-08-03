import React, { useEffect, useState } from "react";
import MenuScreen from "./MenuScreen";
import ProfileScreen from "./ProfileScreen";
import GameScreen from "./GameScreen";
import { fetchBalance, updateBalance } from "./api";

function getTelegramUser() {
  if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initDataUnsafe.user) {
    return window.Telegram.WebApp.initDataUnsafe.user;
  }
  // Заглушка для разработки в браузере
  return {
    id: 123456,
    first_name: "Тестовый",
    last_name: "Пользователь",
    username: "testuser",
    photo_url: "https://i.ibb.co/B4WtTRb/avatar.jpg",
  };
}

export default function App() {
  const [screen, setScreen] = useState("menu");
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const tgUser = getTelegramUser();
    setUser(tgUser);

    // Баланс по user.id или user.id || 'user_1'
    fetchBalance(tgUser.id || "user_1").then((data) => {
      setBalance(data.balance);
    });
  }, []);

  // При обновлении баланса
  const handleBalanceChange = (newBalance) => {
    setBalance(newBalance);
    if (user?.id) {
      updateBalance(user.id, newBalance);
    }
  };

  return (
    <div className="app-root">
      {screen === "menu" && (
        <MenuScreen
          onPlay={() => setScreen("game")}
          onProfile={() => setScreen("profile")}
          balance={balance}
        />
      )}
      {screen === "profile" && (
        <ProfileScreen
          user={user}
          balance={balance}
          onMenu={() => setScreen("menu")}
        />
      )}
      {screen === "game" && (
        <GameScreen
          onBack={() => setScreen("menu")}
          balance={balance}
          setBalance={handleBalanceChange}
        />
      )}
      {/* Нижняя навигация */}
      <div className="bottom-nav">
        <button className="nav-btn" onClick={() => setScreen("menu")}>
          Меню
        </button>
        <button className="nav-btn" onClick={() => setScreen("profile")}>
          Профиль
        </button>
      </div>
    </div>
  );
}
