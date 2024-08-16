import Audio from "./components/audio";
import ChatForm from "./components/chatForm";
import Output from "./components/output";
import SelectSpeaker from "./components/selectSpeaker";
import SpeechRecognition from "./components/speechRecognition";
import "./scss/App.scss";
import Container from "react-bootstrap/Container";

function App() {
  return (
    <Container fluid className="h-100">
      <SelectSpeaker />
      <Audio />
      <SpeechRecognition />
      <Output />
      <ChatForm />
    </Container>
  );
}

export default App;
