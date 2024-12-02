import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register.jsx';

function App() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Router>
        <Routes>
          <Route path="/" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;