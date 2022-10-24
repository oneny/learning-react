import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Home,
  About,
  Events,
  Products,
  Contact,
  Whoops404,
  Services,
  History,
  Location,
} from "./components/pages.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />}>
          <Route path="services" element={<Services />} />

          <Route path="history" element={<History />} />
          <Route path="location" element={<Location />} />
        </Route>
        <Route path="events" element={<Events />} />
        <Route path="products" element={<Products />} />
        <Route path="contact" element={<Contact />} />
        
        <Route path="*" element={<Whoops404 />} />
      </Routes>
    </Router>
  );
}

export default App;
