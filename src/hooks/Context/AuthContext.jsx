import { createContext, useState } from "react";

export const AuthContext = createContext({});

export default function AuthContextProvider({ children }) {
  const [part1_question_time, setPart1_question_time] = useState(0);
  const [part1_waiting_time, setPart1_waiting_time] = useState(0);
  const [part2_question_time, setPart2_question_time] = useState(0);
  const [part2_waiting_time, setPart2_waiting_time] = useState(0);
  const [part3_question_time, setPart3_question_time] = useState(0);
  const [part3_waiting_time, setPart3_waiting_time] = useState(0);
  const [partThreeData, setPartThreeData] = useState({});
  const [partOneData, setPartOneData] = useState({});
  const [must, setMust] = useState({});
  const [UID, SETUID] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");

  const URL = "https://alnajah.pythonanywhere.com";

  const URL_Kids = "https://alnajah.pythonanywhere.com/kids/"

  const Content = {
    UID,
    SETUID,
    URL,
    URL_Kids,
    selectedDifficulty,
    setSelectedDifficulty,
    part1_question_time,
    part1_waiting_time,
    part2_question_time,
    part2_waiting_time,
    part3_question_time,
    part3_waiting_time,
    setPart1_question_time,
    setPart1_waiting_time,
    setPart2_question_time,
    setPart2_waiting_time,
    setPart3_question_time,
    setPart3_waiting_time,
    setPartThreeData,
    partThreeData,
    setPartOneData,
    partOneData,
    setMust,
    must
  };

  return (
    <AuthContext.Provider value={Content}>{children}</AuthContext.Provider>
  );
}
