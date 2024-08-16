import { FormEvent } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { socket } from "./socketIO";
import useInputStore from "../store/inputStore";

const ChatForm = () => {
  const input = useInputStore((state) => state.input);
  const updateInput = useInputStore((state) => state.updateInput);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    socket.emit("message", formData.get("input")!);
  };

  return (
    <Form onSubmit={onSubmit} id="input-form" className="d-flex flex-row">
      <Button variant="secondary" type="submit">
        Submit
      </Button>
      <Form.Control
        value={input}
        name="input"
        type="input"
        placeholder="Say something ...."
        onChange={(e) => updateInput(e.target.value)}
      />
    </Form>
  );
};

export default ChatForm;
