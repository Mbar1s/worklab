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
      const response = await fetch(`${import.meta.env.VITE_API_URL}/projects`, {
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
      <div className="absolute sm:top-1 sm:left-40 left-48 sm:text-3xl p-2 text-emerald-600">
        <button
          onClick={handlePage}
          className=" font-bold border border-emerald-500 p-2 rounded-lg hover:bg-emerald-500  hover:text-emerald-900 duration-300"
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
