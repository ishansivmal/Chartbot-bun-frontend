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
    <div className="min-h-screen bg-grid relative">
      {/* Background glows */}
      <div className="bg-glow" />
      <div className="bg-glow-2" />

      <Toaster
        position="top-right"
        toastOptions={{
          style: { borderRadius: "12px", background: "#1e293b", color: "#f8fafc", fontSize: "14px", border: "1px solid #334155" },
        }}
      />

      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              👤 Person Manager
            </h1>
            <p className="text-sm text-slate-400 mt-0.5">Manage your contacts easily</p>
          </div>
          <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">
            PM
          </div>
        </div>
      </header>

      {/* Content — side by side on desktop, stacked on mobile */}
      <div className="relative z-10 flex flex-col md:flex-row gap-6 px-6 py-8 max-w-7xl mx-auto">
        {/* Left — CRUD */}
        <div className="w-full md:w-1/2">
          <div className="max-w-lg space-y-6">
            {error && (
              <div className="flex items-center gap-2 text-sm text-red-400 bg-red-950/50 border border-red-800/50 rounded-xl p-4">
                <span>⚠️</span> {error}
              </div>
            )}

            <PersonForm
              onSubmit={addPerson}
              onUpdate={updatePerson}
              editing={editing}
              onCancel={() => setEditing(null)}
            />

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="h-8 w-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
              </div>
            ) : (
              <PersonList
                persons={persons}
                onEdit={(person) => setEditing(person)}
                onDelete={deletePerson}
              />
            )}
          </div>
        </div>

        {/* Right — ChatBot */}
        <div className="w-full md:w-1/2">
          <ChatBot />
        </div>
      </div>
    </div>
  );
}

export default App;