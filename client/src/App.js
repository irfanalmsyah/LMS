import React from "react";
import "./style.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Logincomponents from "./components/Logincomponents";
import Usersettingcomponents from "./components/Usersettingcomponents";
import Userdetailcomponents from "./components/Userdetailcomponents";
import Coursedetailcomponents from "./components/Coursedetailcomponents";
import Logintest from "./components/Logintest";
import Ktmcomponents from "./components/Ktmcomponents";
import Languagecomponents from "./components/Languagecomponents";
import Apitest from "./components/Apitest";
import PrivateRoutes from "./utils/PrivateRoutes";
import Cookiejwt from "./utils/Cookiejwt";
import Cookieset from "./utils/Cookieset";
import Navbarcomponents from "./components/Navbarcomponents";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Logincomponents />} />
          <Route path ="/navbar" element={<Navbarcomponents />} />



          <Route element={<PrivateRoutes />}>
          <Route path="/usersetting" element={<Usersettingcomponents />} />
            <Route path="/userdetail" element={<Userdetailcomponents />} />
            <Route path="/coursedetail" element={<Coursedetailcomponents />} />
            <Route path="/ktm" element={<Ktmcomponents />} />
            <Route path="/language" element={<Languagecomponents />} />
          </Route>

          <Route path="/logintest" element={<Logintest />} />

          <Route path="/apitest" element={<Apitest />} />

          <Route path="/cookietest" element={<Cookiejwt />} />
          <Route path="/cookieset" element={<Cookieset />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
