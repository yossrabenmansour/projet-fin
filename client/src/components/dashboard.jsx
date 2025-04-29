import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./App.css"; 

import Fadeloader from "react-spinners/FadeLoader";

const Dashboard = (props) => {
  const [data, setData] = useState([]);
  const [deletedID, setdeletedID] = useState(null);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [quantity, setQuantity] = useState("");
  const [loadings, setLoadings] = useState(false);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    props.handleToken("");
    navigate("/login");
  };

  const recl = () => {
    navigate("/reclamation");
  };

  useEffect(() => {
    if (props.newdata.length) {
      setData(props.newdata);
      console.log("data aded", data);
    } else {
      fetchProducts();
      console.log("current", data);
    }
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5500/getALLProducts", {
        headers: { authorization: token },
      });
      setData(response.data);
      props.getdata(response.data);
    } catch (error) {
      console.log(error);
      console.error("Error fetching Products:", error);
    }
  };

  const handleEdit = (id) => {
    setId(id);
  };

  const update = (id) => {
    axios
      .patch(`http://localhost:5500/updateProduct/${id}`, {
        name,
        category,
        description,
        price,
        image,
        quantity,
      })
      .then((res) => {
        setData(
          data.map((element) => {
            if (element._id === id) {
              return {
                ...element,
                name,
                category,
                description,
                price,
                image,
                quantity,
              };
            } else {
              return element;
            }
          })
        );

        setCategory("");
        setDescription("");

        setName("");
        setPrice("");
        setQuantity("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const uploadImageToCloudinary = (picture) => {
    setLoadings(true);
    const formData = new FormData();
    formData.append("file", picture);
    formData.append("upload_preset", "achrefmech");

    // Upload the image file to Cloudinary
    axios
      .post("https://api.cloudinary.com/v1_1/dlgzqlftm/image/upload", formData)
      .then((response) => {
        // Retrieve the uploaded image's URL
        const imageUrl = response.data.secure_url;
        setImage(imageUrl);

        setLoadings(false);
      })
      .catch((error) => {
        console.error("Error uploading image to Cloudinary:", error);
        setLoadings(false);
      });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5500/deleteProduct/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting Product:", error);
    }
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-custom">
        <div className="container-fluid">
          <h3 className="navbar-brand">Admin Dashboard</h3>
          <Link
            to={"/addproduct"}
            className="btn btn-success ms-auto"
            type="button"
          >
            Add Product
          </Link>
          <button
            onClick={() => {
              recl();
            }}
            className="btn btn-outline-danger ms-auto"
            type="button"
          >
            Reclamations
          </button>
          <button
            onClick={() => {
              logout();
            }}
            className="btn btn-outline-danger ms-auto"
            type="button"
          >
            Logout
          </button>
        </div>
      </nav>

      <div style={{ marginTop: "500px" }} className="container mt-5 card-cnt">
        <div className="row mt-5">
          {data.map((element, index) => (
            <div className="col-md-3 mt-5" key={index}>
              <div style={{ height: "500px" }} className="card mb-4">
                <img
                  style={{ height: "300px" }}
                  src={element.image}
                  className="card-img-top"
                  alt={element.name}
                />
                <div className="card-body">
                  <h5 className="card-title fw-bold">{element.name}</h5>
                  <p
                    style={{ textAlign: "center", marginTop: "30px" }}
                    className="card-text fw-semibold"
                  >
                    ${element.price}
                  </p>
                </div>
                <div className="d-flex justify-content-center mb-3">
                  <button
                    type="button"
                    className="btn btn-success me-3"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    data-bs-whatever="@mdo"
                    onClick={() => {
                      handleEdit(element._id);
                    }}
                  >
                    Update
                  </button>

                  <button
                    type="button"
                    className="btn btn-danger"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                    onClick={() => setdeletedID(element._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div
            className="modal fade"
            id="staticBackdrop"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  {/*<h1 className="modal-title fs-5 fw-bold" id="staticBackdropLabel"></h1>*/}
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div
                  style={{ backgroundColor: "#d3d3d3" }}
                  className="modal-body fw-semibold"
                >
                  Are you sure you want to delete this product !!!
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => handleDelete(deletedID)}
                    data-bs-dismiss="modal"
                    type="button"
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1
                    className="modal-title fs-5 fw-bolder"
                    id="exampleModalLabel"
                  >
                    Update This Product
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div>
                    <div className="mb-3">
                      <label
                        htmlFor="recipient-name"
                        className="col-form-label fw-medium fw-bold"
                      >
                        Name:
                      </label>
                      <input
                        placeholder="Name of Product ..."
                        type="text"
                        className="form-control"
                        id="recipient-name"
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />
                    </div>

                    <div className="mb-3">
                      <label
                        htmlFor="recipient-name"
                        className="col-form-label fw-medium fw-bold"
                      >
                        Category:
                      </label>
                      <input
                        placeholder="write the category..."
                        type="text"
                        className="form-control"
                        id="recipient-name"
                        onChange={(e) => {
                          setCategory(e.target.value);
                        }}
                      />
                    </div>

                    <div className="mb-3">
                      <label
                        htmlFor="recipient-name"
                        className="col-form-label fw-medium fw-bold"
                      >
                        Description:
                      </label>
                      <textarea
                        placeholder="Put a description..."
                        type="text"
                        className="form-control"
                        id="recipient-name"
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                      />
                    </div>

                    <div className="mb-3">
                      <label
                        htmlFor="message-text"
                        className="col-form-label fw-medium fw-bold"
                      >
                        Price:
                      </label>
                      <input
                        placeholder="Price of product..."
                        className="form-control"
                        id="message-text"
                        type="Number"
                        onChange={(e) => {
                          setPrice(e.target.value);
                        }}
                      ></input>
                    </div>

                    <div className="mb-3">
                      <label
                        htmlFor="recipient-name"
                        className="col-form-label fw-medium fw-bold"
                      >
                        Image:
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        id="recipient-name"
                        onChange={(e) => {
                          uploadImageToCloudinary(e.target.files[0]);
                        }}
                      />
                    </div>

                    <div className="mb-3">
                      <label
                        htmlFor="message-text"
                        className="col-form-label fw-medium fw-bold"
                      >
                        Quantity:
                      </label>
                      <input
                        onChange={(e) => {
                          setQuantity(e.target.value);
                        }}
                        placeholder="Quantity..."
                        className="form-control"
                        id="message-text"
                        type="Number"
                      ></input>
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>

                  {loadings ? (
                    <Fadeloader
                      className="logo"
                      color={"#36d7b7"}
                      loading={loadings}
                      size={150}
                    />
                  ) : (
                    <button
                      onClick={() => {
                        update(id);
                      }}
                      type="button"
                      data-bs-dismiss="modal"
                      className="btn btn-success"
                    >
                      Update
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
