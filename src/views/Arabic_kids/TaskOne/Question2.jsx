import { useState, useEffect, useContext, useRef } from "react";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import { useNavigate } from "react-router-dom";
import Axios_Arabic_kids from "../../../api/Axios_arabic_kids";
import { AuthContext } from "../../../hooks/Context/AuthContext";
import taskQuestionAudio from "../../../assets/audio/question2.aac";
import rington from "../../../assets/audio/rington.mp3";

export default function ArabicKidsQuestion2() {
  const [isPause, setIsPause] = useState(false);
  const intervalIdRef = useRef(null);

  const { UID, URL, part1_question_time, part1_waiting_time, partOneData } =
    useContext(AuthContext);

  const [warningSecond, setWarningSecond] = useState(part1_waiting_time);
  const [second, setSecond] = useState(part1_question_time);

  const [oneAudio, setOneAudio] = useState(false);
  const [twoAudio, setTwoAudio] = useState(false);
  const [isRington, setIsRington] = useState(false);

  const recorderControls = useAudioRecorder();

  const navigate = useNavigate();

  const addAudioToDatabase = async (blob, fileName) => {
    const formData = new FormData();
    formData.append("id_code", UID);
    formData.append("audio", blob, fileName);
    formData.append("status", "False");

    try {
      Axios_Arabic_kids.post("audio/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("jwtToken")).access
          }`,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleRecordingComplete = async (audioData) => {
    // Convert the audioData to a Blob
    const blob = new Blob([audioData], { type: "video/webm" });

    // Extract the file name from the original audioData
    const fileName = `1_${partOneData[1]?.question}.webm`; // Use the actual file name if available in audioData

    // Send the audio data to the server
    addAudioToDatabase(blob, fileName);
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'p') {
        setIsPause((prevIsPause) => !prevIsPause); // Toggle the value
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []); 

  useEffect(() => {
    if (oneAudio && twoAudio) {
      if (warningSecond > 0) {
        const intervalId = setInterval(() => {
          setWarningSecond((prevSecond) => prevSecond - 1);
        }, 1000);

        return () => clearInterval(intervalId);
      } else {
        if (second > 0) {
          if (!isPause) {
            if (second === 1){
              recorderControls.stopRecording();
            }
            else if (!recorderControls.isPaused) {
              recorderControls.startRecording();
            } else {
              recorderControls.togglePauseResume();
            }intervalIdRef.current = setInterval(() => {
              setSecond((prev) => prev - 1);
            }, 1000);
            
          } else {
            
            clearInterval(intervalIdRef.current);
            recorderControls.togglePauseResume();
          }

          return () => clearInterval(intervalIdRef.current);
        } else {
          navigate("/kids_id=1/question=3");
        }
      }
    }
  }, [warningSecond, second, oneAudio, twoAudio, isPause]);

  const playlist = [taskQuestionAudio, URL + partOneData[1]?.audio];

  const handleEndedOneAudio = () => {
    setOneAudio(true);
  };

  const handleEndedTwoAudio = () => {
    setTwoAudio(true);
  };

  const handleEndedIsRington = () => {
    setIsRington(true);
  };

  return (
    <>
      <audio onEnded={handleEndedOneAudio} autoPlay>
        <source src={playlist[0]} />
        {/* Replace with the actual source of your audio file */}
      </audio>

      {oneAudio && (
        <audio onEnded={handleEndedTwoAudio} autoPlay>
          <source src={playlist[1]} />
          {/* Replace with the actual source of your audio file */}
        </audio>
      )}

      {oneAudio && twoAudio && warningSecond === 0 && (
        <audio onEnded={handleEndedIsRington} autoPlay>
          <source src={rington} />
          {/* Replace with the actual source of your audio file */}
        </audio>
      )}

      <div
        className={
          "mt-[30px] flex w-full flex-col justify-center gap-[40px] rounded-[20px] bg-white p-10"
        }
      >
        <div className="mx-auto inline-flex items-center gap-[12px]">
          <div className="flex flex-col items-center gap-2 md:flex-row">
            <div className="circle flex h-[24px] w-[24px] items-center justify-center rounded-full">
              <h3 className={"text-sm font-semibold text-[#118FCE]"}>١</h3>
            </div>
            <h3 className={"text-sm font-semibold text-[#118FCE]"}>
              الجزء الأول
            </h3>
          </div>
          <div className="line bg-[#E5E7EA] md:h-[1px] md:w-[32px]"></div>
          <div className="flex flex-col items-center gap-2 md:flex-row">
            <div className="circle flex h-[24px] w-[24px] items-center justify-center rounded-full bg-[#F7F7F7]">
              <h3 className="text-sm font-semibold text-[#ADAEB1]">٢</h3>
            </div>
            <h3 className="text-sm font-semibold text-[#ADAEB1]">
              الجزء الثاني
            </h3>
          </div>
          <div className="line bg-[#E5E7EA] md:h-[1px] md:w-[32px]"></div>
          <div className="flex flex-col items-center gap-2 md:flex-row">
            <div className="circle flex h-[24px] w-[24px] items-center justify-center rounded-full bg-[#F7F7F7]">
              <h3 className="text-sm font-semibold text-[#ADAEB1]">٣</h3>
            </div>
            <h3 className="text-sm font-semibold text-[#ADAEB1]">
              الجزء الثالث
            </h3>
          </div>
        </div>
        <div className="flex w-full flex-col gap-[20px] py-4">
          <h1 className="arabic-text text-center text-2xl font-normal text-[#118FCE] md:text-2xl">
            أنت في الجزء الأول
          </h1>
          <div className="flex flex-col items-center gap-3">
            {oneAudio ? (
              <h2 className="arabic-text text-xl font-normal md:text-4xl">
                <span className="number">٢</span> {partOneData[1]?.question}
              </h2>
            ) : null}
          </div>
        </div>
        {warningSecond === 0 && second !== 0 && isRington && (
          <div className="flex w-full justify-center">
            <div className="mt-2 flex w-full flex-col items-center justify-center gap-4">
              <AudioRecorder
                onRecordingComplete={handleRecordingComplete}
                audioTrackConstraints={{
                  noiseSuppression: true,
                  echoCancellation: true,
                }}
                showVisualizer={true}
                recorderControls={recorderControls}
              />
            </div>
          </div>
        )}
        <div className="flex w-full items-center justify-center">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#118FCE] md:h-[50px] md:w-[50px]">
            <h1 className="text-xl font-bold text-[#118FCE] md:text-[25px]">
              {oneAudio && twoAudio && isRington ? (
                <span>{warningSecond > 0 ? warningSecond : second}</span>
              ) : (
                <span>{warningSecond}</span>
              )}
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}
