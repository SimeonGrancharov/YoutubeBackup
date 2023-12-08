import { Provider } from 'react-redux'
import { store } from '../stores/store'

export function withRedux(Component: React.ComponentType): () => JSX.Element {
  return () => {
    return (
      <Provider store={store}>
        <Component />
      </Provider>
    )
  }
}
