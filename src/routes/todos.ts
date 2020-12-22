import { Router } from 'express';
import { deleteTodo, getTodos, patchTodo, postTodo } from '../controllers/todos';

const router = Router();

router.post('/', postTodo);
router.get('/', getTodos);
router.patch('/:id', patchTodo);
router.delete('/:id', deleteTodo);

export default router;