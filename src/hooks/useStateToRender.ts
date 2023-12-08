export function useStateToRender<T>(
  error: boolean,
  isLoading: boolean,
  data: T
): 'data' | 'loading' | 'error' | null {
  if (error) {
    return 'error'
  }

  if (isLoading) {
    return 'loading'
  }

  if (data !== undefined) {
    return 'data'
  }

  return null
}
