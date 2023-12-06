import { useCallback, useRef } from 'react'
import { useDispatch } from 'react-redux'

export function useReduxAction(
  action: (...args: any) => {
    type: string
    payload: any
  }
) {
  const actionCreator = useRef(action)
  const dispatch = useDispatch()

  actionCreator.current = action

  return useCallback((...args: any) => {
    dispatch(actionCreator.current(...args))
  }, [])
}
