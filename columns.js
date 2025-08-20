const tasks = [
  { task: 1, connectedTo: [2] },
  { task: 2, connectedTo: [3, 4] },
  { task: 3, connectedTo: [5] },
  { task: 4, connectedTo: [5] },
  { task: 5, connectedTo: [6] },
  { task: 6, connectedTo: [] }
];

// Create a map for quick lookup and initialize column
const taskMap = new Map();
tasks.forEach(t => taskMap.set(t.task, { ...t, column: null }));

// Use a queue for BFS
const queue = [{ taskId: 1, column: 1 }];

while (queue.length > 0) {
  const { taskId, column } = queue.shift();
  const task = taskMap.get(taskId);

  // Only update if column is not set or current column is lower
  if (task.column === null || column > task.column) {
    task.column = column;

    // Enqueue connected tasks with incremented column
    task.connectedTo.forEach(nextId => {
      const nextTask = taskMap.get(nextId);
      if (nextTask && (nextTask.column === null || nextTask.column < column + 1)) {
        queue.push({ taskId: nextId, column: column + 1 });
      }
    });
  }
}

// Convert map back to array
const result = Array.from(taskMap.values());
console.log(result);
