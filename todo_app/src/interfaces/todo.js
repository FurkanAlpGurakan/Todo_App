export const createTodo = (text, priority = 'medium', deadline = null, category = 'Genel') => ({
  id: Date.now(),
  text,
  completed: false,
  priority,
  deadline,
  category,
  createdAt: new Date().toISOString(),
})
