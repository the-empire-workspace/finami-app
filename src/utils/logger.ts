export const debugLog = (...args: unknown[]): void => {
  if (typeof __DEV__ !== 'undefined' && __DEV__) {
    // eslint-disable-next-line no-console
    console.log(...args)
  }
}
