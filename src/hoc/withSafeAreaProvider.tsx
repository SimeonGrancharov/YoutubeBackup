import { SafeAreaProvider } from 'react-native-safe-area-context'

export function withSafeAreaProvider(
  C: React.ComponentType
): () => JSX.Element {
  return () => {
    return (
      <SafeAreaProvider>
        <C />
      </SafeAreaProvider>
    )
  }
}
