import logo from './logo.svg';
import './App.css';
import Navigation from './components/Navigation'
import SimpleMap from './components/SimpleMap'
import { Container } from 'react-bootstrap';
import Signup from './components/Signup';
import { AuthProvider } from './contexts/AuthContext';
function App() {
  return (
     <AuthProvider>
   <Signup></Signup>
   </AuthProvider>

   //  <div className="App">
   //    <Navigation></Navigation>
   //    <SimpleMap></SimpleMap>
   //  </div>
  );
}

export default App;
