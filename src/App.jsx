
import GithubUsernameInput from "./components/InputUsername";
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GitHubCard from "./components/GithubCard";

function App() {
  return (
    <div className=" bg-gradient-to-br from-black via-gray-800 to-gray-900 pt-3">

    <Router>
      <Routes>
        <Route path="/" element={<GithubUsernameInput />} />
        <Route path="/github-card" element={<GitHubCard />} />
      </Routes>
    </Router>
   </div>
  )
}

export default App
