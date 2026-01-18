import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
// import Farmer from "./pages/Farmer";
// import Buyer from "./pages/Buyer";
// import Admin from "./pages/Admin";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route  path="/login" element={<Auth />} />
        {/* <Route path="/farmer" element={<Farmer />} />
        <Route path="/buyer" element={<Buyer />} />
        <Route path="/admin" element={<Admin />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
