import React, {useState} from 'react';
import{BrowserRouter,Routes,Route,Link} from 'react-router-dom'
// import './App.css';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Login from './components/Login'
import EditBreak from './components/Edit';
import BreakForm from './components/BreakForm';
import DisplayBreak from './components/DisplayBreak';
function App() {

    const [breakList, setBreakList] = useState([]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Register/>}/>
          <Route path='/dashboard'element={<Dashboard breakList={breakList} setBreakList={setBreakList}/>}/>
          <Route path='/login' element= {<Login/>}/>
          <Route path='/edit' element= {<EditBreak/>}/>
          <Route path='/createBreak' element= {<BreakForm/>}/>
          <Route path='/break/:id' element= {<DisplayBreak/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
