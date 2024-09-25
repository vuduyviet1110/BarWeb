import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import PrivateRoute from "./common/PrivateRoute";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import Giftcard from "./pages/GiftCard";
import ManageContent from "./pages/ManageContent";
import ManageGiftCard from "./pages/ManageGiftCard";
import ManageEvent from "./pages/ManageEvent";
import DetailAdminPage from "./pages/adminDetailPage";
import ManageBooking from "./pages/ManageBooking";
import ManageImage from "./pages/ManageImage";
import { Provider } from "react-redux";
import Profile from "./pages/Profile";
import { persistor, store } from "./redux/store";
import "react-datepicker/dist/react-datepicker.css"; // Import CSS của react-datepicker

import ResetPwd from "./pages/ResetPwd";
import ManageUser from "./pages/ManageUser";
import OrdersGC from "./pages/OrdersGC";
import { PersistGate } from "redux-persist/integration/react";
import AdminSearch from "./pages/AdminSearch";
import Analytics from "./pages/Analytics";
function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="/gift-card/orders" element={<OrdersGC />} />
            <Route path="/gift-card" element={<Giftcard />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/reset-password" element={<ResetPwd />} />
            <Route path="/profile" element={<Profile />} />

            {/* Admin Routes (Protected) */}
            <Route path="/admin" element={<PrivateRoute />}>
              <Route path=":field/:id" element={<DetailAdminPage />} />
              <Route path="booking" element={<ManageBooking />} />
              <Route path="sales" element={<Analytics />} />
              <Route path="gift-card" element={<ManageGiftCard />} />
              <Route path="user" element={<ManageUser />} />
              <Route path="search" element={<AdminSearch />} />
              <Route path="content" element={<ManageContent />} />
              <Route path="image" element={<ManageImage />} />
              <Route path="event" element={<ManageEvent />} />
            </Route>

            {/* Not Found Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
