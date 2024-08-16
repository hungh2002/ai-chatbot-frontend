import { create } from "zustand";

interface InputState {
  input: string;
  updateInput: (text: string) => void;
}

const useInputStore = create<InputState>()((set) => ({
  input: "",
  updateInput: (text) => set({ input: text }),
}));

export default useInputStore;
