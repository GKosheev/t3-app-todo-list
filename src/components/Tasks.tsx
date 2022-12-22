import React from "react";
import Task from "./Task";

import type { inferRouterOutputs } from "@trpc/server";
import { todoRouter } from "../server/trpc/router/todo";

type TodoRouterOutput = inferRouterOutputs<typeof todoRouter>;

type AllTasks = TodoRouterOutput["all"];

const Tasks: React.FC<{
  tasks: AllTasks;
  delete: (id: number) => void;
  update: (id: number, title: string, status: AllTasks[0]["status"]) => void;
}> = (props) => {
  return (
    <>
      <h1 className="mb-6 text-center text-2xl font-semibold uppercase text-blue-600">
        {props.tasks.length ? "Task List" : "List is Empty"}
      </h1>
      {props.tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          delete={() => props.delete(task.id)}
          update={props.update}
        />
      ))}
    </>
  );
};

export default Tasks;
