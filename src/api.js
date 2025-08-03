const API_URL = import.meta.env.VITE_API_URL;

export async function fetchBalance(userId) {
  const res = await fetch(`${API_URL}/balance?user_id=${userId}`);
  if (!res.ok) throw new Error('Ошибка получения баланса');
  return res.json();
}

export async function updateBalance(userId, newBalance) {
  const res = await fetch(`${API_URL}/balance`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: userId, balance: newBalance }),
  });
  if (!res.ok) throw new Error('Ошибка обновления баланса');
  return res.json();
}
