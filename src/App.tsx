import "./App.css";
import Home from "./pages/Home";
import { ItemProvider } from "./context/ItemContext";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
      <ItemProvider>
        <Home />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar
          theme="colored"
        />
      </ItemProvider>
    </div>
  );
}

export default App;
