import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postProduct } from "../features/productSlice";
import { Link } from "react-router-dom";

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePost = async (e) => {
    e.preventDefault();

    // validasi input
    if (title.trim() === "" || price.trim() === "") {
      return false;
    } else if (price <= 0) {
      return false;
    }

    await dispatch(postProduct({ title, price }));
    navigate("/");
  };

  return (
    <div>
      <form onSubmit={handlePost} className="box mt-5">
        <Link to="/" className="button is-info mb-2">
          Back to Home
        </Link>
        <div className="field">
          <label className="label">Title</label>
          <div className="control">
            <input
              type="text"
              className="input"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Price</label>
          <div className="control">
            <input
              type="number"
              className="input"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>
        <div className="field">
          <button className="button is-success">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
