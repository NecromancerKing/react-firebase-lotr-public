import React from "react";
import "./App.css";
import { db, collection, doc, setDoc, onSnapshot } from "./firebase";
import { NameInput } from './nameInput'
import Character from "./types";

function App() {
  const [lotr, setLotr] = React.useState<Character[]>([]);
  const [newCharacterName, setNewCharacterName] = React.useState<string>();

  React.useEffect(() => {
    return onSnapshot(collection(db, 'lotr'), (data) => {
      setLotr(data.docs.map((doc: any) => ({ ...doc.data(), id: doc.id })));
    });
  }, []);

  const onCreate = async () => {
    // add new document with auto-generated id
    const newCharacter = doc(collection(db, "lotr"));
    await setDoc(newCharacter, { name: newCharacterName });
    setNewCharacterName("");
  };

  return (
    <ul className="lotr-list">
      <li>
        {`Name: `}
        <input
          value={newCharacterName}
          onChange={e => setNewCharacterName(e.target.value)}
        />
        <button onClick={onCreate}>Create</button>
      </li>
      {lotr.map(character => (
        <li key={character.id}>
          <ul>
            <li>Name: <NameInput {...character} /></li>
            <li>{`Race: ${character.race}`}</li>
            <li>{`Birth: ${character.birth}`}</li>
            <li>{`Death: ${character.death}`}</li>
            <li>{`Realm: ${character.realm}`}</li>
            <li>{`Height: ${character.height}`}</li>
            <li>{`Spouse: ${character.spouse}`}</li>
            <li>{`Gender: ${character.gender}`}</li>
            <li>{`Hair: ${character.hair}`}</li>
          </ul>
          <img src={`data:image/jpeg;base64,${character.image}`} alt={character.name} />
        </li>
      ))}
    </ul>
  );
}

export default App;
