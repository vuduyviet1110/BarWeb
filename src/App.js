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
function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/gift-card/orders" element={<OrdersGC />} />
            <Route path="/gift-card" element={<Giftcard />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/reset-password" element={<ResetPwd />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/admin" element={<PrivateRoute />}>
              <Route path="content" element={<ManageContent />} />
              <Route path="image" element={<ManageImage />} />
              <Route path="booking" element={<ManageBooking />} />
              <Route path="gift-card" element={<ManageGiftCard />} />
              <Route path="event" element={<ManageEvent />} />
              <Route path="user" element={<ManageUser />} />
            </Route>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
