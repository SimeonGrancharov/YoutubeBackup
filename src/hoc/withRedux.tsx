import { Provider } from 'react-redux'
import { store } from '../stores/store'

export function withRedux(C: React.ComponentType): () => JSX.Element {
  return () => {
    return (
      <Provider store={store}>
        <C />
      </Provider>
    )
  }
}
