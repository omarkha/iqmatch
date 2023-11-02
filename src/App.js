import logo from "./logo.svg";
import "./App.css";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import AppPage from "./pages/AppPage";

function App() {
  return (
    <div className="App">
      <NavBar />
      <AppPage />
    </div>
  );
}

export default App;
