import Register from "./component/Register";
import Login from "./component/Login";
import Layout from "./component/Layout";
import LinkPage from "./component/LinkPage";
import Unauthroized from "./component/Unauthorized";
import Home from "./component/Home";
import Editor from "./component/Editor";
import Admin from "./component/Admin";
import Lounge from "./component/Lounge";
import Missing from "./component/Missing";
import ROLES from "./utils/ROLES";

import { Routes, Route } from "react-router-dom";
import RequireAuth from "./component/RequireAuth";

function App() {
  return (
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
  );
}

export default App;
