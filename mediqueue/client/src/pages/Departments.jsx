import {
  useEffect,
  useState,
} from "react";

import {
  getDepartments,
} from "../api/departmentApi";

import "./Departments.css";


function Departments() {

  const [
    departments,
    setDepartments,
  ] = useState([]);


  const [
    loading,
    setLoading,
  ] = useState(true);


  const [
    error,
    setError,
  ] = useState("");


  useEffect(() => {

    const loadDepartments =
      async () => {

        try {

          setLoading(true);

          setError("");


          const data =
            await getDepartments();


          setDepartments(data);

        } catch (error) {

          console.error(
            "Departments error:",
            error
          );


          setError(
            error.message ||
            "Failed to load departments."
          );

        } finally {

          setLoading(false);

        }

      };


    loadDepartments();

  }, []);


  if (loading) {

    return (
      <main className="departments-page">

        <div className="departments-container">

          <p>
            Loading departments...
          </p>

        </div>

      </main>
    );

  }


  if (error) {

    return (
      <main className="departments-page">

        <div className="departments-container">

          <h2>
            Unable to load departments
          </h2>

          <p>
            {error}
          </p>

        </div>

      </main>
    );

  }


  return (

    <main className="departments-page">

      <div className="departments-container">

        <div className="departments-header">

          <span>
            MEDIQUEUE
          </span>

          <h1>
            Our Departments
          </h1>

          <p>
            Explore the medical departments
            available through MediQueue.
          </p>

        </div>


        {departments.length === 0 ? (

          <div className="departments-empty">

            <h2>
              No departments available
            </h2>

            <p>
              Departments have not been added
              to the system yet.
            </p>

          </div>

        ) : (

          <div className="departments-grid">

            {departments.map(
              (department) => (

                <div
                  key={department._id}
                  className="department-card"
                >

                  <h2>
                    {department.name}
                  </h2>

                  {department.description && (

                    <p>
                      {department.description}
                    </p>

                  )}

                </div>

              )
            )}

          </div>

        )}

      </div>

    </main>

  );

}


export default Departments;