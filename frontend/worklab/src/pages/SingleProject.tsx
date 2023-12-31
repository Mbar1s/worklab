import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Pomodoro from "../components/Pomodoro";
import Notes from "../components/Notes";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuthContext } from "../hooks/useAuthContext";

interface Notes {
  title: string;
  description: string;
  _id: string;
}
interface Details {
  _id: string;
  title: string;
  description: string;
  days: number;
  notes: Notes[];
}

export default function SingleProject() {
  const { id } = useParams();
  const [details, setDetails] = useState<Details>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [days, setDays] = useState(0);
  const [error, setError] = useState(null);
  const [fill, setFill] = useState(false);
  const [edit, setEdit] = useState(false);
  const { user } = useAuthContext();

  //GET PROJECT DETAILS
  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/projects/` + id,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
          method: "GET",
        }
      );
      const json = await response.json();

      if (response.ok) {
        setDetails(json);
      }
    };
    fetchProjects();
  }, [id, user?.token]);

  //EDIT
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const project = { title, description, days };

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/projects/` + id,
      {
        method: "PATCH",
        body: JSON.stringify(project),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      console.log(error);
      setFill(true);
    }
    if (response.ok) {
      setError(null);
      console.log("Project updated");
    }
  };
  //handle edit
  const handleEdit = () => {
    if (details) {
      setTitle(details.title);
      setDays(details.days);
      setDescription(details.description);
    }
    setEdit((prevEdit) => !prevEdit);
  };

  return (
    <div>
      {details ? (
        <div className="2xl:grid 2xl:grid-cols-12 h-full bg-slate-200 w-full">
          <div className=" col-span-8 border border-r-2 border-emerald-600 rounded-lg">
            {!edit ? (
              <div>
                <div className="flex flex-col sm:gap-5 relative">
                  <button
                    className=" absolute right-2 font-bold border-2 self-center mt-2 w-24 border-amber-500 p-2 rounded-lg hover:bg-amber-500  hover:text-amber-900 duration-300"
                    onClick={handleEdit}
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>

                  <h4 className=" text-emerald-700 sm:text-center font-bold text-xl sm:text-2xl">
                    {details.title}
                  </h4>
                  <p className="sm:absolute sm:right-48 sm:top-2">
                    <strong>Days Worked:</strong> {details.days}
                  </p>
                  <p>{details.description}</p>
                </div>

                <div>
                  <Notes details={details} />
                </div>
              </div>
            ) : (
              //EDIT FORM
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <label
                  className="text-emerald-500 font-bold text-xl"
                  htmlFor=""
                >
                  Project Title:
                </label>
                <input
                  type="text"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  className={`focus:outline-none border border-slate-400 ${
                    fill ? (title ? "" : "border-rose-600") : ""
                  } p-2`}
                />
                <label
                  className="text-emerald-500 font-bold text-xl"
                  htmlFor=""
                >
                  Description:
                </label>
                <textarea
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  className={`border  border-slate-400 rounded-lg h-screen focus:outline-none ${
                    fill ? (description ? "" : "border-rose-600 border-2") : ""
                  } `}
                ></textarea>

                <div className="self-center flex ">
                  <button className=" font-bold border-2 w-full sm:w-60 border-emerald-500 p-2 sm:p-4 rounded-lg hover:bg-emerald-500  hover:text-emerald-900 duration-300">
                    Edit Project
                  </button>
                  <button
                    onClick={handleEdit}
                    className=" font-bold border-2 w-full sm:w-60 border-rose-500 p-2 sm:p-4 rounded-lg hover:bg-rose-500  hover:text-rose-900 duration-300"
                  >
                    Go back to project
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
            )}
          </div>

          <div className=" col-span-4 ">
            <Pomodoro />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
