import { User } from "./User";

export interface Task {
    id: number;
    title: string;
    description: string;
    dueDate: string | null; // Nous utiliserons une chaîne pour la date, que nous convertirons côté client si nécessaire
    status: string;
    user: User; // Nous définissons également une interface User
  }