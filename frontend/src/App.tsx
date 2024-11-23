
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Home from '@/pages/Home';
import Footer from '@/components/Footer';

function App() {

  return (
    <div className='font-parkinsans'>
      <Router>
        <Navbar />
        <main id="content">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  )
}

export default App
