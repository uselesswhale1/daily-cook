export function debounce(fn: Function, timeout: number) {
  let timer: any;
  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), timeout);
  };
}
export default debounce;
