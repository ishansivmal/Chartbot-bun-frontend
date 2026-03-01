export interface Person {
  id: number;
  name: string;
  email: string;
  age: number;
}

export type PersonInput = Omit<Person, "id">;
