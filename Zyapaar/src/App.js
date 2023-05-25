import Employee from "./compoenents/Employee";
import "./App.css";
import { Route, Routes } from "react-router";
import AddEditEmployee from "./compoenents/Employee/AddEditEmployee";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Employee />} />
        <Route path="/editemployee" element={<AddEditEmployee />} />
        <Route path="/addemployee" element={<AddEditEmployee />} />
      </Routes>
    </div>
  );
}

export default App;
