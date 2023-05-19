import{BrowserRouter,Routes,Route,Link} from 'react-router-dom'
import './App.css';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Register/>}/>
          <Route path='/dashboard'element={<Dashboard/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
