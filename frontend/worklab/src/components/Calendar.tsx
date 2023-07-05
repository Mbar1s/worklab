import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { faRightLong, faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Chart from "./Chart";
interface Progress {
  date: string;
  completed: boolean;
  _id: string;
  timeWorked: string;
}
interface CalendarProps {
  isWorking: boolean;
  sessionWorkTime: number;
}
const Calendar = ({
  isWorking,
  sessionWorkTime,
}: CalendarProps): JSX.Element => {
  const { id } = useParams();
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const [currentDay, setCurrentDay] = useState(currentDate.getDate());
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [progress, setProgress] = useState<Progress[]>([]);
  const [displayTime, setDisplayTime] = useState(false);
  const [time, setTime] = useState(0);

  // Get the number of days in the selected month
  const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();

  // Calculate the first day of the month (0 - Sunday, 1 - Monday, etc.)
  const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1).getDay();

  // Calculate the last day of the previous month
  const lastDayOfPrevMonth = new Date(selectedYear, selectedMonth, 0).getDate();

  // Calculate the number of days to display from the previous and next months
  const prevMonthDays = Array.from(
    { length: firstDayOfMonth },
    (_, i) => lastDayOfPrevMonth - i
  ).reverse();
  const nextMonthDays = Array.from(
    { length: 42 - (prevMonthDays.length + daysInMonth) },
    (_, i) => i + 1
  );

  // Create an array to represent the days of the month
  const monthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const handlePrevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear((prevYear) => prevYear - 1);
    } else {
      setSelectedMonth((prevMonth) => prevMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear((prevYear) => prevYear + 1);
    } else {
      setSelectedMonth((prevMonth) => prevMonth + 1);
    }
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(Number(event.target.value));
  };

  //Function for sending progress data
  useEffect(() => {
    if (!isWorking) {
      if (
        progress[progress.length - 1]?.date !==
        new Date(currentYear, currentMonth, currentDay).toISOString()
      ) {
        const handleSubmit = async () => {
          try {
            await axios.put(
              `http://localhost:4000/api/projects/${id}/progress`,
              {
                date: new Date(currentYear, currentMonth, currentDay),
                completed: true,
                timeWorked: sessionWorkTime,
              }
            );
            console.log("progress added successfully");
          } catch (error) {
            console.error("error adding progress:", error);
          }
        };
        handleSubmit();
      } else {
        const handleProgressUpdate = async () => {
          const progressId = progress[progress.length - 1]._id;
          try {
            await axios.patch(
              `work-lab-backend.vercel.app/api/projects/${id}/progress/${progressId}`,
              {
                timeWorked: parseInt(progress[progress.length - 1]?.timeWorked) + 45,
              }
            );
            console.log("progress updated");
          } catch (error) {
            console.error("Error updating progress:", error);
          }
        };
        handleProgressUpdate();
      }
    }
  }, [isWorking]);
  
  //Recieve progress data
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        await axios
          .get(`http://localhost:4000/api/projects/${id}/progress`)
          .then(function (response) {
            setProgress(response.data);
          });
      } catch (error) {
        console.error("Error updating total times:", error);
      }
    };
    fetchProjects();
  }, [id]);
  console.log(progress);
  const isDayCompleted = (day: number) => {
    const matchingEntry = progress.find(
      (entry) =>
        new Date(entry.date).toString() ===
          new Date(selectedYear, selectedMonth, day).toString() &&
        entry.completed
    );
    console.log(matchingEntry);

    return matchingEntry?.timeWorked;
  };

  const setDisplay = () => {
    setDisplayTime((prevDisplayTime) => !prevDisplayTime);
  };
  return (
    <div className="">
      <div className="flex justify-between mt-2 mb-1">
        <button
          className="border w-full p-3 text-center border-rose-600 hover:bg-rose-600 duration-300"
          onClick={handlePrevMonth}
        >
          <FontAwesomeIcon icon={faLeftLong} /> Previous Month
        </button>
        <div className="flex flex-col text-center border border-cyan-600 hover:bg-cyan-600 duration-300 w-full p-3 ">
          <span className="font-semibold">
            {new Date(selectedYear, selectedMonth).toLocaleString("default", {
              month: "long",
            })}{" "}
            {selectedYear}
          </span>
          <select
            className=" self-center snap-center text-center"
            value={selectedYear}
            onChange={handleYearChange}
          >
            <option value={currentYear - 1}>{currentYear - 1}</option>
            <option value={currentYear}>{currentYear}</option>
            <option value={currentYear + 1}>{currentYear + 1}</option>
          </select>
        </div>
        <button
          className="border w-full p-3 text-center border-emerald-600 hover:bg-emerald-600 duration-300"
          onClick={handleNextMonth}
        >
          Next Month <FontAwesomeIcon icon={faRightLong} />
        </button>
      </div>
      <div className="grid grid-cols-7 ">
        {daysOfWeek.map((day) => (
          <div className="border border-emerald-600 p-2 text-center" key={day}>
            {day}
          </div>
        ))}
      </div>
      <div className=" grid grid-cols-7">
        {/* Render the days from the previous month */}
        {prevMonthDays.map((day) => (
          <div
            className="flex-1 p-2 text-gray-400 text-center border border-gray-400"
            key={`prev-${day}`}
          >
            {displayTime
              ? isDayCompleted(day)
                ? `work time:${isDayCompleted(day)} minutes`
                : day
              : day}
          </div>
        ))}
        {/* Render the days of the selected month */}
        {monthDays.map((day) => (
          <div
            onClick={setDisplay}
            className={`text-center border border-emerald-600 p-2 ${
              isDayCompleted(day) ? "bg-emerald-600 cursor-pointer" : ""
            } `}
            key={day}
          >
            {displayTime
              ? isDayCompleted(day)
                ? `${isDayCompleted(day)} minutes`
                : day
              : day}
          </div>
        ))}
        {/* Render the days from the next month */}
        {nextMonthDays.map((day) => (
          <div
            className="flex-1 p-2 text-gray-400 text-center border border-gray-400"
            key={`next-${day}`}
          >
            {displayTime
              ? isDayCompleted(day)
                ? `work time:${isDayCompleted(day)} minutes`
                : day
              : day}
          </div>
        ))}
      </div>
      <Chart
        progress={progress}
      />
    </div>
  );
};

export default Calendar;
