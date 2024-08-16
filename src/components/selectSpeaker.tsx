import { useEffect, useState } from "react";
import { socket } from "./socketIO";
import Form from "react-bootstrap/Form";

interface StyleId {
  name: string;
  id: number;
  type: string;
}

interface Speakers {
  name: string;
  speaker_uuid: string;
  styles: StyleId[];
  version: number;
  supported_features: {
    permitted_synthesis_morphing: string;
  };
}

const SelectSpeaker = () => {
  const [data, setData] = useState([]);
  const [selectedSpeaker, setSelectedSpeaker] = useState(2);

  useEffect(() => {
    socket.emit("speaker", selectedSpeaker);
  }, [selectedSpeaker]);

  useEffect(() => {
    socket.on("listSpeakers", (listSpeakers: string) => {
      const speakersData = JSON.parse(listSpeakers);
      setData(speakersData);
    });
  }, []);

  const listItems = data.map((speaker: Speakers) =>
    speaker.styles.map((style: StyleId) => (
      <option value={style.id} key={style.id}>
        {style.id}: name( {speaker.name} ): style( {style.name} )
      </option>
    ))
  );

  return (
    <Form>
      <Form.Label>
        <Form.Label>Select Speaker:</Form.Label>
        <Form.Select
          size="sm"
          value={selectedSpeaker}
          onChange={(e) => {
            socket.emit("speaker", e.target.value);
            setSelectedSpeaker(parseInt(e.target.value));
          }}
        >
          {listItems}
        </Form.Select>
      </Form.Label>
    </Form>
  );
};

export default SelectSpeaker;
