export function useWait(timeout: number = 1200) {
  return new Promise(resolve => setTimeout(resolve, timeout))
}
