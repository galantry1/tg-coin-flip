import React, { useState, useEffect } from "react";
import MenuScreen from "./MenuScreen";
import ProfileScreen from "./ProfileScreen";
import GameScreen from "./GameScreen";
import BottomNav from "./BottomNav";
import { fetchBalance, updateBalance } from "./api";

function getTelegramUser() {
  if (
    window.Telegram &&
    window.Telegram.WebApp &&
    window.Telegram.WebApp.initDataUnsafe &&
    window.Telegram.WebApp.initDataUnsafe.user
  ) {
    return window.Telegram.WebApp.initDataUnsafe.user;
  }
  // для локалки
  return {
    id: "test_user",
    first_name: "Тестовый",
    last_name: "Пользователь",
    username: "testuser",
    photo_url: "https://t.me/i/userpic/320/testuser.jpg",
  };
}

export default function App() {
  const [activeTab, setActiveTab] = useState("menu");
  const [balance, setBalance] = useState(0);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Получаем данные пользователя из Telegram при запуске
  useEffect(() => {
    setUser(getTelegramUser());
  }, []);

  // Загружаем баланс с сервера при появлении user.id
  useEffect(() => {
    if (user?.id) {
      setLoading(true);
      fetchBalance(user.id)
        .then((data) => setBalance(data.balance))
        .catch(() => setBalance(1000))
        .finally(() => setLoading(false));
    }
  }, [user]);

  // Функция для обновления баланса
  const handleUpdateBalance = async (newBalance) => {
    setBalance(newBalance);
    try {
      await updateBalance(user.id, newBalance);
    } catch {}
  };

  if (!user?.id || loading) {
    return <div className="centered-screen">Загрузка...</div>;
  }

  return (
    <div className="app-root">
      <div className="main-content">
        {activeTab === "menu" && (
          <MenuScreen
            balance={balance}
            setActiveTab={setActiveTab}
            userId={user.id}
          />
        )}
        {activeTab === "profile" && (
          <ProfileScreen
            balance={balance}
            setActiveTab={setActiveTab}
            user={user}
          />
        )}
        {activeTab === "game" && (
          <GameScreen
            balance={balance}
            setBalance={handleUpdateBalance}
            onBack={() => setActiveTab("menu")}
            userId={user.id}
          />
        )}
      </div>
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
