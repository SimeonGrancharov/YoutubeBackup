import { RootStateT } from '../types/RootState'

export function selectPagination(state: RootStateT) {
  return state.search.pagination
}

export function selectSearchResults(state: RootStateT) {
  return state.search.results
}
