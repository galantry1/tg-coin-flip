import React, { useEffect, useMemo, useState } from "react";
import MenuScreen from "./MenuScreen";
import ProfileScreen from "./ProfileScreen";
import GameScreen from "./GameScreen";
import { fetchBalance, updateBalance } from "./api";

// Безопасно достаём юзера из Telegram WebApp (в браузере будет null)
function getTelegramUserSafe() {
  try {
    const tg = window?.Telegram?.WebApp;
    return tg?.initDataUnsafe?.user || null;
  } catch {
    return null;
  }
}

export default function App() {
  // Берём userId из Telegram, а если не в телеге — фиксируем локальный id в localStorage,
  // чтобы он НЕ менялся при перезагрузке (и не сбрасывал баланс).
  const user = getTelegramUserSafe();

  const userId = useMemo(() => {
    if (user?.id) return String(user.id);
    let id = localStorage.getItem("cg_user_id");
    if (!id) {
      id = "local_" + Math.floor(Math.random() * 1e9);
      localStorage.setItem("cg_user_id", id);
    }
    return id;
  }, [user?.id]);

  const profile = useMemo(() => ({
    name:
      (user?.first_name || "") + (user?.last_name ? " " + user.last_name : "") ||
      "Тестовый Пользователь",
    username: user?.username || "testuser",
    photo: user?.photo_url || "https://i.ibb.co/4Kp7rG6/user-placeholder.png",
  }), [user]);

  const [screen, setScreen] = useState("menu");
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);

  // Загружаем баланс с сервера при монтировании или смене userId
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await fetchBalance(userId);
        if (mounted) setBalance(data.balance);
      } catch {
        if (mounted) setBalance(1000); // дефолт, если сервер недоступен
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [userId]);

  // Обновление баланса и синхронизация с сервером
  const applyBalance = async (newBalance) => {
    setBalance(newBalance); // мгновенно в UI
    try {
      await updateBalance(userId, newBalance); // догоняем сервер
    } catch {
      // можно показать тост/уведомление, если нужно
    }
  };

  if (loading || balance === null) {
    return <div className="centered-screen">Загрузка...</div>;
  }

  return (
    <div className="app-root">
      <div className="main-content">
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
            name={profile.name}
            username={profile.username}
            photo={profile.photo}
            onBack={() => setScreen("menu")}
          />
        )}

        {screen === "game" && (
          <GameScreen
            balance={balance}
            setBalance={applyBalance}
            onBack={() => setScreen("menu")}
          />
        )}
      </div>

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
