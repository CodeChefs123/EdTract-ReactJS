import React from "react";
import { Route, Routes } from "react-router-dom";
import { HomeRoutes } from "./routes/HomeRoutes";
import Alert from "./components/Alert";
function App() {
  return (
    <>
      <Alert />
      <Routes>
        <Route path="/*" element={<HomeRoutes />} />
      </Routes>
    </>
  );
}

export default App;
