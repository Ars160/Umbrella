import { useEffect, useState } from "react";
import * as taskApi from "../api/task";
import * as userApi from "../api/user";
import { useParams } from "react-router-dom";

const TaskItem = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);

  const [userName, setUserName] = useState()

  useEffect(() => {
    const fetchTask = async () => {
      const res = await taskApi.getOne(taskId);
      if (res.success) {
        setTask(res.data);
      }
    };
    fetchTask();
  }, [taskId]);
  
  useEffect(() => {
    const fetchUser = async () => {
      if (task?.assignedTo) {
        const res2 = await userApi.getOne(task.assignedTo);
        if (res2.success) {
          setUserName(res2.data.name);
        }
      }
    };
    fetchUser();
  }, [task]);
  

  if (!task) {
    return <div className="text-center mt-10 text-gray-600">Загрузка задачи...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">{task.title}</h1>

      <div className="mb-4">
        <p className="text-gray-600 mb-1 font-medium">Статус:</p>
        <span className="inline-block bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded">
          {task.status || "Не указан"}
        </span>
      </div>

      <div className="mb-4">
        <p className="text-gray-600 mb-1 font-medium">Описание:</p>
        <p className="text-gray-700 bg-gray-50 p-3 rounded border">{task.description || "Нет описания"}</p>
      </div>

      <div className="mb-4">
        <p className="text-gray-600 mb-1 font-medium">Исполнитель(и):</p>
        <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded">
          {/* {Array.isArray(task.assignedTo) ? task.assignedTo.join(", ") : task.assignedTo || "Не назначен"} */}
          {userName}
        </span>
      </div>

      {task.deadline && (
        <div className="mb-4">
          <p className="text-gray-600 mb-1 font-medium">Дедлайн:</p>
          <span className="inline-block bg-yellow-100 text-yellow-800 text-sm font-semibold px-3 py-1 rounded">
            {new Date(task.deadline).toLocaleDateString("ru-RU")}
          </span>
        </div>
      )}

      <div className="mt-6">
        <button
          onClick={() => window.history.back()}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded text-sm"
        >
          ← Назад
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
