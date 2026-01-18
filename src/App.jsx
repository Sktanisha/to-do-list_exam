import React, { useEffect, useState } from "react";
import { getDatabase, ref, set, push, onValue, remove, update} from "firebase/database";

const App = () => {
  let [task, setTask] = useState("");
  let [taskList, setTaskList] = useState([])
  let [editModel, setEditModel] = useState(false)
  let [editTask, setEditTask] = useState("")
  let[id,setId]= useState("null")


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
      let array = []
      const data = snapshot.val();
      snapshot.forEach((item)=>{
        array.push({...item.val(),id:item.key})
      })
      setTaskList(array)
    });
  }, []);

  let handleTaskDelete= (id) =>{
    remove(ref(db, "todolist/" + id))
  }

  let handleEditModel = (id)=>{
    setId(id)
    setEditModel(!editModel)
  }

  let handleUpdate = () =>{
    update(ref(db, "todolist/ " + id),{
      item: editTask
    }).then(()=>{
      setEditModel(false)
    })
  }

  return (
    <div>
      <>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://unpkg.com/tailwindcss@2.2.4/dist/tailwind.min.css"
          rel="stylesheet"
        />
        <div className="w-full h-screen bg-gray-100 pt-8">
          <div className="bg-white p-3 max-w-md mx-auto">
            <div className="text-center">
              <h1 className="text-3xl font-bold">ToDo App</h1>
              <div className="mt-4 flex">
                <input
                  onChange={handleChange}
                  className="w-80 border-b-2 border-gray-500 text-black"
                  type="text"
                  placeholder="Enter your task here"
                />
                <button
                  onClick={handleSubmit}
                  className="ml-2 border-2 border-green-500 p-2 text-green-500 hover:text-white hover:bg-green-500 rounded-lg flex"
                >
                  <svg
                    className="h-6 w-6"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {" "}
                    <path stroke="none" d="M0 0h24v24H0z" />{" "}
                    <circle cx={12} cy={12} r={9} />{" "}
                    <line x1={9} y1={12} x2={15} y2={12} />{" "}
                    <line x1={12} y1={9} x2={12} y2={15} />
                  </svg>
                  <span>Add</span>
                </button>
              </div>
            </div>

            <div className="mt-8">
              {taskList.map((litem)=>(
                  <div className="flex align-middle flex-row justify-between">
                    <div className="p-2">
                      <p className="text-lg text-black">{litem.item}</p>
                    </div>
                    <button onClick={()=> handleTaskDelete(litem.id)} className="flex text-red-500 border-2 border-red-500 p-2 rounded-lg">
                      <svg
                        className="h-6 w-6 text-red-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {" "}
                        <circle cx={12} cy={12} r={10} />{" "}
                        <line x1={15} y1={9} x2={9} y2={15} />{" "}
                        <line x1={9} y1={9} x2={15} y2={15} />
                      </svg>
                      <span>Remove</span>
                    </button>
                    <button onClick={()=> handleEditModel(litem.id)} className="flex text-red-500 border-2 border-red-500 p-2 rounded-lg">
                      <svg
                        className="h-6 w-6 text-red-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {" "}
                        <circle cx={12} cy={12} r={10} />{" "}
                        <line x1={15} y1={9} x2={9} y2={15} />{" "}
                        <line x1={9} y1={9} x2={15} y2={15} />
                      </svg>
                      <span>Edit</span>
                    </button>
                  </div>
              ))}
                  
                  <hr className="mt-2" />
            </div>
          </div>
        </div>
        {
          editModel && 
          <div className="w-full flex items-center justify-center h-screen bg-gray-500/85 absolute top-0 left-0">
            <button onClick={()=>setEditModel(false)} className="bg-red-500 text-white px-3" >X</button>
              <div className="flex mt-4 w-[500px] rounded-md bg-white p-10">
                
                <input onChange={(e)=>setEditTask(e.target.value)} className="w-80 border-b-2 border-gray-500 text-black" type="text"
                  placeholder="Update your task here"
                />
                <button onClick={handleUpdate} className="ml-2 border-2 border-green-500 p-2 text-green-500 hover:text-white hover:bg-green-500 rounded-lg flex"
                >
                  <svg
                    className="h-6 w-6"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {" "}
                    <path stroke="none" d="M0 0h24v24H0z" />{" "}
                    <circle cx={12} cy={12} r={9} />{" "}
                    <line x1={9} y1={12} x2={15} y2={12} />{" "}
                    <line x1={12} y1={9} x2={12} y2={15} />
                  </svg>
                  <span>Update</span>
                </button>
              </div>
        </div>
        }

        
      </>
    </div>

    
  );
};

export default App;
