import { useCallback, useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [addNums, setAddNums] = useState(false);
  const [addChars, setAddChars] = useState(false);

  const passRef = useRef(null);

  const passwordGenerator = useCallback(
    () => {
      let pass = ""
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

      if(addNums) str += "0123456789"
      if(addChars) str += ".,/;:><][{}()-_|?@#$%^&+`~"

      for(let i=0; i<length; i++) {
        let charIdx = Math.floor(Math.random() * str.length)
        pass += str.charAt(charIdx)
      }
      setPassword(pass)
    }
    , [length,addNums,addChars,setPassword]
  )

  const notify = () => {toast.success('Copied')}

  const copyPass = useCallback(
    () => {
      passRef.current?.select()
      window.navigator.clipboard.writeText(password)
    },
    [password]
  )

  useEffect(() => {passwordGenerator()},[length,addNums,addChars,setPassword])

  return (
    <>
      <main className="w-full h-screen bg-slate-700 flex justify-center items-center">
        <div className="bg-white rounded-3xl md:w-3/6 h-3/6 w-4/6 flex justify-start items-center flex-col md:p-10">
          <h1 className="font-mono md:text-6xl text-4xl font-semibold text-blue-600 p-3 text-center">
            Password Generator
          </h1>
          <input
            className="text-center border-2 border-slate-700 md:w-60 h-10 rounded-2xl my-4"
            type="text"
            placeholder="Password"
            value={password}
            ref={passRef}
            readOnly
          />
          <div className="flex justify-center items-center gap-3 mt-4 text-xl">
            <input type="range" id="passlength" name="passlength" min={8} max={25} onChange={(e) => {setLength(e.target.value)}}/>
            <label htmlFor="">{length}</label>
          </div>
          <div className="flex justify-center items-center gap-3 mt-4 md:text-xl text-3xl">
            <input type="checkbox" className="rounded  text-pink-500 md:w-4 md:h-4 w-5 h-5" 
            onChange={() => setAddNums(
              prev => !prev
            )}/>
            <label htmlFor="">Numbers</label>
          </div>
          <div className="flex justify-center items-center gap-3 mb-4 md:text-xl text-3xl">
            <input type="checkbox" className="rounded text-pink-500 md:w-4 md:h-4 w-5 h-5" 
            onChange={() => setAddChars(
              prev => !prev
            )}/>
            <label htmlFor="">Characters</label>
          </div>
          <button
          className="md:text-xl text-lg font-semibold px-5 py-2 bg-orange-300 hover:bg-yellow-500 hover:border-2 hover:border-black rounded-xl animate-bounce shadow-inner mt-5"
          onClick={event => {
            copyPass();
            notify()}}>
            Copy Password
          </button>
          <ToastContainer />
        </div>
      </main>
    </>
  );
}

export default App;
