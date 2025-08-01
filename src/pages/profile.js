import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as userApi from "../api/user";

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [show, setShow] = useState(false);

  // Пароль
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return navigate("/login");

      const res = await userApi.getOne(userId);
      if (res.success) {
        setUser(res.data);
        setName(res.data.name);
        setEmail(res.data.email);
      }
    };

    loadProfile();
  }, [navigate]);

  const handleClose = () => {
    setShow(false);
    setShowPasswordFields(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleUpdate = async () => {
    const res = await userApi.update({
      id: user._id,
      name,
      email,
    });

    if (!res.success) return alert("Ошибка при обновлении");

    // Обновить пароль, если пользователь ввёл поля
    if (showPasswordFields) {
      if (!currentPassword || !newPassword || !confirmPassword)
        return alert("Пожалуйста, заполните все поля пароля");

      if (newPassword !== confirmPassword)
        return alert("Новый пароль и подтверждение не совпадают");

      const passRes = await userApi.changePassword({
        id: user._id,
        currentPassword,
        newPassword,
      });

      if (!passRes.success) return alert("Ошибка смены пароля: " + passRes.message);
    }

    alert("Профиль обновлён!");
    setUser(res.data);
    handleClose();
  };

  if (!user)
    return <div className="text-center mt-10 text-gray-500">Загрузка профиля...</div>;

  return (
    <>
      <div className="max-w-xl mx-auto mt-12 p-6 bg-white rounded-2xl shadow-md space-y-6">
        <h1 className="text-2xl font-semibold text-gray-800">Профиль</h1>

        <div className="space-y-2 text-gray-700">
          <p><span className="font-medium">ID:</span> {user._id}</p>
          <p><span className="font-medium">Имя:</span> {user.name}</p>
          <p><span className="font-medium">Email:</span> {user.email}</p>
          <p><span className="font-medium">Роль:</span> {user.role}</p>
        </div>

        <button
          onClick={() => setShow(true)}
          className="px-5 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
        >
          Изменить
        </button>
        <button
          onClick={() => navigate(-1)}
          className="px-5 py-2 bg-gray-500 text-white rounded-lg mx-2 hover:bg-gray-600 transition"
        >
          Назад
        </button>
      </div>

      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg w-full max-w-lg p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Обновить Профиль</h2>
              <button
                onClick={handleClose}
                className="text-gray-500 hover:text-black text-xl"
              >
                &times;
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Имя</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              {/* Кнопка раскрытия смены пароля */}
              <div>
                <button
                  type="button"
                  onClick={() => setShowPasswordFields(!showPasswordFields)}
                  className="text-sm text-blue-600 underline"
                >
                  {showPasswordFields ? "Скрыть смену пароля" : "Изменить пароль"}
                </button>
              </div>

              {/* Поля для пароля */}
              {showPasswordFields && (
                <div className="space-y-4">
                  <div>
                    <label className="block font-medium mb-1">Текущий пароль</label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="block font-medium mb-1">Новый пароль</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="block font-medium mb-1">Подтвердите новый пароль</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>
                </div>
              )}
            </form>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={handleClose}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Отмена
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Сохранить
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
