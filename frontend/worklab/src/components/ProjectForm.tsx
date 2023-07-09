import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

export default function ProjectForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [fill, setFill] = useState(false);
  const { user } = useAuthContext();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      setError("you must be logged in");
      return;
    }
    const project = { title, description };

    const response = await fetch(`${import.meta.env.VITE_API_URL}/projects`, {
      method: "POST",
      body: JSON.stringify(project),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      setFill(true);
    }
    if (response.ok) {
      setDescription("");
      setTitle("");
      setError(null);
      console.log("new project added");
    }
  };
  return (
    <div className=" flex w-full h-screen bg-slate-900 items-center justify-center">
      <form
        className="flex flex-col gap-4 w-10/12 p-10  border-2 border-emerald-600 rounded-lg "
        onSubmit={handleSubmit}
      >
        <h3 className="text-emerald-600 font-bold text-2xl text-center">
          Add a New Project
        </h3>
        <label className="text-emerald-500 font-bold text-xl" htmlFor="">
          Project Title:
        </label>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className={`focus:outline-none border rounded-lg text-white text-2xl bg-slate-600 font-bold ${
            fill ? (title ? "border-emerald-600" : "border-rose-600") : "border-slate-600 "
          } p-2`}
        />

        <label className="text-emerald-500 font-bold text-xl" htmlFor="">
          Description:
        </label>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className={`border  bg-slate-600 text-white text-lg  rounded-lg h-56 focus:outline-none ${
            fill ? (description ? "border-emerald-600" : "border-rose-600") : "border-slate-600 "
          } `}
        ></textarea>

        <button
          className={` text-white font-bold border-2 self-center w-60 border-emerald-500 p-4 rounded-lg hover:bg-emerald-500  hover:text-emerald-900 duration-300`}
        >
          Add Project
        </button>
        {fill ? (
          <h1 className="p-4  border-2 self-center bg-rose-200 border-rose-400 border-lg text-rose-400 text-2xl font-bold text-center">
            Please fill in all the fields
          </h1>
        ) : (
          ""
        )}
      </form>
    </div>
  );
}
