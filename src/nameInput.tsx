import React from "react";
import { db, doc, updateDoc, deleteDoc } from './firebase'
import Character from "./types";

export const NameInput = (character: Character) => {
  const [name, setName] = React.useState(character.name);

  const onUpdate = async () => {
    await updateDoc(doc(db, "lotr", character.id), { ...character, name });
  }

  const onDelete = async () => {
    await deleteDoc(doc(db, "lotr", character.id));
  }

  return (
    <>
      <input
        value={name}
        onChange={e => {
          setName(e.target.value);
        }}
      />
      <button onClick={onUpdate}>Update</button>
      <button onClick={onDelete}>Delete</button>
    </>
  );
};