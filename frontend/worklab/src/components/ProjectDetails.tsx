import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Chart from "./Chart";
import React, { useState } from "react";
faTrash;
import { Link } from "react-router-dom";
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
  const handleDelete = async () => {
    const response = await fetch(
      "http://localhost:4000/api/projects/" + project._id,
      {
        method: "DELETE",
      }
    );
    const json = await response.json();
  };

  console.log(project);
  return (
    <div className=" flex flex-row  justify-between  border border-emerald-600 rounded-lg shadow-md mb-2 p-4 bg-slate-100">
      <div className="flex flex-col p-4 gap-2 w-3/4">
        <h4 className=" text-emerald-600 font-extrabold text-2xl">
          {project.title}
        </h4>
        <p>
          <strong>Description:</strong> {project.description}
        </p>
        <p>
          <strong>Days Worked:</strong> {project.days}
        </p>
        <div className="flex flex-row gap-1 mt-2">
          <span
            className="p-2 w-24 border-2 border-rose-600 hover:bg-rose-600 duration-300 cursor-pointer text-rose-500 font-bold hover:text-rose-950 text-center"
            onClick={handleDelete}
          >
            <FontAwesomeIcon icon={faTrash} />
          </span>
          <Link
            className="p-2 w-24 border-2 border-emerald-600 hover:bg-emerald-600 duration-300 cursor-pointer text-emerald-500 font-bold hover:text-emerald-950 text-center"
            to={`/SingleProject/${project._id}`}
          >
            <span>Details</span>
          </Link>
        </div>
      </div>

      <div className="flex flex-col text-center w-1/4">
        <h1>Your Progress</h1>
        <Chart progress={project.progress} />
      </div>
    </div>
  );
}
