import { Routes, Route } from 'react-router-dom';
import DashLayout from './components/DashLayout';
import Layout from './components/Layout';
import Login from './pages/Login';
import NoteList from './pages/NoteList';
import Public from './pages/Public';
import UsersList from './pages/UsersList';
import Welcome from './pages/Welcome';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Public />} />
        <Route path='login' element={<Login />} />

        <Route path='dash' element={<DashLayout />}>
          <Route index element={<Welcome />} />

          <Route path='notes'>
            <Route index element={<NoteList />} />
          </Route>

          <Route path='users'>
            <Route index element={<UsersList />} />
          </Route>
        </Route> {/* End Dash */}
      </Route>
    </Routes>
  );
}

export default App;
