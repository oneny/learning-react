import Register from "./components/Register";
import Login from "./components/Login";
import Layout from "./components/Layout";
import LinkPage from "./components/LinkPage";
import Unauthroized from "./components/Unauthorized";
import Home from "./components/Home";
import Editor from "./components/Editor";
import Admin from "./components/Admin";
import Lounge from "./components/Lounge";
import Missing from "./components/Missing";
import ROLES from "./utils/ROLES";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="linkpage" element={<LinkPage />} />
          <Route path="unauthorized" element={<Unauthroized />} />
  
          {/* we want to protect these routes */}
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />} >
            <Route path="/" element={<Home />} />
          </Route>
  
          <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />} >
            <Route path="/editor" element={<Editor />} />
          </Route>
  
          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />} >
            <Route path="/admin" element={<Admin />} />
          </Route>
  
          <Route element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />} >
            <Route path="/lounge" element={<Lounge />} />
          </Route>
  
          {/* catch call */}
          <Route apth="*" element={<Missing />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
