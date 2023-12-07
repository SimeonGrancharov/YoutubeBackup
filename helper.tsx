// ./jest/helper.jsx
import React from 'react'
import { render as rtlRender } from '@testing-library/react-native'
import { Provider } from 'react-redux'

// Overriding the render method
function render(
  ui: any,
  { store = {}, renderOptions }: { store: any; renderOptions: any } = {}
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from '@testing-library/react-native'
// override render method
export { render }
