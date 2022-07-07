import { useEffect } from "react";
import { render } from "react-dom";

const div = document.createElement("div");
document.body.append(div);

render(<App></App>, div);

function App() {
  useEffect(() => {
    console.log("mount");
    return () => {
      console.log("unmount");
    };
  }, []);
  return null;
}
