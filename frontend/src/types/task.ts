export type Task = {
    id: number;
    title: string;
    description: string;
    status: "pending" | "in-progress" | "completed";
  };
  