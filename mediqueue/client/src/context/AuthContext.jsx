import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";


const AuthContext =
  createContext(null);


const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";


export const AuthProvider = ({
  children,
}) => {

  const [
    user,
    setUser,
  ] = useState(null);


  const [
    token,
    setToken,
  ] = useState(null);


  const [
    loading,
    setLoading,
  ] = useState(true);


  /*
  =========================================
  LOAD AUTH DATA
  =========================================
  */

  useEffect(() => {

    const storedToken =
      localStorage.getItem(
        "mediqueue_token"
      );


    const storedUser =
      localStorage.getItem(
        "mediqueue_user"
      );


    if (
      storedToken &&
      storedUser
    ) {

      try {

        setToken(
          storedToken
        );


        setUser(
          JSON.parse(
            storedUser
          )
        );

      } catch (error) {

        console.error(
          "Failed to restore authentication:",
          error
        );


        localStorage.removeItem(
          "mediqueue_token"
        );

        localStorage.removeItem(
          "mediqueue_user"
        );

      }

    }


    setLoading(false);

  }, []);


  /*
  =========================================
  LOGIN
  =========================================
  */

  const login =
    async (
      email,
      password
    ) => {

      const response =
        await fetch(
          `${API_URL}/auth/login`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              email,
              password,
            }),
          }
        );


      const result =
        await response.json();


      if (!response.ok) {

        throw new Error(
          result.message ||
            "Login failed."
        );

      }


      const {
        user,
        token,
      } = result.data;


      /*
      =====================================
      SAVE AUTH DATA
      =====================================
      */

      localStorage.setItem(
        "mediqueue_token",
        token
      );


      localStorage.setItem(
        "mediqueue_user",
        JSON.stringify(user)
      );


      setToken(token);

      setUser(user);


      return result;

    };


  /*
  =========================================
  REGISTER
  =========================================
  */

  const register =
    async ({
      name,
      email,
      phone,
      password,
      confirmPassword,
    }) => {

      const response =
        await fetch(
          `${API_URL}/auth/register`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({

              name,

              email,

              phone,

              password,

              confirmPassword,

            }),

          }
        );


      const result =
        await response.json();


      if (!response.ok) {

        throw new Error(
          result.message ||
            "Registration failed."
        );

      }


      const {
        user,
        token,
      } = result.data;


      /*
      =====================================
      SAVE AUTH DATA
      =====================================
      */

      localStorage.setItem(
        "mediqueue_token",
        token
      );


      localStorage.setItem(
        "mediqueue_user",
        JSON.stringify(user)
      );


      setToken(token);

      setUser(user);


      return result;

    };


  /*
  =========================================
  UPDATE USER
  =========================================

  Used when the patient updates their
  profile.

  This updates both:

  1. React state
  2. localStorage

  Therefore the Navbar and all other
  components using useAuth() immediately
  receive the updated user.
  =========================================
  */

  const updateUser =
    (updatedUser) => {

      if (!updatedUser) {

        return;

      }


      setUser(
        updatedUser
      );


      localStorage.setItem(
        "mediqueue_user",
        JSON.stringify(
          updatedUser
        )
      );

    };


  /*
  =========================================
  LOGOUT
  =========================================
  */

  const logout =
    () => {

      localStorage.removeItem(
        "mediqueue_token"
      );


      localStorage.removeItem(
        "mediqueue_user"
      );


      setToken(null);

      setUser(null);

    };


  /*
  =========================================
  AUTHENTICATED STATE
  =========================================
  */

  const isAuthenticated =
    Boolean(
      token &&
      user
    );


  /*
  =========================================
  CONTEXT VALUE
  =========================================
  */

  const value = {

    user,

    token,

    loading,

    isAuthenticated,

    login,

    register,

    updateUser,

    logout,

  };


  return (

    <AuthContext.Provider
      value={value}
    >

      {children}

    </AuthContext.Provider>

  );

};


/*
=========================================
CUSTOM HOOK
=========================================
*/

export const useAuth =
  () => {

    const context =
      useContext(
        AuthContext
      );


    if (!context) {

      throw new Error(
        "useAuth must be used inside AuthProvider."
      );

    }


    return context;

  };