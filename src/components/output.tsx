import { useEffect, useState } from "react";
import { socket } from "./socketIO";

const Output = () => {
  const [output, setOutput] = useState("");

  useEffect(() => {
    socket.on("reply", (message) => {
      setOutput(message);
    });
  }, []);

  return (
    <div>
      {"->"} {output} {"<-"}
    </div>
  );
};

export default Output;
