import { RootStateT } from '../types/RootState'
import { BaseVideoT } from '../types/Video'

export function selectFavourites(state: RootStateT): BaseVideoT['id'][] {
  return state.favourites.favourites
}
