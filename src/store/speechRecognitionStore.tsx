import { create } from "zustand";

interface speechRecognitionState {
  turnOn: boolean;
  updateTurnOn: (turnOn: boolean) => void;
}

const useSpeechRecognitionStore = create<speechRecognitionState>()((set) => ({
  turnOn: false,
  updateTurnOn: (turnOn) => set({ turnOn: turnOn }),
}));

export default useSpeechRecognitionStore;
