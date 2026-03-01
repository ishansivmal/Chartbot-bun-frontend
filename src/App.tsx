import { useState } from "react";
import { Toaster } from "react-hot-toast";
import type { Person } from "./models/types";
import { usePersons } from "./hooks/usePersons";
import PersonForm from "./components/PersonForm";
import PersonList from "./components/PersonList";
import ChatBot from "./components/ChatBot";

function App() {
  const { persons, loading, error, addPerson, updatePerson, deletePerson } = usePersons();
  const [editing, setEditing] = useState<Person | null>(null);

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-right" />

      {/* Left side — CRUD (50% on desktop, full width on mobile) */}
      <div className="w-full md:w-1/2 min-h-screen py-10 px-4">
        <div className="max-w-lg space-y-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Person Manager
          </h1>

          {error && (
            <p className="text-sm text-red-500 bg-red-50 rounded-lg p-3">
              {error}
            </p>
          )}

          <PersonForm
            onSubmit={addPerson}
            onUpdate={updatePerson}
            editing={editing}
            onCancel={() => setEditing(null)}
          />

          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : (
            <PersonList
              persons={persons}
              onEdit={(person) => setEditing(person)}
              onDelete={deletePerson}
            />
          )}
        </div>
      </div>

      {/* ChatBot — floating icon + popup */}
      <ChatBot />
    </div>
  );
}

export default App;