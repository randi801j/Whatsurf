import React, {useState} from 'react';
import{BrowserRouter,Routes,Route,Link} from 'react-router-dom'
// import './App.css';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Login from './components/Login'
import EditBreak from './components/Edit';
function App() {

    const [breakList, setBreakList] = useState([]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Register/>}/>
          <Route path='/dashboard'element={<Dashboard breakList={breakList} setBreakList={setBreakList}/>}/>
          <Route path='/login' element= {<Login/>}/>
          <Route path='/edit' element= {<Edit/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
