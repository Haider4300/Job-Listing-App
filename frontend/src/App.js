
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/ui/Navbar';
import HomePage from './pages/HomePage';
import EditJobPage from './components/jobs/EditJobPage';
import AddJobFormWrapper from './components/jobs/AddJobFormWrapper'; // <-- added this

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-job" element={<AddJobFormWrapper />} />
        <Route path="/edit-job/:id" element={<EditJobPage />} />
      </Routes>
    </Router>
  );
}

export default App;


/*import { BrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';

function App() {
  return (
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>
  );
}

export default App;*/