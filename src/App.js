import "./App.scss";
import AdminLayout from "./components/AdminLayout";
import Dashboard from "./admin/pages/Dashboard";
import Genre from "./admin/pages/Genre";
import Content from "./admin/pages/Content";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./admin/pages/Login";
import Registration from "./admin/pages/Registration";
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect, useState } from "react";
import { ConfigProvider, Spin } from "antd";
import PublicRoute from "./components/PublicRoute";
import Browse from "./subscriber/pages/Browse";
import LandingPage from "./subscriber/pages/LandingPage";
import Watch from "./subscriber/pages/Watch";
import SubscriberLayout from "./components/SubscriberLayout";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("authToken");
    if (isLoggedIn) {
      setIsAuthenticated(true);
    }
    setAuthChecked(true);
  }, [setIsAuthenticated]);
  if (!authChecked)
    return (
      <div
        className="row d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="col-2 d-flex justify-content-center">
          <Spin size="large" />
        </div>
      </div>
    );
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#ff4d4f", // Primary button, links, etc.
          colorSuccess: "#52c41a",
          colorWarning: "#faad14",
          colorError: "#ff4d4f",
          // fontFamily: 'Inter, sans-serif',
        },
        components: {
          Button: {
            colorPrimary: "#1677ff", // blue button
          },
          Form: {
            colorPrimary: "#1677ff", // blue form submit
          },
          Input: {
            colorPrimary: "#1677ff",
          },
          Menu: {
            borderRadius: 0, // No rounded corners
            itemBorderRadius: 0, // Each item
            subMenuItemBorderRadius: 0, // Submenu items
          },
        },
      }}
    >
      <div className="App">
        <Router>
          <Routes>
            {/* Public Routes */}
            {/* <Route path='/admin' element={<PublicRoute isAuthenticated={isAuthenticated} user={'admin'} />}>
              <Route path="login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
              <Route path="registration" element={<Registration />} />
            </Route>

            <Route path='/subscriber' element={<PublicRoute isAuthenticated={isAuthenticated} user={'subscriber'} />}>
              <Route path="login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
              <Route path="registration" element={<Registration />} />
            </Route> */}

            {/* Private Routes */}
            {/* <Route path="/admin" element={<ProtectedRoute isAuthenticated={isAuthenticated} user={'admin'} />}>
              <Route element={<AdminLayout setIsAuthenticated={setIsAuthenticated} />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="genre" element={<Genre />} />
                <Route path="content" element={<Content />} />
              </Route>
            </Route> */}

            {/* Browse only for the subscribers */}
            {/* <Route path="/subscriber" element={<ProtectedRoute isAuthenticated={isAuthenticated} user={'subscriber'} />}>
                <Route path="browse" element={<Browse />} />
            </Route> */}

            <Route path="/admin">
              <Route
                element={<PublicRoute isAuthenticated={isAuthenticated} />}
              >
                <Route
                  path="login"
                  element={<Login setIsAuthenticated={setIsAuthenticated} />}
                />
                <Route path="registration" element={<Registration />} />
              </Route>
              <Route
                element={<ProtectedRoute isAuthenticated={isAuthenticated} />}
              >
                <Route
                  element={
                    <AdminLayout setIsAuthenticated={setIsAuthenticated} />
                  }
                >
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="genre" element={<Genre />} />
                  <Route path="content" element={<Content />} />
                </Route>
              </Route>
            </Route>

            <Route path="/subscriber">
              <Route
                element={<PublicRoute isAuthenticated={isAuthenticated} />}
              >
                <Route
                  path="login"
                  element={<Login setIsAuthenticated={setIsAuthenticated} />}
                />
                <Route path="registration" element={<Registration />} />
              </Route>
              <Route
                element={<ProtectedRoute isAuthenticated={isAuthenticated} />}
              >
                <Route element={<SubscriberLayout setIsAuthenticated={setIsAuthenticated} />}>
                  <Route path="browse" element={<Browse />} />
                  <Route path="watch/:id" element={<Watch />} />
                </Route>
              </Route>
            </Route>
            <Route
              path="/"
              element={
                isAuthenticated
                  ? <Navigate to="/subscriber/browse" />
                  : <LandingPage />
              }
            />
          </Routes>
        </Router>
      </div>
    </ConfigProvider>
  );
};

export default App;
