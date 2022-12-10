import { Routes, Route } from 'react-router-dom';
import DashLayout from './components/dash/DashLayout';
import Layout from './components/Layout';
import EditUserForm from './components/users/EditUserForm';
import NewUserForm from './components/users/NewUserForm';
import Login from './pages/Login';
import NotesList from './pages/NotesList';
import Public from './pages/Public';
import UsersList from './pages/UsersList';
import Welcome from './pages/Welcome';
import Prefetch from './components/auth/Prefetch';
import NewNote from './pages/NewNote';
import EditNote from './pages/EditNote';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Public />} />
        <Route path='login' element={<Login />} />

        <Route element={<Prefetch />}>
          <Route path='dash' element={<DashLayout />}>
            <Route index element={<Welcome />} />

            <Route path='notes'>
              <Route index element={<NotesList />} />
              <Route path=':id' element={<EditNote />} />
              <Route path='new' element={<NewNote />} />
            </Route>

            <Route path='users'>
              <Route index element={<UsersList />} />
              <Route path=':id' element={<EditUserForm />} />
              <Route path='new' element={<NewUserForm />} />
            </Route>
          </Route>{' '}
          {/* End Dash */}
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
