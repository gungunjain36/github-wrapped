
import GithubUsernameInput from "./components/InputUsername";
import './App.css'

function App() {
  return (
    <div className=" bg-gradient-to-br from-black via-gray-800 to-gray-900 pt-3">
    <h1 className="text-5xl text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 font-serif m-4 text-center animate-pulse drop-shadow-lg transition-transform duration-500 ease-in-out transform hover:scale-110">
    Ready to see your 2024 Github Wrapped Up?
    </h1>
  
    <GithubUsernameInput />
   </div>
  )
}

export default App
