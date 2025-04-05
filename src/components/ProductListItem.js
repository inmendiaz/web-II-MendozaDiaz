import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../style/products.css";

export default function ProductListItem({ title, id, description, images }) {
  return (
    <div className="product-list-item" key={id}>
      <div className="product-image">
        <img src={images} alt="Product Image" />
      </div>
      <div className="product-info">
        <h2 className="product-title">{title}</h2>
        <p className="product-id">{id}</p>
        <p className="product-date">{description}</p>
        <a href={`/products/${id}`} className="view-details">View Details</a>
      </div>
    </div>
  );
}
