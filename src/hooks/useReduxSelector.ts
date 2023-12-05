import { useSelector } from 'react-redux'
import { RootStateT } from '../types/RootState'

export function useReduxSelector<T>(selector: (state: RootStateT) => T): T {
  return useSelector(selector)
}
