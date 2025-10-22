
  import { createRoot } from "react-dom/client";
  import App from "./App.tsx";
  import "./index.css";

  createRoot(document.getElementById("root")!).render(<App />);

  /// 여기 하단에 추가한 거임///
//   import { useSpring, animated } from '@react-spring/web'
//   import { useDrag } from '@use-gesture/react'

// function PullRelease() {
//   const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }))

//   // Set the drag hook and define component movement based on gesture data
//   const bind = useDrag(({ down, movement: [mx, my] }) => {
//     api.start({ x: down ? mx : 0, y: down ? my : 0, immediate: down })
//   })

//   // Bind it to a component
//   return <animated.div {...bind()} style={{ x, y }} />
// }