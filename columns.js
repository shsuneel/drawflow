const tasks = [
  { task: 1, connectedTo: [2] },
  { task: 2, connectedTo: [3, 4] },
  { task: 3, connectedTo: [5] },
  { task: 4, connectedTo: [5] },
  { task: 5, connectedTo: [6] },
  { task: 6, connectedTo: [] }
];

// Create a map for quick lookup
const taskMap = new Map();
tasks.forEach(t => taskMap.set(t.task, { ...t, column: null }));

// Recursive function to assign column
function assignColumn(taskId, column) {
  const task = taskMap.get(taskId);
  if (task.column === null || column > task.column) {
    task.column = column;
    task.connectedTo.forEach(nextId => assignColumn(nextId, column + 1));
  }
}

// Start from the root task (assumed to be task 1)
assignColumn(1, 1);

// Convert map back to array
const result = Array.from(taskMap.values());
console.log(result);
