import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(16);
  const [numberAllowed, setNumberAllowed] = useState(true);
  const [charAllowed, setCharAllowed] = useState(true);
  const [uppercaseAllowed, setuppercaseAllowed] = useState(false);
  const [lowercaseAllowed, setlowercaseAllowed] = useState(true);
  const [password, setPassword] = useState("");
  const [animatedPassword, setAnimatedPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "";

    if (uppercaseAllowed) str += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lowercaseAllowed) str += "abcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_?<>;`";

    if (str.length === 0) {
      setPassword("Please enable at least one option!");
      return;
    }

    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char); 
    }

    console.log("Generated password:", pass);
    setPassword(pass); 
    setAnimatedPassword(""); 
  }, [length, numberAllowed, charAllowed, uppercaseAllowed, lowercaseAllowed]);

  const animatePassword = useCallback(() => {
    if (!password) return;
  
    const pass = password; 
    setAnimatedPassword(""); 
  
    let currentIndex = 0;
  
    const animate = () => {
      if (currentIndex <= pass.length) {
        const currentChar = pass[currentIndex] || ""; 
        console.log(`Appending: ${currentChar} at index ${currentIndex}`);
        setAnimatedPassword((prev) => prev + currentChar); 
        currentIndex++;
        setTimeout(animate, 100); 
      }
    };
  
    animate();
  }, [password]);
  
  useEffect(() => {
    if (password) animatePassword();
  }, [password, animatePassword]);

  const copyPasswordToClipboard = useCallback(() => {
    if (passwordRef.current) {
      passwordRef.current.select();
      passwordRef.current.setSelectionRange(0, 32);
      window.navigator.clipboard.writeText(password);

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, uppercaseAllowed, lowercaseAllowed, passwordGenerator]);

  return (
      <div
        className="min-h-screen p-2 flex items-center justify-center bg-cover bg-center "
        style={{
          backgroundImage: "url('bcimage.jpg')", 
          animation: "gradientBG 15s ease infinite",
        }}
      >
        <div
          className="fade-in-bounce w-full max-w-md mx-auto shadow-lg rounded-lg p-6 "
          style={{
            transition: "opacity 0.3s ease-in-out",
            opacity: "0.95",
            animation: "pop-in 0.5s ease-in-out",
          }}
        >
          <h1
            className="text-center text-3xl sm:text-4xl font-bold mb-6 text-blue-400"
            style={{
              animation: "fadeInSlideDown 1.2s ease forwards",
            }}
          >
            Password Generator
          </h1>
  
          <div className="flex items-center bg-gray-900 rounded-lg shadow-md mb-6 password-container">
            <input
              type="text"
              value={animatedPassword}
              readOnly
              ref={passwordRef}
              className="w-full px-4 py-2 text-lg bg-transparent outline-none text-blue-300 placeholder-gray-400 glowing-input"
              placeholder="Your password"
            />
            
            <button
              onClick={copyPasswordToClipboard}
              className={`flex items-center bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-2 px-4 rounded-r-lg space-x-2 ${copied ? "animate-bounce" : ""
                }`}
            >
              <span className="material-icons">content_copy</span>
              {copied && (
                <span className="ml-2 text-sm text-green-300">Copied!</span>
              )}
            </button>
          </div>
  
    
  
        <div className="mb-6">
          <label htmlFor="length" className="block text-sm font-medium mb-2 text-blue-200">
            Password Length:
          </label>
          <div className="flex items-center space-x-4">
            <input
              id="length"
              type="range"
              min={6}
              max={32}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full cursor-pointer"
            />
            <input
              type="number"
              min={6}
              max={32}
              value={length}
              onChange={(e) => {
                const value = Number(e.target.value);
                if (value >= 6 && value <= 32) setLength(value);
              }}
              className="w-16 px-2 py-1 text-center bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded border border-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
        </div>


        <div className="space-y-6">
          <div className="flex justify-between items-center space-x-4 group">
            <label
              htmlFor="numbers"
              className="text-lg font-medium text-blue-200 transition-colors duration-300 group-hover:text-white"
            >
              Include Numbers
            </label>
            <input
              id="numbers"
              type="checkbox"
              checked={numberAllowed}
              onChange={() => setNumberAllowed((prev) => !prev)}
              className="h-5 w-5 text-blue-500 focus:ring-0 rounded border-gray-500 transition-transform transform group-hover:scale-110 checked:scale-125"
            />
          </div>

          <div className="flex justify-between items-center space-x-4 group">
            <label
              htmlFor="characters"
              className="text-lg font-medium text-blue-200 transition-colors duration-300 group-hover:text-white"
            >
              Include Special Characters
            </label>
            <input
              id="characters"
              type="checkbox"
              checked={charAllowed}
              onChange={() => setCharAllowed((prev) => !prev)}
              className="h-5 w-5 text-blue-500 focus:ring-0 rounded border-gray-500 transition-transform transform group-hover:scale-110 checked:scale-125"
            />
          </div>

          <div className="flex items-center justify-between space-x-4 group">
            <label
              htmlFor="uppercase"
              className="text-lg font-medium text-blue-200 transition-colors duration-300 group-hover:text-white"
            >
              Include Uppercase Letters
            </label>
            <input
              id="uppercase"
              type="checkbox"
              checked={uppercaseAllowed}
              onChange={() => setuppercaseAllowed((prev) => !prev)}
              className="h-5 w-5 text-blue-500 focus:ring-0 rounded border-gray-500 transition-transform transform group-hover:scale-110 checked:scale-125"
            />
            </div>

          <div className="flex justify-between items-center space-x-4 group">
            <label
              htmlFor="lowercase"
              className="text-lg font-medium text-blue-200 transition-colors duration-300 group-hover:text-white"
            >
              Include Lowercase Letters
            </label>
            <input
              id="lowercase"
              type="checkbox"
              checked={lowercaseAllowed}
              onChange={() => setlowercaseAllowed((prev) => !prev)}
              className="h-5 w-5 text-blue-500 focus:ring-0 rounded border-gray-500 transition-transform transform group-hover:scale-110 checked:scale-125"
            />

          </div>
        </div>
        
        <button
          onClick={passwordGenerator}
          className="button-hover w-full mt-6 py-2 text-lg font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg transition glow"
        >
          Generate Password
        </button>
      </div>
    </div>
  );
}

export default App;
