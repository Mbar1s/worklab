import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface NoteEditProps {
  handleEdit: React.MouseEventHandler<HTMLButtonElement>;
  noteTitle: string;
  noteDescription: string;
  noteId: string;
  page: boolean;
  handlePage: () => void;
}
export default function NoteEdit({
  noteTitle,
  noteDescription,
  noteId,
  handleEdit,
}: NoteEditProps): JSX.Element {
  const { id } = useParams();
  const [title, setTitle] = useState(noteTitle);
  const [description, setDescription] = useState(noteDescription);
  const [error, setError] = useState("");
  const [fill, setFill] = useState(false);

  console.log(title, fill);

  //EDIT
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (title === "" || description === "") {
      setFill(true);
    } else {
      setFill(false);
      try {
        await axios.patch(
          `http://localhost:4000/api/projects/${id}/notes/${noteId}`,
          {
            title,
            description,
          }
        );
        console.log("wow");
      } catch (error) {
        console.error("Error updating total times:", error);
      }
    }
  };

  return (
    <form className="border flex flex-col gap-4" onSubmit={handleSubmit}>
      <label className="text-emerald-500 font-bold text-xl" htmlFor="">
        Note Title:
      </label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        defaultValue={noteTitle}
        className={`focus:outline-none border border-slate-400 ${
          fill ? (title ? "" : "border-rose-600") : ""
        } p-2 duration-150`}
      />

      <label className="text-emerald-500 font-bold text-xl" htmlFor="">
        Description:
      </label>
      <textarea
        onChange={(e) => setDescription(e.target.value)}
        defaultValue={noteDescription}
        className={`border  border-slate-400 rounded-lg h-48 focus:outline-none ${
          fill ? (description ? "" : "border-rose-600 border-2") : ""
        } duration-150`}
      ></textarea>
      <div className="flex flex-row">
        <button className=" font-bold border-2 self-center w-full border-amber-500 p-4 rounded-lg hover:bg-amber-500  hover:text-amber-900 duration-300">
          Edit Note
        </button>
        <button
          onClick={handleEdit}
          className=" font-bold border-2 self-center w-full border-rose-500 p-4 rounded-lg hover:bg-rose-500  hover:text-rose-900 duration-300"
        >
          return to notes
        </button>
      </div>
      {fill ? (
        <h1 className="p-4  border-2 self-center bg-rose-100 border-rose-500 border-lg text-rose-500 text-2xl font-bold text-center">
          Please fill in all the fields
        </h1>
      ) : (
        ""
      )}
    </form>
  );
}
