import React, { useEffect, useState } from "react";
import MenuScreen from "./MenuScreen";
import ProfileScreen from "./ProfileScreen";
import GameScreen from "./GameScreen";
import { fetchBalance, updateBalance } from "./api";

function App() {
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(null);
  const [screen, setScreen] = useState("menu");

  // Получаем данные пользователя из Telegram Mini App
  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initDataUnsafe) {
      setUser(window.Telegram.WebApp.initDataUnsafe.user);
    }
  }, []);

  // Загружаем баланс, когда user готов
  useEffect(() => {
    if (user && user.id) {
      fetchBalance(user.id)
        .then(res => setBalance(res.balance))
        .catch(() => setBalance(1000)); // если ошибка, базовый баланс
    }
  }, [user]);

  // Функция для обновления баланса на сервере и локально
  const handleSetBalance = async (newBalance) => {
    setBalance(newBalance);
    if (user && user.id) {
      try {
        await updateBalance(user.id, newBalance);
      } catch (e) { /* обработка ошибок */ }
    }
  };

  if (!user || balance === null) return <div>Загрузка...</div>;

  return (
    <div className="app-root">
      {screen === "menu" && (
        <MenuScreen
          onPlay={() => setScreen("game")}
          balance={balance}
          onProfile={() => setScreen("profile")}
        />
      )}
      {screen === "profile" && (
        <ProfileScreen
          user={user}
          balance={balance}
          onBack={() => setScreen("menu")}
        />
      )}
      {screen === "game" && (
        <GameScreen
          onBack={() => setScreen("menu")}
          balance={balance}
          setBalance={handleSetBalance}
          userId={user.id}
        />
      )}
      {/* Навигация */}
      <div className="bottom-nav">
        <button className="nav-btn" onClick={() => setScreen("menu")}>Меню</button>
        <button className="nav-btn" onClick={() => setScreen("profile")}>Профиль</button>
      </div>
    </div>
  );
}

export default App;
