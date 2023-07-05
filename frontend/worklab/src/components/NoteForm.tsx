import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface NoteFormProps {
  page: boolean;
  handlePage: React.MouseEventHandler<HTMLButtonElement>;
}
export default function NoteForm({
  page,
  handlePage,
}: NoteFormProps): JSX.Element {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [fill, setFill] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title && description) {
      try {
        await axios.put(`work-lab-backend.vercel.app/api/projects/${id}/notes`, {
          title,
          description,
        });
        console.log("wow");
        setTitle("");
        setDescription("");
        handlePage;
      } catch (error) {
        console.error("Error updating total times:", error);
      }
    } else {
      setFill(true);
    }
  };
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <h3 className="text-emerald-600 font-bold text-2xl text-center">
        Add a New Note
      </h3>
      <label className="text-emerald-500 font-bold text-xl" htmlFor="">
        Note Title:
      </label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={`focus:outline-none border  ${
          fill ? (title ? "border-emerald-600" : "border-rose-600") : ""
        } p-2`}
      />

      <label className="text-emerald-500 font-bold text-xl" htmlFor="">
        Description:
      </label>
      <textarea
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className={`border   rounded-lg h-48 focus:outline-none ${
          fill
            ? description
              ? "border-emerald-600"
              : "border-rose-600 border-2"
            : ""
        } `}
      ></textarea>
      <div className="flex flex-row">
        <button className=" font-bold border-2 self-center w-full border-emerald-500 p-4 rounded-lg hover:bg-emerald-500  hover:text-emerald-900 duration-300">
          Add Note
        </button>
        <button
          onClick={handlePage}
          className=" font-bold border-2 self-center w-full border-rose-500 p-4 rounded-lg hover:bg-rose-500  hover:text-rose-900 duration-300"
        >
          return to notes
        </button>
      </div>
      {fill ? (
        <h1 className="p-4  border-2 self-center bg-rose-300 border-rose-500 border-lg text-rose-500 text-2xl font-bold text-center">
          Please fill in all the fields
        </h1>
      ) : (
        ""
      )}
    </form>
  );
}
