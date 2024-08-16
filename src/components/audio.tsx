import { useEffect } from "react";
import { socket } from "./socketIO";
import useSpeechRecognitionStore from "../store/speechRecognitionStore";

const Audio = () => {
  const updateSpeechRecognitionStore = useSpeechRecognitionStore(
    (state) => state.updateTurnOn
  );

  useEffect(() => {
    socket.on("audio", (audioArrayBuffer: ArrayBuffer) => {
      const audio = document.getElementById("voice") as HTMLAudioElement;
      audio.src = URL.createObjectURL(
        new Blob([audioArrayBuffer], { type: "audio/wav" })
      );
      audio.onended = () => {
        updateSpeechRecognitionStore(true);
      };
      audio.play();
    });
  }, []);

  return <audio id="voice"></audio>;
};

export default Audio;
