import { useEffect, useState } from "react";
import MenuScreen from "./MenuScreen";
import ProfileScreen from "./ProfileScreen";
import GameScreen from "./GameScreen";
import { fetchBalance, updateBalance } from "./api";

export default function App() {
  // Получаем данные Telegram
  const tg = window.Telegram?.WebApp;
  const userId = tg?.initDataUnsafe?.user?.id?.toString() || "test_user";
  const username = tg?.initDataUnsafe?.user?.username || "testuser";
  const name = tg?.initDataUnsafe?.user?.first_name
    ? `${tg.initDataUnsafe.user.first_name} ${tg.initDataUnsafe.user.last_name || ""}`.trim()
    : "Тестовый Пользователь";
  const photo = tg?.initDataUnsafe?.user?.photo_url || "https://i.ibb.co/4Kp7rG6/user-placeholder.png";

  const [screen, setScreen] = useState("menu");
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);

  // Загрузка баланса при входе
  useEffect(() => {
    fetchBalance(userId)
      .then((data) => setBalance(data.balance))
      .catch(() => setBalance(1000))
      .finally(() => setLoading(false));
    // eslint-disable-next-line
  }, [userId]);

  // Обновление баланса на сервере
  const updateBalanceOnServer = (newBalance) => {
    setBalance(newBalance);
    updateBalance(userId, newBalance).catch(() => {});
  };

  if (loading) return <div style={{ padding: 24 }}>Загрузка...</div>;

  return (
    <div className="app-root">
      {screen === "menu" && (
        <MenuScreen
          balance={balance}
          onPlay={() => setScreen("game")}
          onProfile={() => setScreen("profile")}
        />
      )}
      {screen === "profile" && (
        <ProfileScreen
          balance={balance}
          name={name}
          username={username}
          photo={photo}
          onBack={() => setScreen("menu")}
        />
      )}
      {screen === "game" && (
        <GameScreen
          balance={balance}
          setBalance={updateBalanceOnServer}
          onBack={() => setScreen("menu")}
        />
      )}
      <div className="bottom-nav">
        <button
          className={`nav-btn${screen === "menu" ? " nav-active" : ""}`}
          onClick={() => setScreen("menu")}
        >
          Меню
        </button>
        <button
          className={`nav-btn${screen === "profile" ? " nav-active" : ""}`}
          onClick={() => setScreen("profile")}
        >
          Профиль
        </button>
      </div>
    </div>
  );
}
