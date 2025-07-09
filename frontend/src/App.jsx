import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/dashboard';
import Home from './components/home';
import Login from './components/login';
import UploadFile from './components/uploadFile';
import { UserProvider } from './components/userContext';

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/uploadFile" element={<UploadFile />} />
      </Routes>
    </UserProvider>
    
  );
}

export default App;
