export function useStateToRender<T>(
  error: boolean,
  isLoading: boolean,
  data: T
): 'data' | 'loading' | 'error' | null {
  if (error) {
    return 'error'
  }

  if (data !== undefined) {
    return 'data'
  }

  if (isLoading) {
    return 'loading'
  }

  return null
}
