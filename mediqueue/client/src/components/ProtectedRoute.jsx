import {
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";

import {
  useAuth,
} from "../context/AuthContext";


function ProtectedRoute() {

  const {
    isAuthenticated,
    loading,
  } = useAuth();


  const location =
    useLocation();


  /*
  =========================================
  WAIT FOR AUTH STATE
  =========================================
  */

  if (loading) {

    return (

      <div className="route-loading">

        <div className="route-spinner" />

        <p>
          Loading...
        </p>

      </div>

    );

  }


  /*
  =========================================
  NOT AUTHENTICATED
  =========================================
  */

  if (!isAuthenticated) {

    return (

      <Navigate
        to="/login"
        replace
        state={{
          from: location,
        }}
      />

    );

  }


  /*
  =========================================
  AUTHENTICATED
  =========================================
  */

  return <Outlet />;

}


export default ProtectedRoute;