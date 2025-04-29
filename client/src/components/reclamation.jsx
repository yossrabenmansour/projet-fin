import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./App.css";

const Reclamations = () => {
  const [recs, setRecs] = useState([]);

  const navigate = useNavigate();

  const dashbard = ()=>{
    navigate('/dashboard');
  }

  useEffect(() => {
    fetchRecs();
  }, []);
  const fetchRecs = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await axios.get("http://localhost:5500/getRecs", {
          headers: { authorization: token },
        });
        setRecs(response.data);
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error fetching reclmations:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5500/deleteRec/${id}`);
      fetchRecs();
    } catch (error) {
      console.error("Error deleting reclamation:", error);
    }
  };

  return (










  <div   >
     <button onClick={()=>{dashbard()}} type="button" class="btn btn-info">Go To Dashboard</button>
      <div className=" margin marginreclam">
        <form id="form">
          <table
            id="example"
            className="table table-striped table-bordered"
            width="100%"
          >
            <thead>
              <tr>
                <th className="head">Name</th>
                <th className="head">Phone Number</th>
                <th className="head">E-mail</th>
                <th className="head">Message</th>
                <th className="head">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recs.map((rec, i) => (
                <tr key={i}>
                  <td>{rec.name}</td>
                  <td>{rec.number}</td>
                  <td>{rec.email}</td>
                  <td>{rec.message}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      type="button "
                      onClick={() => {
                        handleDelete(rec._id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </form>
      </div>
  </div>








  );
};
export default Reclamations;
