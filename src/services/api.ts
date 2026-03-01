import axios from "axios";
import type { Person, PersonInput } from "../models/types";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
});

export const personService = {
  getAll: async (): Promise<Person[]> => {
    const { data } = await api.get(import.meta.env.VITE_API_URL + "/users");
    return data;
  },

  create: async (person: PersonInput): Promise<Person> => {
    const { data } = await api.post(import.meta.env.VITE_API_URL + "/users", person);
    return data;
  },

  update: async (id: number, person: PersonInput): Promise<Person> => {
    const { data } = await api.put(import.meta.env.VITE_API_URL + `/users/${id}`, person);
    return data;
  },

  remove: async (id: number): Promise<void> => {
    await api.delete(import.meta.env.VITE_API_URL + `/users/${id}`);
  },
};
