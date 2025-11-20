// import React, { useRef } from "react";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { AnimatePresence } from "framer-motion";

// import Navbar from "./components/Navbar";
// import HeroSection from "./components/HeroSection";
// import Products from "./components/Products";
// import AboutSherin from "./components/AboutSherin";
// import ContactUs from "./components/ContactUs";
// import Footer from "./components/Footer";
// import SherinTreasures from "./components/SherinTreasuresPage";
// import CollectionPage from "./components/CollectionPage";
// import Shop from "./components/Shop";
// import Cart from "./components/Cart";
// import MyProfile from "./components/MyProfile";

// // Admin
// import AdminLayout from "./admin/AdminLayout";
// import Dashboard from "./admin/pages/Dashboard";
// import ManageProducts from "./admin/pages/ManageProducts";
// import ManageOrders from "./admin/pages/ManageOrders";
// import ManageUsers from "./admin/pages/ManageUsers";
// import ManageReports from "./admin/pages/ManageReports";

// const App = () => {
//   const shopRef = useRef(null);
//   const aboutRef = useRef(null);
//   const contactRef = useRef(null);

//   const scrollToSection = (ref) => {
//     if (ref && ref.current) {
//       ref.current.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   const HomeLayout = () => (
//     <>
//       <Navbar
//         onNavigate={(section) => {
//           if (section === "Shop") scrollToSection(shopRef);
//           else if (section === "About Us") scrollToSection(aboutRef);
//           else if (section === "Contact") scrollToSection(contactRef);
//         }}
//       />
//       <HeroSection />
//       <div ref={shopRef}>
//         <Products />
//       </div>
//       <div ref={aboutRef}>
//         <AboutSherin />
//       </div>
//       <div ref={contactRef}>
//         <ContactUs />
//       </div>
//       <Footer />
//     </>
//   );

//   return (
//     <Router>
//       <AnimatePresence mode="wait">
//         <Routes>
//           {/* User Routes */}
//           <Route path="/" element={<HomeLayout />} />
//           <Route path="/collection" element={<CollectionPage />} />
//           <Route path="/treasures" element={<SherinTreasures />} />
//           <Route path="/shop" element={<Shop />} />
//           <Route path="/cart" element={<Cart />} />
//           <Route path="/myprofile" element={<MyProfile />} />

//           {/* Admin Routes with shared layout */}
//           <Route path="/admin" element={<AdminLayout />}>
//             <Route index element={<Dashboard />} />
//             <Route path="products" element={<ManageProducts />} />
//             <Route path="orders" element={<ManageOrders />} />
//             <Route path="users" element={<ManageUsers />} />
//             <Route path="reports" element={<ManageReports />} />
//           </Route>
//         </Routes>
//       </AnimatePresence>
//       <ToastContainer position="top-right" autoClose={2000} />
//     </Router>
//   );
// };

// export default App;


import React, { useRef } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Products from "./components/Products";
import AboutSherin from "./components/AboutSherin";
import ContactUs from "./components/ContactUs";
import Footer from "./components/Footer";
import SherinTreasures from "./components/SherinTreasuresPage";
import CollectionPage from "./components/CollectionPage";
import Shop from "./components/Shop";
import Cart from "./components/Cart";
import MyProfile from "./components/MyProfile";

// Admin
import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/pages/Dashboard";
import ManageProducts from "./admin/pages/ManageProducts";
import ManageOrders from "./admin/pages/ManageOrders";
import ManageUsers from "./admin/pages/ManageUsers";
import ManageReports from "./admin/pages/ManageReports";

// Protected Routes
import ProtectedRoute from "./components/ProtectedRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute";

const App = () => {
  const shopRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const HomeLayout = () => (
    <>
      <Navbar
        onNavigate={(section) => {
          if (section === "Shop") scrollToSection(shopRef);
          else if (section === "About Us") scrollToSection(aboutRef);
          else if (section === "Contact") scrollToSection(contactRef);
        }}
      />
      <HeroSection />
      <div ref={shopRef}>
        <Products />
      </div>
      <div ref={aboutRef}>
        <AboutSherin />
      </div>
      <div ref={contactRef}>
        <ContactUs />
      </div>
      <Footer />
    </>
  );

  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomeLayout />} />
          <Route path="/collection" element={<CollectionPage />} />
          <Route path="/treasures" element={<SherinTreasures />} />
          <Route path="/shop" element={<Shop />} />

          {/* Protected User Routes */}
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />

          <Route
            path="/myprofile"
            element={
              <ProtectedRoute>
                <MyProfile />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <AdminProtectedRoute>
                <AdminLayout />
              </AdminProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="products" element={<ManageProducts />} />
            <Route path="orders" element={<ManageOrders />} />
            <Route path="users" element={<ManageUsers />} />
            <Route path="reports" element={<ManageReports />} />
          </Route>
        </Routes>
      </AnimatePresence>

      <ToastContainer position="top-right" autoClose={2000} />
    </Router>
  );
};

export default App;
