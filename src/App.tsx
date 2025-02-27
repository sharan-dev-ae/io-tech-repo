import './App.css';
import Home from './pages/Home';
import { ItemProvider } from './context/ItemContext';

function App() {
  return (
    <div className="App">
      <ItemProvider>
       <Home />
       </ItemProvider>
    </div>
  );
}

export default App;
