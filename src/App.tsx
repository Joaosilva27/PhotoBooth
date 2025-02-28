import { useState, useRef, useCallback } from "react";
import "./App.css";
import Webcam from "react-webcam";
import GithubIcon from "./assets/icons/githubIcon.png";
import html2canvas from "html2canvas"; // Import html2canvas

function App() {
  const webcamRef = useRef<Webcam>(null);
  const captureRef = useRef<HTMLDivElement>(null); // Reference for the div to be captured

  const [imgSrcOne, setImgSrcOne] = useState<string | null>(null);
  const [imgSrcTwo, setImgSrcTwo] = useState<string | null>(null);
  const [imgSrcThree, setImgSrcThree] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [numberCountdown, setNumberCountdown] = useState<number>(0);

  // utility function for delaying
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const capture = useCallback(() => {
    setImgSrcOne(null);
    setImgSrcTwo(null);
    setImgSrcThree(null);
    setIsCapturing(true);

    const numberCountdown = async () => {
      await delay(1500);
      setNumberCountdown(3);
      await delay(1500);
      setNumberCountdown(2);
      await delay(1500);
      setNumberCountdown(1);
      await delay(1500);
      setNumberCountdown(0);
    };

    const captureSequence = async () => {
      if (webcamRef.current) {
        try {
          await numberCountdown();
          // capture first image
          const imageSrcOne = webcamRef.current.getScreenshot();
          setImgSrcOne(imageSrcOne);
          console.log("First image captured:", imageSrcOne);

          // wait for 5 seconds before capturing the second image

          await numberCountdown();
          await delay(1500);

          // capture second image after the delay
          const imageSrcTwo = webcamRef.current.getScreenshot();
          setImgSrcTwo(imageSrcTwo);
          console.log("Second image captured:", imageSrcTwo);

          await numberCountdown();
          await delay(1500);
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

  // Save the div containing all the images as a PNG file
  const saveImagesAsFile = () => {
    if (captureRef.current) {
      html2canvas(captureRef.current, {
        // This is where we can modify the captured content before rendering it to the canvas
        onclone: (document) => {
          // Apply object-contain style to the parent div and images inside the captureRef
          const images = document.querySelectorAll("img");
          images.forEach((img) => {
            img.style.objectFit = "contain"; // Force object-contain on the image
            img.style.maxWidth = "100%"; // Ensure the image does not exceed container width
            img.style.maxHeight = "100%"; // Ensure the image does not exceed container height
          });
        },
      }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = imgData;
        link.download = "captured-images.png";
        link.click();
      });
    }
  };

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
        <div className="relative flex items-center flex-col overflow-hidden transition-all duration-300 h-fit">
          <Webcam
            ref={webcamRef}
            height={400}
            width={600}
            className="object-cover border-gray-700 rounded-xl mb-2"
          />

          {numberCountdown != 0 && numberCountdown}
          <div className="flex gap-4">
            <button
              onClick={() => (isCapturing ? null : capture())}
              disabled={isCapturing}
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

            <button
              onClick={saveImagesAsFile} // Save images as file
              className="px-6 py-2.5 bg-gray-800 rounded-lg text-gray-300 hover:text-gray-100 transition-colors duration-200 flex items-center gap-2 border border-gray-700 hover:border-gray-600"
            >
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

        <div
          ref={captureRef}
          className="flex flex-col justify-center items-center p-4"
        >
          {imgSrcOne && (
            <div
              className="m-4 flex justify-center items-center"
              style={{
                maxWidth: "300px",
                maxHeight: "300px",
              }}
            >
              <img
                src={imgSrcOne}
                className="object-contain"
                alt="Captured Image 1"
                style={{
                  objectFit: "contain",
                  maxWidth: "100%",
                  maxHeight: "100%",
                }}
              />
            </div>
          )}
          {imgSrcTwo && (
            <div
              className="m-4 flex justify-center items-center"
              style={{
                maxWidth: "300px",
                maxHeight: "300px",
              }}
            >
              <img
                src={imgSrcTwo}
                className="object-contain"
                alt="Captured Image 2"
                style={{
                  objectFit: "contain",
                  maxWidth: "100%",
                  maxHeight: "100%",
                }}
              />
            </div>
          )}
          {imgSrcThree && (
            <div
              className="m-4 flex justify-center items-center"
              style={{
                maxWidth: "300px",
                maxHeight: "300px",
              }}
            >
              <img
                src={imgSrcThree}
                className="object-contain"
                alt="Captured Image 3"
                style={{
                  objectFit: "contain",
                  maxWidth: "100%",
                  maxHeight: "100%",
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
