import './App.css';
import {Routes, Route} from 'react-router-dom'
import Task1 from './Task1/Task1';
import Task2 from './Task1/Task2';
import Task3 from './Task1/Task3';
function App() {
  return (
    <Routes>
      <Route path='/task1' element={<Task1></Task1>} ></Route>
      <Route path='/task2' element={<Task2></Task2>} ></Route>
      <Route path='/task3' element={<Task3></Task3>} ></Route>
    </Routes>
  );
}

export default App;
