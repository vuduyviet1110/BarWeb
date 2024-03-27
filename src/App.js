import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import PrivateRoute from "./common/PrivateRoute";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import NotFound from "./pages/NotFound";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import Giftcard from "./pages/GiftCard";
import ManageContent from "./pages/ManageContent";
import ManageGiftCard from "./pages/ManageGiftCard";
import ManageWineOrder from "./pages/ManageWineOrder";
import ManageFeedback from "./pages/ManageFeedback";
import ManageBooking from "./pages/ManageBooking";
import ManageImage from "./pages/ManageImage";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/gift-card" element={<Giftcard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/admin" element={<PrivateRoute />}>
          <Route path="content" element={<ManageContent />} />
          <Route path="image" element={<ManageImage />} />
          <Route path="booking" element={<ManageBooking />} />
          <Route path="gift-card" element={<ManageGiftCard />} />
          <Route path="wine-order" element={<ManageWineOrder />} />
          <Route path="feedback" element={<ManageFeedback />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
