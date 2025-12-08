import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import ErrorPage from "../Pages/ErrorPage";
import Login from "../Comoponent/Login";
import Signup from "../Comoponent/Signup";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../Layout/DashboardLayout";
import AllSubscribers from "../Comoponent/Dashboard/pages/admin/AllSubscribers";
import AllTrainers from "../Comoponent/Dashboard/pages/admin/AllTrainers";
import AppliedTrainer from "../Comoponent/Dashboard/pages/admin/AppliedTrainer";
import ManageSlots from "../Comoponent/Dashboard/pages/trainer/ManageSlots";
import ActivityLog from "../Comoponent/Dashboard/pages/member/ActivityLog";
import Profile from "../Comoponent/Dashboard/pages/member/Profile";
import AddNewSlot from "../Comoponent/Dashboard/pages/trainer/AddNewSlot";
import BookedTrainer from "../Comoponent/Dashboard/pages/member/BookedTrainer";
 
import Home from "../Pages/Home/Home";
import MyClients from "../Comoponent/Dashboard/pages/trainer/MyClients";
import EditSlot from "../Comoponent/Dashboard/pages/trainer/EditSlot";
import Trainers from "../Comoponent/Nav/Trainers";
import Classes from "../Comoponent/Nav/Classes";
import AddClass from "../Comoponent/Dashboard/pages/admin/AddClass";
import AddForum from "../Comoponent/Dashboard/pages/admin/AddForum";
import Balance from "../Comoponent/Dashboard/pages/admin/Balance";
import TrainerDetails from "../Comoponent/Dashboard/pages/trainer/TrainerDetails";
import BeATrainer from "../Comoponent/Dashboard/pages/trainer/BeATrainer";
import BookingTrainer from "../Comoponent/Dashboard/pages/trainer/BookingTrainer";
import Payment from "../Comoponent/Dashboard/payment/Payment";
import AppTrainerDetails from "../Comoponent/Dashboard/pages/admin/AppTrainerDetails";
import Community from "../Comoponent/Nav/Community";
import ForumDEtails from "../Pages/Home/ForumDEtails";
import Statistics from "../Comoponent/Dashboard/pages/common/Statistics";
 
 


export const router = createBrowserRouter([
  {
    path: "/",
    element:<MainLayout/> ,
    errorElement:<ErrorPage/>,
    children: [
       {
         path: "/",
         index: true,
        element: <Home />,
       } ,

       {
    path: "trainers",
    element:<Trainers/>
  },
  {
    path: "be-a-trainer",
    element:<BeATrainer/>,
  },
  {
   path: 'classes',
   element: <Classes/>,
  },
   {
   path: 'community',
   element: <Community/>,
  },
  {
   path: 'forums/:id',
   element: <ForumDEtails/>,
  },
  {
   path: 'payment',
   element: <Payment/>,
  },
  {
   path: 'trainer-details/:id',
   element: <TrainerDetails/>,
  },
  {
   path: 'booking-trainer/:id',
   element: <BookingTrainer />,
  },

    ]
  },
  {path: '/login', element: <Login />},
  { path: '/signup', element: <Signup /> },
  
  {
    path: "/dashboard",
    element:( <PrivateRoute>
      <DashboardLayout/>
    </PrivateRoute>

    ),
    children: [
      {
       index: true,
       element: (
        <PrivateRoute>
          <Statistics/>
        </PrivateRoute>

       ),
      },
        {
        path: 'all-subscribers',
        element: (
          <PrivateRoute allowedRole="admin">
            <AllSubscribers />
          </PrivateRoute>
        ),
      },
      {
        path: 'all-trainers',
        element: (
          <PrivateRoute allowedRole="admin">
            <AllTrainers />
          </PrivateRoute>
        ),
      },
      {
        path: 'applied-trainers',
        element: (
          <PrivateRoute allowedRole="admin">
            <AppliedTrainer />
          </PrivateRoute>
        ),
      },
       {
        path: 'add-class',
        element: (
          <PrivateRoute allowedRole="admin">
            <AddClass />
          </PrivateRoute>
        ),
      },
       {
        path: 'appTrainer-details/:id',
        element: (
          <PrivateRoute allowedRole="admin">
            <AppTrainerDetails />
          </PrivateRoute>
        ),
      },
      {
        path: 'add-forum',
        element: (
          <PrivateRoute allowedRole="admin">
            <AddForum/>
          </PrivateRoute>
        ),
      },
      {
        path: 'balance',
        element: (
          <PrivateRoute allowedRole="admin">
            <Balance/>
          </PrivateRoute>
        ),
      },
      {
        path: 'payment/:id',
        element: <PrivateRoute><Payment/> </PrivateRoute>
      },
        

      // ✅ Trainer routes
      {
        path: 'manage-slots',
        element: (
          <PrivateRoute allowedRole="trainer">
            <ManageSlots />
          </PrivateRoute>
        ),
      },
      {
        path: 'add-slot',
        element: (
          <PrivateRoute allowedRole="trainer">
            <AddNewSlot />
          </PrivateRoute>
        ),
      },
      {
        path: 'edit-slot/:id',
        loader:({params}) => fetch(`${import.meta.env.VITE_API_URL}/slots/${params.id}`),
        element: (
          <PrivateRoute allowedRole="trainer">
            <EditSlot />
          </PrivateRoute>
        ),
      },
       {
        path: 'my-clients',
        element: (
          <PrivateRoute allowedRole="trainer">
            <MyClients />
          </PrivateRoute>
        ),
      },

      // ✅ Member routes
      {
        path: 'activity-log',
        element: (
          <PrivateRoute>
            <ActivityLog />
          </PrivateRoute>
        ),
      },
      {
        path: 'booked-trainer',
        element: (
          <PrivateRoute allowedRole="member">
            <BookedTrainer/>
          </PrivateRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
