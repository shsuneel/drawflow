type TaskNode = {
  task: number;
  connectedTo: number[];
  parent?: number[];
  column?: number;
};

export function processTasks(tasks: TaskNode[]): TaskNode[] {
  // Map task ID to its index
  const taskIndexMap: Record<number, number> = {};
  tasks.forEach((taskObj, index) => {
    taskIndexMap[taskObj.task] = index;
  });

  // Map child task ID to its parent task IDs
  const parentMap: Record<number, number[]> = {};
  tasks.forEach(({ task, connectedTo }) => {
    connectedTo.forEach(child => {
      if (!parentMap[child]) {
        parentMap[child] = [];
      }
      parentMap[child].push(task);
    });
  });

  // Track column for each task ID
  const columnMap: Record<number, number> = {};

  // Build updated tasks
  const updatedTasks: TaskNode[] = tasks.map((taskObj) => {
    const taskId = taskObj.task;
    const parents = parentMap[taskId] || [];

    // Determine column: max(parent column) + 1
    let column: number;
    if (parents.length === 0) {
      column = 1; // root node
    } else {
      const parentColumns = parents.map(p => columnMap[p] ?? 1);
      column = Math.max(...parentColumns) + 1;
    }

    columnMap[taskId] = column;

    return {
      ...taskObj,
      parent: parents.map(p => taskIndexMap[p] + 1),
      column
    };
  });

  return updatedTasks;
}


/* parent file */


import { processTasks } from './yourModuleFile';

const tasks = [
  { task: 1, connectedTo: [2] },
  { task: 2, connectedTo: [3, 4] },
  { task: 3, connectedTo: [5] },
  { task: 4, connectedTo: [5] },
  { task: 5, connectedTo: [6] },
  { task: 6, connectedTo: [] }
];

const result = processTasks(tasks);
console.log(result);

