import React, { Suspense } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ListingsPage from './pages/ListingsPage';
import ItemDetailPage from './pages/ItemDetailPage';
import HospitalDetailPage from './pages/HospitalDetailPage';
import WeddingDetailPage from './pages/WeddingDetailPage'; 
import DashboardPage from './pages/DashboardPage';
import BookingConfirmationPage from './pages/BookingConfirmationPage';
import MyBookingsPage from './pages/MyBookingsPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PaymentPage from './pages/PaymentPage';
import CustomerSupportPage from './pages/CustomerSupportPage';
import ComplaintPage from './pages/ComplaintPage';
import NotificationsPage from './pages/NotificationsPage';
import SettingsPage from './features/SettingsPage';
import BookingInquiryPage from './pages/BookingInquiryPage';
import HistoryPage from './pages/HistoryPage';
import InvoicePage from './pages/InvoicePage';
import WishlistPage from './pages/WishlistPage';
import LiveRidePage from './pages/LiveRidePage';
import { useAuth } from './contexts/AuthContext'; 
import { ToastContainer } from './components/ui/Toast';
import VoiceAssistant from './components/voice/VoiceAssistant';
import InfoPageLayout from './components/InfoPageLayout';
import SkeletonLoader from './components/ui/SkeletonLoader';
import AIChatbot from './components/ai/AIChatbot';

// Lazy-loaded components for better performance
const MapSearchPage = React.lazy(() => import('./pages/MapSearchPage'));
const UserProfilePage = React.lazy(() => import('./pages/UserProfilePage'));
const MessagingPage = React.lazy(() => import('./pages/MessagingPage'));
const AITravelPlannerPage = React.lazy(() => import('./pages/AITravelPlannerPage'));
const SharedWishlistPage = React.lazy(() => import('./pages/SharedWishlistPage'));


const ProtectedRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

const PageLoader: React.FC = () => (
    <div className="flex justify-center items-center h-[60vh]">
        <SkeletonLoader type="card" className="w-full max-w-sm"/>
    </div>
);

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen bg-neutral-light dark:bg-neutral-d-light">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-6 sm:py-8 md:py-10">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Core Booking Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/listings/:categorySlug" element={<ListingsPage />} />
              <Route path="/map-search" element={<MapSearchPage />} />
              <Route path="/item/:categorySlug/:itemId" element={<ItemDetailPage />} />
              <Route path="/hospital/:itemId" element={<HospitalDetailPage />} />
              <Route path="/wedding/:itemId" element={<WeddingDetailPage />} />
              <Route path="/ai-planner" element={<AITravelPlannerPage />} />
              <Route path="/shared-wishlist" element={<SharedWishlistPage />} />
              
              {/* Protected User Routes */}
              <Route path="/confirmation/:bookingId" element={<ProtectedRoute element={<BookingConfirmationPage />} />} />
              <Route path="/invoice/:bookingId" element={<ProtectedRoute element={<InvoicePage />} />} /> 
              <Route path="/payment/:bookingId" element={<ProtectedRoute element={<PaymentPage />} />} />
              <Route path="/live-ride/:bookingId" element={<ProtectedRoute element={<LiveRidePage />} />} />
              <Route path="/my-bookings" element={<ProtectedRoute element={<MyBookingsPage />} />} />
              <Route path="/messages/:bookingId" element={<ProtectedRoute element={<MessagingPage />} />} />
              <Route path="/wishlist" element={<ProtectedRoute element={<WishlistPage />} />} />
              <Route path="/dashboard" element={<ProtectedRoute element={<DashboardPage />} />} />
              <Route path="/history" element={<ProtectedRoute element={<HistoryPage />} />} />
              <Route path="/notifications" element={<ProtectedRoute element={<NotificationsPage />} />} />
              <Route path="/settings" element={<ProtectedRoute element={<SettingsPage />} />} />
              <Route path="/profile/:userId" element={<ProtectedRoute element={<UserProfilePage />} />} />

              {/* Auth Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              
              {/* Static & Info Routes */}
              <Route path="/support" element={<CustomerSupportPage />} />
              <Route path="/complaints" element={<ComplaintPage />} />
              <Route path="/inquiry" element={<BookingInquiryPage />} />

              {/* Dynamic route for all informational pages */}
              <Route path="/info/:pageSlug" element={<InfoPageLayout />} />
              
              {/* Redirects from old paths to the new /info structure */}
              <Route path="/about" element={<Navigate replace to="/info/about" />} />
              <Route path="/terms" element={<Navigate replace to="/info/terms" />} />
              <Route path="/privacy" element={<Navigate replace to="/info/privacy" />} />
              <Route path="/careers" element={<Navigate replace to="/info/careers" />} />
              <Route path="/partner-help" element={<Navigate replace to="/info/partner-help" />} />
              <Route path="/genius-loyalty" element={<Navigate replace to="/info/genius-loyalty" />} />
              <Route path="/travel-articles" element={<Navigate replace to="/info/travel-articles" />} />
              <Route path="/security" element={<Navigate replace to="/info/security" />} />
              <Route path="/sustainability" element={<Navigate replace to="/info/sustainability" />} />
              <Route path="/press-centre" element={<Navigate replace to="/info/press-centre" />} />
              <Route path="/investor-relations" element={<Navigate replace to="/info/investor-relations" />} />

              {/* Fallback Route */}
              <Route path="/404" element={<NotFoundPage />} />
              <Route path="*" element={<Navigate replace to="/404" />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <ToastContainer />
        <VoiceAssistant />
        <AIChatbot />
      </div>
    </HashRouter>
  );
};

export default App;