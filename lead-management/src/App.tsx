import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LeadForm from './features/Leads/LeadForm'
import AddNewCarForm from './features/Cars/CarFrom'
import UserForm from './features/User/UserForm';
import Home from './layout/Home';
import ListOfLeads from './features/Leads/ListOfLeads';
import CarList from './features/Cars/CarView';
import UserTable from './features/User/ListUser';
const handleSaveLead = (lead: any) => {
  console.log('Saved lead:', lead);
};


// Define routes using createBrowserRouter
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
    children: [
      {
        path: "/leads/add",
        element: <LeadForm onSave={handleSaveLead} />,
      },
      {
        path: "/inventory/add",
        element: <AddNewCarForm />,
      },
      {
        path: "/users/add",
        element: <UserForm />,
      },
      {
        path: "/leads/view",
        element: <ListOfLeads/>,
      },
      {
        path : "/inventory/view",
        element : <CarList/>,
      },
      {
        path : "/users/view",
        element : <UserTable/>
      },
      {
        path: "*",
        element: <div>Page Not Found</div>,
      },
    ],
  },
]);

// Main App component
function App() {
  return <RouterProvider router={router} />;
}

export default App;
