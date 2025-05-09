// import { useEffect } from 'react';

// export function useTimer(callback: () => void, delay: number) {
//   useEffect(() => {
//     const id = setInterval(() => {
//       callback();
//     }, delay);
//     return () => {
//       console.log('clear')
//       clearInterval(id);
//     };
//   }, [callback, delay]);
// }