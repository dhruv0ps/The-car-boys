import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LeadForm from './features/Leads/LeadForm';
import AddNewCarForm from './features/Cars/CarFrom';
import UserForm from './features/User/UserForm';
import Home from './layout/Home';
import ListOfLeads from './features/Leads/ListOfLeads';
import CarList from './features/Cars/CarView';
import UserTable from './features/User/ListUser';
import LoginPage from './features/User/Login';
import ProtectedRoute from './ProtectedRoute';
import LeadCategoryModal from './features/Leads/LeadCategoryModal';


// Define routes using createBrowserRouter
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute> {/* Wrap Home in ProtectedRoute */}
        <Home />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/leads/add",
        element: (
          <ProtectedRoute> {/* Wrap each child route in ProtectedRoute */}
            <LeadForm  />
          </ProtectedRoute>
        ),
      },
      {
        path: "/leads/add/:id",
        element: (
          <ProtectedRoute> {/* Wrap each child route in ProtectedRoute */}
            <LeadForm />
          </ProtectedRoute>
        ),
      },
      {
        path: "/leads/category",
        element: (
          <ProtectedRoute> {/* Wrap each child route in ProtectedRoute */}
            <LeadCategoryModal />
          </ProtectedRoute>
        ),
      },
      {
        path: "/inventory/add",
        element: (
          <ProtectedRoute>
            <AddNewCarForm />
          </ProtectedRoute>
        ),
      },
      {
        path: "/inventory/add/:id",
        element: (
          <ProtectedRoute>
            <AddNewCarForm />
          </ProtectedRoute>
        ),
      },
      {
        path: "/users/add",
        element: (
          <ProtectedRoute>
            <UserForm />
          </ProtectedRoute>
        ),
      },
      {
        path: "/leads/view",
        element: (
          <ProtectedRoute>
            <ListOfLeads />
          </ProtectedRoute>
        ),
      },
      {
        path: "/inventory/view",
        element: (
          <ProtectedRoute>
            <CarList />
          </ProtectedRoute>
        ),
      },

      {
        path: "/users/view",
        element: (
          <ProtectedRoute>
            <UserTable />
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        element: <div>Page Not Found</div>,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

// Main App component
function App() {
  return (
    <>
      {/* ToastContainer added here to make it available globally */}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
      <RouterProvider router={router} />
    </>
  );
}

export default App;