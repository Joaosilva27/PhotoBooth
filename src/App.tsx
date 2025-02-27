import { useState, useRef, useCallback } from "react";
import "./App.css";
import Webcam from "react-webcam";
import GithubIcon from "./assets/icons/githubIcon.png";

function App() {
  const webcamRef = useRef<Webcam>(null);

  const [imgSrcOne, setImgSrcOne] = useState<string | null>(null);
  const [imgSrcTwo, setImgSrcTwo] = useState<string | null>(null);
  const [imgSrcThree, setImgSrcThree] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);

  // utility function for delaying
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const capture = useCallback(() => {
    setImgSrcOne(null);
    setImgSrcTwo(null);
    setImgSrcThree(null);
    setIsCapturing(true);
    const captureSequence = async () => {
      if (webcamRef.current) {
        try {
          // capture first image
          const imageSrcOne = webcamRef.current.getScreenshot();
          setImgSrcOne(imageSrcOne);
          console.log("First image captured:", imageSrcOne);

          // wait for 5 seconds before capturing the second image
          await delay(5000);

          // capture second image after the delay
          const imageSrcTwo = webcamRef.current.getScreenshot();
          setImgSrcTwo(imageSrcTwo);
          console.log("Second image captured:", imageSrcTwo);

          await delay(5000);
          // capture third image after the delay
          const imageSrcThree = webcamRef.current.getScreenshot();
          setImgSrcThree(imageSrcThree);
          console.log("Third image captured:", imageSrcThree);
        } catch (err) {
          console.log("Error capturing image:", err);
        }
      }
      setIsCapturing(false);
    };

    captureSequence();
  }, [webcamRef]);

  return (
    <div className="min-h-screen flex flex-col items-center p-4 space-y-8">
      <h1 className="text-3xl font-bold text-gray-100 mb-4 relative group">
        <span className="relative z-10">PhotoBooth</span>
        <div className="flex justify-center items-center mt-1">
          <p className="text-sm text-gray-400">
            Made by joaosilva7875@gmail.com
          </p>
          <a target="_blank" href="https://github.com/Joaosilva27">
            <img src={GithubIcon} className="w-4 h-4 ml-1.5 animate-bounce" />
          </a>
        </div>
      </h1>

      <div className="flex flex-row flex-wrap justify-center items-center">
        <div className="relative border-2 border-gray-700 rounded-xl overflow-hidden transition-all duration-300 hover:border-gray-600 hover:shadow-lg hover:shadow-gray-800/50 h-fit">
          <Webcam
            ref={webcamRef}
            height={400}
            width={600}
            className="object-cover"
          />
        </div>

        <div>
          {imgSrcOne && (
            <div className="m-8">
              <img src={imgSrcOne} className="h-40 w-40 object-cover m-4" />
              {imgSrcTwo && (
                <img src={imgSrcTwo} className="h-40 w-40 object-cover m-4" />
              )}
              {imgSrcThree && (
                <img src={imgSrcThree} className="h-40 w-40 object-cover m-4" />
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-4">
        {isCapturing == false ? (
          <button
            onClick={capture}
            className="px-6 py-2.5 bg-gray-800 rounded-lg text-gray-100 hover:bg-gray-700 transition-colors duration-200 flex items-center gap-2 border border-gray-700 hover:border-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-blue-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                clipRule="evenodd"
              />
            </svg>
            Capture
          </button>
        ) : null}

        <button className="px-6 py-2.5 bg-gray-800 rounded-lg text-gray-300 hover:text-gray-100 transition-colors duration-200 flex items-center gap-2 border border-gray-700 hover:border-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-green-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
          Save
        </button>
      </div>
    </div>
  );
}

export default App;
