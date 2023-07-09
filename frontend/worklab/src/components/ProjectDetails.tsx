import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Chart from "./Chart";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

interface Progress {
  date: string;
  completed: boolean;
  _id: string;
  timeWorked: string;
}
interface Project {
  _id: string;
  title: string;
  description: string;
  days: number;
  progress: Progress[];
}
interface ProjectDetailsProps {
  project: Project;
}

export default function ProjectDetails({
  project,
}: ProjectDetailsProps): JSX.Element {
  const { user } = useAuthContext();
  const handleDelete = async () => {
    if (!user) {
      return;
    }
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/projects/` + project._id,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();
    console.log(json);
  };

  console.log(project);
  return (
    <div className=" sm:grid sm:grid-cols-12 justify-between  border border-emerald-600 rounded-lg shadow-md mb-2 p-4 bg-slate-100">
      <div className="relative flex flex-col p-4 gap-2 col-span-8">
        <div className="absolute sm:top-0 top-14 right-2 flex flex-row gap-1">
          <span
            className="sm:p-2 py-1 px-2 sm:py-0 sm:px-0 sm:w-24 border-2 border-rose-600 hover:bg-rose-600 duration-300 cursor-pointer text-rose-500 font-bold hover:text-rose-950 text-center"
            onClick={handleDelete}
          >
            <FontAwesomeIcon icon={faTrash} />
          </span>
          <Link
            className="sm:p-2 py-1 px-2 sm:py-0 sm:px-0 sm:w-24 border-2 border-emerald-600 hover:bg-emerald-600 duration-300 cursor-pointer text-emerald-500 font-bold hover:text-emerald-950 text-center"
            to={`/SingleProject/${project._id}`}
          >
            <span>Details</span>
          </Link>
        </div>
        <h4 className=" text-emerald-600 font-extrabold text-2xl">
          {project.title}
        </h4>
        <p>
          <strong>Days Worked:</strong> {project.days}
        </p>
        <p className="mt-2">
          <strong>Description:</strong> {project.description}
        </p>
      </div>

      <div className="flex flex-col text-center border-l-2 border-emerald-600 rounded-lg col-span-4">
        <h1 className="font-semibold text-emerald-600">Your Progress</h1>
        <Chart progress={project.progress} />
      </div>
    </div>
  );
}
