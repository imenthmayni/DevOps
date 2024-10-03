import { User } from "../models/user";

export interface Note {
    id: number;
    users: User[]; // Supposons que vous avez également un modèle User
    content: string;
    rating: number;
  }