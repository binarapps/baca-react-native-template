import { QueryKeys } from '@baca/enums'
import { getData } from '@baca/services'
import { TodoList } from '@baca/types/todos'
import { useQuery } from '@tanstack/react-query'

export const useGetCity_EXAMPLE = () => {
  const {
    data: dataList,
    status: dataStatus,
    refetch: refetchData,
    isFetchedAfterMount: isFetchedDataAfterMount,
  } = useQuery<TodoList>([QueryKeys.TODOS], getData)

  return { dataList, dataStatus, refetchData, isFetchedDataAfterMount }
}
