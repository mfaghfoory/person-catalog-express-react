import "./App.css";
import PersonPage from "./pages/personManagement/PersonPage";

function App() {
  return (
    <>
      <div className="header">
        <p>Sample ui with react</p>
      </div>
      <div className="gridData">
        <PersonPage></PersonPage>
      </div>
    </>
  );
}

export default App;
