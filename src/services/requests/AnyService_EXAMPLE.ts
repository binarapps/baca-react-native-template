//THIS IS EXAMPLE REQUEST
import { TodoList } from '@baca/types/todos'

import { apiClient } from '../api'

export const getData = async () => {
  return apiClient.get<TodoList, TodoList>(`/todos`)
}
