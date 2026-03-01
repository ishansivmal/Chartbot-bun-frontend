import { useEffect, useState } from "react";
import type { Person, PersonInput } from "../models/types";
import { personService } from "../services/api";
import toast from "react-hot-toast";

export function usePersons() {
  const [persons, setPersons] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchPersons = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await personService.getAll();
      setPersons(data);
    } catch {
      setError("Failed to load persons.");
      toast.error("Failed to load persons.");
    } finally {
      setLoading(false);
    }
  };

  const addPerson = async (person: PersonInput) => {
    setError("");
    try {
      const created = await personService.create(person);
      setPersons((prev) => [...prev, created]);
      toast.success("Person added successfully!");
    } catch {
      setError("Failed to add person.");
      toast.error("Failed to add person.");
    }
  };

  const updatePerson = async (id: number, person: PersonInput) => {
    setError("");
    try {
      const updated = await personService.update(id, person);
      setPersons((prev) => prev.map((p) => (p.id === id ? updated : p)));
      toast.success("Person updated successfully!");
    } catch {
      setError("Failed to update person.");
      toast.error("Failed to update person.");
    }
  };

  const deletePerson = async (id: number) => {
    setError("");
    try {
      await personService.remove(id);
      setPersons((prev) => prev.filter((p) => p.id !== id));
      toast.success("Person deleted successfully!");
    } catch {
      setError("Failed to delete person.");
      toast.error("Failed to delete person.");
    }
  };

  useEffect(() => {
    fetchPersons();
  }, []);

  return { persons, loading, error, addPerson, updatePerson, deletePerson };
}
