import { useCallback, useRef } from 'react'
import { useDispatch } from 'react-redux'

export function useReduxAction(
  action: (...args: any) => {
    type: string
    payload: any
  }
): (...args: any) => void {
  const actionCreator = useRef(action)
  const dispatch = useDispatch()

  // For referential stability
  actionCreator.current = action

  return useCallback((...args: any) => {
    dispatch(actionCreator.current(...args))
  }, [])
}
