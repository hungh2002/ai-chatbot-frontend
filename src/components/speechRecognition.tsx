import Button from "react-bootstrap/Button";
import { socket } from "./socketIO";
import useInputStore from "../store/inputStore";
import useSpeechRecognitionStore from "../store/speechRecognitionStore";
import { useEffect } from "react";

const SpeechRecognition = () => {
  const updateInput = useInputStore((state) => state.updateInput);
  const turnOn = useSpeechRecognitionStore((state) => state.turnOn);
  const updateTurnOn = useSpeechRecognitionStore((state) => state.updateTurnOn);

  useEffect(() => {
    if (turnOn === true) {
      onClick();
    }
  }, [turnOn]);

  const onClick = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    recognition.lang = "ja";

    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      socket.emit("message", transcript);
      updateInput(transcript);
    };

    recognition.onspeechend = () => {
      recognition.stop();
      updateTurnOn(false);
    };
  };
  return (
    <Button
      onClick={onClick}
      variant="secondary"
      id="speech-recognition-button"
    >
      Recognition
    </Button>
  );
};

export default SpeechRecognition;
