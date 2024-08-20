import connectToDatabase from "../../lib/mongodb";
import Todo from "../../models/Todo";

export default async function handler(req, res) {
  const { method, query } = req;

  await connectToDatabase();

  if (method === "GET") {
    try {
      const { completed } = query;

      let filter = {};
      if (completed === "true") {
        filter.completed = true;
      } else if (completed === "false") {
        filter.completed = false;
      }

      const todos = await Todo.find(filter);
      res.status(200).json({ success: true, data: todos });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  } else if (method === "POST") {
    try {
      const todo = await Todo.create(req.body);
      res.status(201).json({ success: true, data: todo });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  } else if (method === "PUT") {
    try {
      const { id } = req.query;
      const todo = await Todo.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!todo) {
        return res.status(404).json({ success: false });
      }
      res.status(200).json({ success: true, data: todo });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  } else if (method === "DELETE") {
    try {
      const { id } = req.query;
      const deletedTodo = await Todo.deleteOne({ _id: id });
      if (!deletedTodo) {
        return res.status(404).json({ success: false });
      }
      res.status(200).json({ success: true, data: {} });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  } else {
    res.status(400).json({ success: false });
  }
}
