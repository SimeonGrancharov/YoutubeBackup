type ColorT =
  | 'white'
  | 'grey'
  | 'positive'
  | 'text1'
  | 'text2'
  | 'negative'
  | 'accent'
  | 'lightGrey'

export const colors: Record<ColorT, string> = {
  white: 'white',
  grey: '#eee',
  positive: '#92BF5E',
  text1: '#2A2828',
  text2: '#7B7676',
  negative: '#F44336',
  accent: '#61B0EF',
  lightGrey: '#BDBDBD'
}
