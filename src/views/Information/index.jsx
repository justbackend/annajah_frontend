import { useState, useContext, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import VoiceRecorder from "../../components/VoiceRecorder";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Axios from "../../api/Axios";
import { AuthContext } from "../../hooks/Context/AuthContext";
import { v4 as uuidv4 } from "uuid";



export default function Information() {
  const {
    UID,
    selectedDifficulty,
    setSelectedDifficulty,
    SETUID,
  } = useContext(AuthContext);

  const [selectedSubject, setSelectedSubject] = useState('');
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const uid = uuidv4();

  const warning = () =>
    toast.warning("Barcha qatorlarni to'ldirishingiz talab qilinadi!");
  const warningError = () => toast.warning("Ro'yxatdan o'tmaganmisiz!");
  const success = () => toast.success("Ma'lumotlaringiz saqlandi.");

  const warningStatus = () => toast.warning("A'zolik mudati tugagan!");

  const navigate = useNavigate();

  const handleSubjectChange = (event) => {
    const subject = event.target.value;
    setSelectedSubject(subject);
  };

  const handleDifficultyChange = (event) => {
    const difficulty = event.target.value;
    setSelectedDifficulty(difficulty);
  };

  const handleSubmit = async () => {
    if (name && surname && fatherName) {
      setIsLoading(true);
      try {
        let endpoint = "user/";
  
        // Check the selectedSubject and selectedDifficulty values
        if (selectedDifficulty === "daraja_2") {
          endpoint = "kids/user/";
        }
  
        await Axios.post(
          endpoint,
          {
            id_code: UID,
            name: name,
            surname: surname,
            middle_name: fatherName,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("jwtToken")).access
              }`,
            },
          },
        );

        if(selectedDifficulty === "daraja_1"){
          navigate("/task_id=1/question=1");
          success();
          setName("");
          setSurname("");
          setFatherName("");
          localStorage.setItem("user", true);
        } else if(selectedDifficulty === "daraja_2") {
          navigate("/kids_id=1/question=1");
          success();
          setName("");
          setSurname("");
        setFatherName("");
        localStorage.setItem("user", true);
        } else {
          warning();
        }
      } catch (error) {
        setIsLoading(false);
        console.error(error);
        warningError();
      }
    } else {
      warning();
    }
  };

  useEffect(() => {
    SETUID(uid);

    try {
      if (localStorage.getItem("jwtToken")) {
        const getStatus = async () => {
          const { data } = await Axios.get("status/", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("jwtToken")).access
              }`,
            },
          });
          if (data.status === "False") {
            warningStatus();
            localStorage.removeItem("jwtToken");
            window.location.href = "/";
          }
        };
        getStatus();
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div  className="mt-8 flex min-h-[400px] flex-row items-center justify-center gap-3 bg-[#F7F7F7]">
      <div className="flex w-[400px]  flex-col items-start justify-center gap-3 rounded-[20px] bg-[#fff] p-8">
        <div className="flex w-full flex-col gap-5">
          <h1 className="text-start text-xl font-bold">
            Ma’lumotlaringizni kiriting
          </h1>
          <TextField
            id="name"
            label="Ism"
            multiline
            maxRows={4}
            variant="filled"
            className="w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="surname"
            label="Familiya"
            multiline
            maxRows={4}
            variant="filled"
            className="w-full"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
          <TextField
            id="father-name"
            label="Otasining ismi"
            multiline
            maxRows={4}
            variant="filled"
            className="w-full"
            value={fatherName}
            onChange={(e) => setFatherName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <h1 className="text-start text-xl font-bold">
            Mikrofoningizni tekshirib oling
          </h1>
          <VoiceRecorder downloadOnSavePress={false} />
        </div>
        <Button
          className="w-full"
          size="large"
          variant="outlined"
          onClick={handleSubmit}
        >
          {!isLoading ? <span>Boshlash</span> : <span>Loading...</span>}
        </Button>
      </div>
      <div className="flex flex-col top-0 mt-0">
        <select value={selectedSubject} onChange={handleSubjectChange} className="p-3 w-[110px] min-h-[40px]" name="" id="">
          <option value="arab_tili">Arab tili</option>
          <option value="eng_tili" disabled>🔒Englsh tili</option>
          <option value="rus_tili" disabled>🔒Rus tili</option>
        </select>
        <select value={selectedDifficulty} onChange={handleDifficultyChange} className="p-3  w-[110px] min-h-[40px] mt-4" name="" id="">
          <option value="">Daraja:</option>
          <option value="daraja_1">daraja 1</option>
          <option value="daraja_2">daraja 2</option>
        </select>
      </div>
      <ToastContainer />
    </div>
  );
}
