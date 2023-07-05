import { useEffect, useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuthContext } from "../hooks/useAuthContext";
//components
import ProjectDetails from "../components/ProjectDetails";
import ProjectForm from "../components/ProjectForm";

interface Progress {
  date: string;
  completed: boolean;
  _id: string;
  timeWorked: string;
}

interface Projects {
  _id: string;
  title: string;
  days: number;
  description: string;
  progress: Progress[];
}

export default function Home() {
  const [projects, setProjects] = useState<Projects[]>([]);
  const [changePage, setChangePage] = useState(true);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch("http://localhost:4000/api/projects", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        setProjects(json);
      }
    };
    if (user) {
      fetchProjects();
    }
  }, [changePage, user]);

  const handlePage = () => {
    setChangePage(!changePage);
  };

  return (
    <div className="h-full bg-slate-200">
      <div className="flex gap-10 justify-center text-3xl p-2 text-emerald-600">
        {changePage ? <h1 className="p-2 font-bold ">Your Projects</h1> : ""}
        <button
          onClick={handlePage}
          className=" font-bold border-2 border-emerald-500 p-2 rounded-lg hover:bg-emerald-500  hover:text-emerald-900 duration-300"
        >
          {changePage ? (
            <div>
              New Project <FontAwesomeIcon icon={faPlus} />
            </div>
          ) : (
            "Go Back To Projects"
          )}
        </button>
      </div>
      {changePage ? (
        <div>
          {projects &&
            projects.map((project) => (
              <ProjectDetails key={project._id} project={project} />
            ))}
        </div>
      ) : (
        <ProjectForm />
      )}
    </div>
  );
}
