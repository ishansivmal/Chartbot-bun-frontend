import { useState, useEffect } from "react";
import type { Person, PersonInput } from "../models/types";

interface Props {
  onSubmit: (person: PersonInput) => void;
  onUpdate: (id: number, person: PersonInput) => void;
  editing: Person | null;
  onCancel: () => void;
}

export default function PersonForm({ onSubmit, onUpdate, editing, onCancel }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  useEffect(() => {
    if (editing) {
      setName(editing.name);
      setEmail(editing.email);
      setAge(String(editing.age));
    } else {
      setName("");
      setEmail("");
      setAge("");
    }
  }, [editing]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const person: PersonInput = { name, email, age: Number(age) };

    if (editing) {
      onUpdate(editing.id, person);
    } else {
      onSubmit(person);
    }

    setName("");
    setEmail("");
    setAge("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-2xl p-6 space-y-4">
      <h2 className="text-xl font-bold text-gray-800">
        {editing ? "Edit Person" : "Add Person"}
      </h2>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="number"
        min={1}
        max={150}
        value={age}
        onChange={(e) => setAge(e.target.value)}
        placeholder="Age"
        required
        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors cursor-pointer"
        >
          {editing ? "Update" : "Add"}
        </button>

        {editing && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 rounded-lg transition-colors cursor-pointer"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
