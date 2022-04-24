import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import './styles/app.css';

export default function App() {
  return (
    <div className='page_cont'>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' index element={<Home />} />
          {/* <Route path='blogs' element={<Blogs />} />
            <Route path='contact' element={<Contact />} />
            <Route path='*' element={<NoPage />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}
