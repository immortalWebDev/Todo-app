import { authMiddleware } from '../../../lib/authMiddleware';
import dbConnect from '../../../lib/dbConnect';
import Todo from '../../../models/Todo';

async function handler(req, res) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      const todos = await Todo.find({ userId: req.user.id });
      res.status(200).json({ success: true, data: todos });
      break;

    case 'POST':
      const todo = await Todo.create({ ...req.body, userId: req.user.id });
      res.status(201).json({ success: true, data: todo });
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}

export default authMiddleware(handler);
