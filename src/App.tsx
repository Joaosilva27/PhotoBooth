import { useState } from "react";
import "./App.css";
import Webcam from "react-webcam";

function App() {
  return (
    <div>
      <div className="">
        <h1 className="text-3xl font-bold">PhotoBooth</h1>
        <div className="border-solid border-4 border-black rounded-lg">
          <Webcam height={600} width={600} />
        </div>
      </div>
    </div>
  );
}

export default App;
