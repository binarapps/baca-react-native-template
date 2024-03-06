import { alert } from '@baca/utils'
import { useEffect } from 'react'

export const useTimestamp = (): void => {
  useEffect(() => {
    fetch('/api/timestamp')
      .then((response) => response.json())
      .then((data) => {
        alert(
          'Warning',
          `This is just an example response form miragejs \n\n ${JSON.stringify(data)}`
        )
      })
  }, [])
}
