import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Fadeloader from "react-spinners/FadeLoader";

const Addproduct = (props) => {
  const [name, setName] = useState("");
  const [newdata, setNewdata] = useState([]);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [loadings, setLoadings] = useState(false);
  // axios.defaults.withCredentials = true

  const navigate = useNavigate();

  //// cloudName : dlgzqlftm
  /// Upload presets Name : achrefmech
  // url de base pour l'api : https://api.cloudinary.com/v1_1

  const dashboard = () => {
    navigate("/dashboard");
  };

  const add = async () => {
    try {
      const response = await axios.post("http://localhost:5500/addProduct", {
        name,
        category,
        description,
        price,
        quantity,
        image
      });
      const current = await props.products;

      setNewdata([...current, response.data]);

      props.getnewdata(newdata);

      setName("");
      setPrice("");
      setDescription("");

      setCategory("");
      setQuantity("");
    } catch (err) {
      console.log(err);
    }
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
  
  return (
    <section className="main">
      <div className="layer">
        <div className="bottom-grid"></div>
        <div className="content-w3ls">
          <div className="text-center icon"></div>
          <div className="content-bottom">
            <form>
              <div className="field-group">
                <div className="wthree-field">
                  <input
                    name="name"
                    id="myInput"
                    type="text"
                    placeholder="Product Name"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="field-group">
                <div className="wthree-field">
                  <input
                    name="description"
                    id="myInput"
                    type="text"
                    placeholder="Product Description"
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="field-group">
                <div className="wthree-field">
                  <input
                    name="price"
                    id="myInput"
                    type="number"
                    placeholder="Price"
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="field-group">
                <div className="wthree-field">
                  <input
                    name="quantity"
                    id="myInput"
                    type="number"
                    placeholder="Quantity"
                    onChange={(e) => {
                      setQuantity(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="field-group">
                <div className="wthree-field">
                  <input
                    name="category"
                    id="myInput"
                    type="text"
                    placeholder="category"
                    onChange={(e) => {
                      setCategory(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="field-group">
                <div className="wthree-field">
                  <input
                    name="image"
                    id="myInput"
                    type="file"
                    onChange={(e) => {
                      uploadImageToCloudinary(e.target.files[0]);
                    }}
                  />
                </div>
              </div>
            </form>





       {loadings?(
        <Fadeloader
className="logo"
color={"#36d7b7"}
loading={loadings}

size={150}

/>
       ):(
        <div className="wthree-field">
        <button
          onClick={() => {
            add();
          }}
          className="btn"
        >
          Add Product
        </button>
      </div>
       )}

           









            <div className="wthree-field">
              <button
                onClick={() => {
                  dashboard();
                }}
                className="btn"
              >
                Go Dashboard
              </button>
            </div>
          </div>
        </div>
        <div className="bottom-grid1"></div>
      </div>
    </section>
  );
};

export default Addproduct;
