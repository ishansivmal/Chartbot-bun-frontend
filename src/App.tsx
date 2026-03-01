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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Toaster
        position="top-right"
        toastOptions={{
          style: { borderRadius: "12px", background: "#1e293b", color: "#f8fafc", fontSize: "14px" },
        }}
      />

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
            👤 Person Manager
          </h1>
          <p className="text-sm text-slate-400 mt-0.5">Manage your contacts easily</p>
        </div>
      </header>

      {/* Content — side by side on desktop, stacked on mobile */}
      <div className="flex flex-col md:flex-row gap-6 px-6 py-8">
        {/* Left — CRUD */}
        <div className="w-full md:w-1/2">
          <div className="max-w-lg space-y-6">
            {error && (
              <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl p-4">
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