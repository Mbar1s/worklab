import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Calendar from "./Calendar";
import {
  faPlay,
  faHourglassStart,
  faStop,
  faSchool,
  faSun,
  faClockRotateLeft,
  faHourglassEnd,
  faHourglassHalf,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PomodoroTimer: React.FC = () => {
  const { id } = useParams();
  const [timer, setTimer] = useState(0);
  const [isWorking, setIsWorking] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [days, setDays] = useState(0);
  const [sessionWorkTime, setSessionWorkTime] = useState(0);
  const [sessionBreakTime, setSessionBreakTime] = useState(0);
  const [totalWorkTime, setTotalWorkTime] = useState(0);
  const [totalBreakTime, setTotalBreakTime] = useState(0);

  useEffect(() => {
    let interval: number;

    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setTimer(0);
    setIsRunning(false);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const updateTotal = async () => {
    try {
      await axios.patch(`https://work-lab-backend.vercel.app/api/projects/${id}`, {
        totalWorkTime,
        totalBreakTime,
        days,
      });
      console.log("updated");
    } catch (error) {
      console.error("Error updating total times:", error);
    }
  };
  useEffect(() => {
    if (sessionWorkTime !== 0) {
      updateTotal();
    }
  }, [sessionWorkTime, sessionBreakTime]);

  const handleTimerFinish = () => {
    if (isWorking) {
      setTotalWorkTime((prevTotalWorkTime) => prevTotalWorkTime + 45);
      setSessionWorkTime((prevSessionWorkTime) => prevSessionWorkTime + 45);
      setDays((prevDays) => prevDays + 1);
      if (timer === 45 * 60) {
        playSound();
      }
    } else {
      setTotalBreakTime((prevTotalBreakTime) => prevTotalBreakTime + 15);
      setSessionBreakTime((prevSessionBreakTime) => prevSessionBreakTime + 15);

      if (timer === 60 * 60) {
        playSound();
        resetTimer();
      }
    }
    setIsWorking((prevIsWorking) => !prevIsWorking);
  };

  const playSound = () => {
    // Code to play sound
    console.log("Ding!");
  };

  useEffect(() => {
    if (timer === 45 * 60 || timer === 60 * 60) {
      handleTimerFinish();
    }
  }, [timer]);

  useEffect(() => {
    // Fetch initial total work time and total break time from backend
    axios
      .get("https://work-lab-backend.vercel.app/api/projects/" + id)
      .then((response) => {
        console.log(response);

        setTotalWorkTime(response.data.totalWorkTime);
        setTotalBreakTime(response.data.totalBreakTime);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  return (
    <div
      className={` flex flex-col items-center gap-2 h-full border border-l-2 ${
        isWorking
          ? "border-rose-500 border-l-emerald-600"
          : "border-emerald-500"
      } rounded-lg p-2`}
    >
      <h1 className=" font-semibold">Pomodoro Timer</h1>
      <div>
        Total Work Time: {totalWorkTime} minutes | Total Break Time:{" "}
        {totalBreakTime} minutes
      </div>
      <div>
        Session Work Time: {sessionWorkTime} minutes | Session Break Time:{" "}
        {sessionBreakTime} minutes
      </div>
      <div
        className={` border p-2 w-full text-center ${
          isWorking ? "bg-rose-500" : "bg-emerald-500"
        }`}
      >
        {isWorking ? (
          <div>
            <h1>study time</h1>
            <FontAwesomeIcon icon={faSchool} />
          </div>
        ) : (
          <div>
            <h1>break time</h1>
            <FontAwesomeIcon icon={faSun} />
          </div>
        )}
      </div>
      <div className={`  w-full text-center p-4 text-3xl`}>
        <h1>{formatTime(timer)}</h1>
        {timer !== 60 * 60 ? (
          timer !== 45 * 60 ? (
            <FontAwesomeIcon icon={faHourglassStart} />
          ) : (
            <FontAwesomeIcon icon={faHourglassHalf} />
          )
        ) : (
          <FontAwesomeIcon icon={faHourglassEnd} />
        )}
      </div>
      <div className="grid grid-cols-3 gap-1">
        <button
          className=" font-bold border-2 border-emerald-500 p-2 px-20 rounded-lg hover:bg-emerald-500  hover:text-emerald-900 duration-300"
          onClick={startTimer}
        >
          Start <FontAwesomeIcon icon={faPlay} />
        </button>
        <button
          className=" font-bold border-2 border-rose-500 p-2 px-20 rounded-lg hover:bg-rose-500  hover:text-rose-900 duration-300"
          onClick={stopTimer}
        >
          Stop <FontAwesomeIcon icon={faStop} />
        </button>
        <button
          className=" font-bold border-2 border-pink-500 p-2 px-20 rounded-lg hover:bg-pink-500  hover:text-pink-900 duration-300"
          onClick={resetTimer}
        >
          Reset <FontAwesomeIcon icon={faClockRotateLeft} />
        </button>
      </div>
      <div>
        <Calendar sessionWorkTime={sessionWorkTime} isWorking={isWorking} />
      </div>
    </div>
  );
};

export default PomodoroTimer;
