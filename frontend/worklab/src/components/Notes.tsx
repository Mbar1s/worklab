import { useState, useEffect } from "react";
import {
  faTrash,
  faPenToSquare,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NoteForm from "./NoteForm";
import NoteEdit from "./NoteEdit";
import axios from "axios";

interface Details {
  _id: string;
  title: string;
  description: string;
  days: number;
}

interface Notes {
  notes: Details[];
}

interface NotesProps {
  details: Details;
}

export default function Notes({ details }: NotesProps): JSX.Element {
  const [page, setPage] = useState(true);
  const [edit, setEdit] = useState(true);
  const [noteDetails, setNoteDetails] = useState<Notes>({ notes: [details] });
  const [singleNote, setSingleNote] = useState<Details>({
    title: "",
    _id: "",
    description: "",
    days: 0,
  });

  const handlePage = () => {
    if (edit) {
      setEdit((prevEdit) => !prevEdit);
    }
    setPage((prevPage) => !prevPage);
    console.log(edit);
  };

  const handleDelete = async (noteId: string) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/projects/${details._id}/notes/${noteId}`
      );
      console.log(response);
      setNoteDetails(response.data);
      // Handle the response or update the UI accordingly
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (noteId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/projects/${details._id}/notes/${noteId}`
      );
      console.log(response);
      setSingleNote(response.data);
      setEdit((prevEdit) => !prevEdit);
      // Handle the response or update the UI accordingly
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditPage = () => {
    setEdit((prevEdit) => !prevEdit);
  };
  return (
    <div className=" relative border-t border-t-emerald-600 mt-10">
      <h1 className="text-3xl font-extrabold text-emerald-700 text-center mt-2">
        Notes
      </h1>
      <button
        onClick={handlePage}
        className="absolute font-bold border p-2 w-28 top-2 right-3 border-teal-500 rounded-lg hover:bg-teal-500  hover:text-teal-900 duration-300"
      >
        <FontAwesomeIcon icon={faPlus} />
      </button>
      {page ? (
        edit ? (
          <div className="grid grid-row-4 mt-2 gap-10">
            {noteDetails.notes.map((note) => (
              <div
                className=" relative flex flex-col gap-2 mt-2 border-t border-emerald-600"
                key={note._id}
              >
                <h2 className=" text-lg font-semibold text-emerald-600 ml-2 mt-2">
                  {note.title}
                </h2>
                <p className="ml-2">{note.description}</p>
                <div className=" absolute right-2 grid grid-cols-2 mt-2">
                  <button
                    onClick={() => handleEdit(note._id)}
                    className=" font-semibold  border self-center p-1 px-5  border-amber-500   rounded-lg hover:bg-amber-500  hover:text-amber-900 duration-300"
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                  <button
                    onClick={() => handleDelete(note._id)}
                    className=" font-semibold  border self-center p-1 px-5  border-rose-500  rounded-lg hover:bg-rose-500  hover:text-rose-900 duration-300"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <NoteEdit
            noteTitle={singleNote.title}
            noteDescription={singleNote.description}
            noteId={singleNote._id}
            page={page}
            handlePage={handlePage}
            handleEdit={handleEditPage}
          />
        )
      ) : (
        <NoteForm page={page} handlePage={handlePage} />
      )}
    </div>
  );
}
