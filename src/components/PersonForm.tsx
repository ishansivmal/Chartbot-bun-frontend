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
    <form onSubmit={handleSubmit} className="bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm shadow-lg rounded-2xl p-6 space-y-4">
      <h2 className="text-lg font-semibold text-white">
        {editing ? "✏️ Edit Person" : "➕ Add Person"}
      </h2>

      <div className="space-y-1">
        <label className="text-xs font-medium text-slate-400 uppercase tracking-wide">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="enter your name"
          required
          className="w-full border border-slate-600/50 rounded-xl px-4 py-2.5 text-slate-200 bg-slate-900/50 placeholder-slate-500 focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs font-medium text-slate-400 uppercase tracking-wide">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="enter your email"
          required
          className="w-full border border-slate-600/50 rounded-xl px-4 py-2.5 text-slate-200 bg-slate-900/50 placeholder-slate-500 focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs font-medium text-slate-400 uppercase tracking-wide">Age</label>
        <input
          type="number"
          min={1}
          max={150}
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="enter your age"
          required
          className="w-full border border-slate-600/50 rounded-xl px-4 py-2.5 text-slate-200 bg-slate-900/50 placeholder-slate-500 focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
        />
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2.5 rounded-xl transition-all active:scale-[0.98] cursor-pointer shadow-lg shadow-indigo-900/30"
        >
          {editing ? "Update" : "Add Person"}
        </button>

        {editing && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-slate-700 hover:bg-slate-600 text-slate-300 font-medium py-2.5 rounded-xl transition-all cursor-pointer"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
