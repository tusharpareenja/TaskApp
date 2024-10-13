const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const tasksDir = path.join(__dirname, 'tasks');

// Create the tasks directory if not exists
if (!fs.existsSync(tasksDir)) {
  fs.mkdirSync(tasksDir);
}

// Get all tasks
app.get('/tasks', (req, res) => {
  fs.readdir(tasksDir, (err, files) => {
    if (err) return res.status(500).send('Error reading tasks');

    const tasks = files.map((file) => {
      const taskContent = fs.readFileSync(path.join(tasksDir, file), 'utf-8');
      return JSON.parse(taskContent);
    });

    res.json({ tasks });
  });
});

// Add a new task
app.post('/tasks', (req, res) => {
  const { title, details } = req.body;

  if (!title || !details) {
    return res.status(400).send('Title and details are required');
  }

  const taskId = `task_${Date.now()}.json`;
  const task = { title, details };

  // Save task to a new file
  fs.writeFile(path.join(tasksDir, taskId), JSON.stringify(task), (err) => {
    if (err) return res.status(500).send('Error saving task');
    res.json({ task });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
