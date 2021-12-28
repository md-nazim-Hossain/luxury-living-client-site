import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header/Header/Header';
import Home from './components/Body/Home/Home/Home';
import Footer from './components/Footer/Footer/Footer';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import LogIn from './components/Register/LogIn/LogIn';
import CreateAccount from './components/Register/CreateAccount/CreateAccount';
import DashBoard from './components/Body/DashBoard/DashBoard/DashBoard';
import Review from './components/Body/DashBoard/Review/Review';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import AddService from './components/Body/DashBoard/AddService/AddService';
import MakeAdmin from './components/Body/DashBoard/MakeAdmin/MakeAdmin';
import ManageServices from './components/Body/DashBoard/ManageServices/ManageServices';
import AdminRoute from './components/Body/DashBoard/AdminRoute/AdminRoute';
import ExploreServices from './components/Body/Home/ExploreServices/ExploreServices';
import NotFound from './components/Body/NotFound/NotFound';
import BookingInfo from './components/Body/BookingInfo/BookingInfo';
import BookLists from './components/Body/DashBoard/BookLists/BookLists';
import useAuth from './hooks/useAuth';
import Booking from './components/Body/DashBoard/Booking/Booking';
import Payment from './components/Body/DashBoard/Payment/Payment';
import OrderLists from './components/Body/DashBoard/OrderLists/OrderLists';

function App() {

  const {admin} = useAuth();
  
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/login' element={<LogIn/>}/>
            <Route path='/register' element={<CreateAccount/>}/>
            <Route path='/payment/:id' element={<Payment/>}/>
            <Route path='/explore' element={
              <PrivateRoute>
                <ExploreServices/>
              </PrivateRoute>
            }/>
            <Route path='/addToCart/:id' element={
              <PrivateRoute>
                <BookingInfo/>
              </PrivateRoute>
            }/>
            <Route path='/dashboard' element={
              <PrivateRoute>
                <DashBoard/>
              </PrivateRoute>
            }>
              <Route index element={!admin ? <Booking/>: <OrderLists/>}/>
              <Route path='booking' element={<Booking/>}/>
              <Route path='bookLists' element={<BookLists/>}/>
              <Route path='review' element={<Review/>}/>
              <Route path='orderLists' element={
                <AdminRoute>
                  <OrderLists/>
                </AdminRoute>
              }/>
              <Route path='addService' element={
                <AdminRoute>
                  <AddService/>
                </AdminRoute>
              }/>
              <Route path='makeAdmin' element={
                <AdminRoute>
                  <MakeAdmin/>
                </AdminRoute>
              }/>
              <Route path='manageServices' element={
                <AdminRoute>
                  <ManageServices/>
                </AdminRoute>
              }/>
            </Route>
            <Route path='*' element={<NotFound/>}/>
          </Routes>
          <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
