import { Task } from "./task";

export interface Quiz {
  name: string;
  author: string;
  questions: Array<Task>;
}
