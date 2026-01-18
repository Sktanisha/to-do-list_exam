import React, { useEffect, useState } from "react";
import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
  remove,
  update,
} from "firebase/database";

const App = () => {
  let [task, setTask] = useState("");
  let [taskList, setTaskList] = useState([]);
  let [editModel, setEditModel] = useState(false);
  let [editTask, setEditTask] = useState("");
  let [id, setId] = useState("null");

  const db = getDatabase();

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const handleSubmit = () => {
    set(push(ref(db, "todolist/")), {
      item: task,
    })
      .then(() => {
        console.log("Task Added");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const starCountRef = ref(db, "todolist/");
    onValue(starCountRef, (snapshot) => {
      let array = [];
      const data = snapshot.val();
      snapshot.forEach((item) => {
        array.push({ ...item.val(), id: item.key });
      });
      setTaskList(array);
    });
  }, []);

  let handleTaskDelete = (id) => {
    remove(ref(db, "todolist/" + id));
  };

  let handleEditModel = (id) => {
    setId(id);
    setEditModel(!editModel);
  };

  let handleUpdate = () => {
    update(ref(db, "todolist/" + id), {
      item: editTask,
    }).then(() => {
      setEditModel(false);
    });
  };

  return (
    
  <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 flex items-center justify-center p-4">
    <div className="w-full max-w-xl">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
          ToDo
          <span className="text-slate-500">•</span>
          Firebase
        </h1>
        <p className="text-slate-600 mt-2">
          Add tasks, edit them, and keep your list synced.
        </p>
      </div>

      {/* Main Card */}
      <div className="bg-white/90 backdrop-blur rounded-2xl shadow-xl border border-white/60 overflow-hidden">
        {/* Add bar */}
        <div className="p-5 sm:p-6 border-b border-slate-100">
          <div className="flex gap-2">
            <input
              value={task}
              onChange={handleChange}
              className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder-slate-400 outline-none focus:ring-2 focus:ring-slate-400"
              type="text"
              placeholder="What do you need to do?"
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
            <button
              onClick={handleSubmit}
              className="rounded-xl px-4 py-3 bg-slate-900 text-white font-semibold shadow hover:bg-slate-800 active:scale-[0.98] transition"
              title="Add task"
            >
              Add
            </button>
          </div>
        </div>

        {/* List */}
        <div className="p-5 sm:p-6">
          {taskList.length === 0 ? (
            <div className="text-center py-10">
              <div className="text-5xl">📝</div>
              <p className="mt-3 text-slate-700 font-semibold">No tasks yet</p>
              <p className="text-slate-500">Add one above to get started.</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {taskList.map((litem) => (
                <li
                  key={litem.id}
                  className="group flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm hover:shadow transition"
                >
                  <div className="min-w-0">
                    <p className="text-slate-900 font-semibold truncate">
                      {litem.item}
                    </p>
                    <p className="text-slate-500 text-sm">
                      Saved to Firebase Realtime DB
                    </p>
                  </div>

                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => handleEditModel(litem.id, litem.item)}
                      className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-700 font-semibold hover:bg-slate-100 transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleTaskDelete(litem.id)}
                      className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-red-700 font-semibold hover:bg-red-100 transition"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {editModel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* overlay */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setEditModel(false)}
          />

          {/* modal */}
          <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl border border-slate-200 p-5 sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">
                  Edit task
                </h2>
                <p className="text-slate-500 text-sm">
                  Update the task and save changes.
                </p>
              </div>

              <button
                onClick={() => setEditModel(false)}
                className="rounded-xl px-3 py-2 bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="mt-5 flex gap-2">
              <input
                value={editTask}
                onChange={(e) => setEditTask(e.target.value)}
                className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder-slate-400 outline-none focus:ring-2 focus:ring-slate-400"
                type="text"
                placeholder="Update your task"
                onKeyDown={(e) => e.key === "Enter" && handleUpdate()}
              />
              <button
                onClick={handleUpdate}
                className="rounded-xl px-4 py-3 bg-emerald-600 text-white font-semibold shadow hover:bg-emerald-700 active:scale-[0.98] transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <p className="text-center text-xs text-slate-500 mt-4">
        Tip: Press <span className="font-semibold">Enter</span> to add/save.
      </p>
    </div>
  </div>


  );
};

export default App;
