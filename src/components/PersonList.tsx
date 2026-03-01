import type { Person } from "../models/types";

interface Props {
  persons: Person[];
  onEdit: (person: Person) => void;
  onDelete: (id: number) => void;
}

export default function PersonList({ persons, onEdit, onDelete }: Props) {
  if (persons.length === 0) {
    return <p className="text-gray-500 text-center">No persons yet.</p>;
  }

  return (
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-sm font-semibold text-gray-600">Name</th>
            <th className="px-4 py-3 text-sm font-semibold text-gray-600">Email</th>
            <th className="px-4 py-3 text-sm font-semibold text-gray-600">Age</th>
            <th className="px-4 py-3 text-sm font-semibold text-gray-600 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {persons.map((person) => (
            <tr key={person.id} className="border-t border-gray-100 hover:bg-gray-50">
              <td className="px-4 py-3 text-sm text-gray-700">{person.name}</td>
              <td className="px-4 py-3 text-sm text-gray-700">{person.email}</td>
              <td className="px-4 py-3 text-sm text-gray-700">{person.age}</td>
              <td className="px-4 py-3 text-right space-x-2">
                <button
                  onClick={() => onEdit(person)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(person.id)}
                  className="text-red-600 hover:text-red-800 text-sm font-medium cursor-pointer"
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
