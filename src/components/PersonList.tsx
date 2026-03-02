import type { Person } from "../models/types";

interface Props {
  persons: Person[];
  onEdit: (person: Person) => void;
  onDelete: (id: number) => void;
}

export default function PersonList({ persons, onEdit, onDelete }: Props) {
  if (persons.length === 0) {
    return (
      <div className="text-center py-12 bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm rounded-2xl">
        <p className="text-slate-400 text-sm">No persons yet. Add one above!</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm shadow-lg rounded-2xl overflow-hidden">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-slate-700/50">
            <th className="px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">Name</th>
            <th className="px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">Email</th>
            <th className="px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">Age</th>
            <th className="px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-700/30">
          {persons.map((person) => (
              <tr key={person.id != null ? person.id : `person-${persons.indexOf(person)}`}
                  className="hover:bg-slate-700/20 transition-colors">
                <td className="px-5 py-3.5 text-sm font-medium text-slate-200">{person.name}</td>
                <td className="px-5 py-3.5 text-sm text-slate-400">{person.email}</td>
                <td className="px-5 py-3.5 text-sm text-slate-400">{person.age}</td>
                <td className="px-5 py-3.5 text-right space-x-2">
                  <button
                    onClick={() => onEdit(person)}
                    className="inline-flex items-center px-3 py-1 text-xs font-medium text-indigo-400 bg-indigo-950/50 hover:bg-indigo-900/50 rounded-full transition-colors cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => person.id != null && onDelete(person.id)}
                    className="inline-flex items-center px-3 py-1 text-xs font-medium text-red-400 bg-red-950/50 hover:bg-red-900/50 rounded-full transition-colors cursor-pointer"
                    disabled={person.id == null}
                  >
                    Delete
                  </button>
                </td>
              </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
