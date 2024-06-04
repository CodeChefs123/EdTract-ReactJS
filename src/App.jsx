import { Route, Routes } from "react-router-dom";
import { HomeRoutes } from "./routes/HomeRoutes";
function App() {
  return (
    <Routes>
      <Route path="/*" element={<HomeRoutes />} />
    </Routes>
  );
}

export default App;
