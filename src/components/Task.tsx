import React from "react";

import type { inferRouterOutputs } from "@trpc/server";
import { todoRouter } from "../server/trpc/router/todo";

type TodoRouterOutput = inferRouterOutputs<typeof todoRouter>;

type Task = TodoRouterOutput["all"][0];

const Task: React.FC<{
  task: Task;
  delete: () => void;
  update: (id: number, title: string, status: Task["status"]) => void;
}> = (props) => {
  const { id, title, status } = props.task;
  return (
    <>
      <div
        className={`m-2 flex flex-col items-center text-center ${
          status === "DONE" && "opacity-25"
        }`}
      >
        <div className="w-full rounded-md bg-slate-300 px-3 py-2 backdrop-blur-lg">
          <div className="flex items-center justify-between">
            <div className="mr-5">{id}</div>
            <li className="list-none break-normal">
              {status === "INPROGRESS" ? title : <del>{title}</del>}
            </li>
            <div className="flex gap-3">
              {status === "INPROGRESS" && (
                <button
                  className="rounded-md bg-blue-600 px-2 py-2 font-medium text-white"
                  onClick={() => props.update(id, title, "DONE")}
                >
                  Completed
                </button>
              )}

              <button
                className="rounded-md bg-white px-2 py-2 font-medium text-blue-600"
                onClick={() => props.delete()}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Task;
