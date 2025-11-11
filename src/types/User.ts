// src/types/User.ts
export interface User {
  id: string;
  _id?: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  agency?: string;
  photo?: string;
  favorites?: string[] | any[];
  recentViews?: string[] | any[];
  subscription?: string;
  preferences?: Record<string, any>;
  bookedProperties?: string[];
}
