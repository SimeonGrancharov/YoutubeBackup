import { SafeAreaProvider } from 'react-native-safe-area-context'

export function withSafeAreaProvider(
  Component: React.ComponentType
): () => JSX.Element {
  return () => {
    return (
      <SafeAreaProvider>
        <Component />
      </SafeAreaProvider>
    )
  }
}
