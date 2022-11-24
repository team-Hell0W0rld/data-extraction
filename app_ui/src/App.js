import logo from './logo.svg';
import './App.css';

import {Routes, Route} from 'react-router-dom'
import Editor from './pages/Editor/Editor';

function App() {
  return (
    <Routes>
      <Route path='/editor' element={<Editor />}/>
    </Routes>
  );
}

export default App;
