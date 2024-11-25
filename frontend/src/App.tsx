
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Home from '@/pages/Home';
import Footer from '@/components/Footer';
import NotFound from '@/pages/NotFound';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {

  return (
    <main className='font-parkinsans'>
      <Router>
        <Routes>
          <Route path="/" element={<><Navbar /><Home /><Footer /></>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </main>
  )
}

export default App
