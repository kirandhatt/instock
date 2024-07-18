import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AddNewInventoryItem.scss";
import PageContainer from "../../components/PageContainer/PageContainer";
import PageTitle from "../../components/PageTitle/PageTitle";
import { api_URL } from "../../utils/const";
import { useNavigate } from "react-router-dom";
import errorIcon from "../../assets/images/icons/error-24px.svg";

const AddNewItemForm = ({ onAddItem }) => {
  const [formData, setFormData] = useState({
    warehouse_id: "",
    item_name: "",
    description: "",
    category: "",
    status: "In Stock",
    quantity: "",
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);
  const [warehouses, setWarehouses] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${api_URL}/api/inventories/categories`
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories.", error);
      }
    };

    const fetchWarehouses = async () => {
      try {
        const response = await axios.get(`${api_URL}/api/warehouses`);
        setWarehouses(response.data);
      } catch (error) {
        console.error("Failed to fetch warehouses.", error);
      }
    };

    fetchCategories();
    fetchWarehouses();
  }, []);

  const validateForm = () => {
    const newErrors = {};

    Object.keys(formData).forEach((key) => {
      if (!formData[key] && key != "quantity") {
        newErrors[key] = "This field is required.";
      }
    });

    if (
      formData.status === "In Stock" &&
      (!formData.quantity || formData.quantity === "0")
    ) {
      newErrors.quantity = "Quantity is required when status is In stock.";
    } else if (formData.quantity && isNaN(formData.quantity)) {
      newErrors.quantity = "Quantity must be a number.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const confirmSubmit = window.confirm("Add new item?");
    if (confirmSubmit) {
      navigate(`/inventory`);
    }

    try {
      const response = await axios.post(`${api_URL}/api/inventories`, formData);
      onAddItem(response.data);
      setFormData({
        warehouse_id: "",
        item_name: "",
        description: "",
        category: "",
        status: "In Stock",
        quantity: "",
      });
    } catch (error) {
      console.error("Failed to add inventory item.", error);
    }
  };

  const handleCancel = async () => {
    const confirmCancel = window.confirm(
      "Are you sure you want to leave? Your changes will not be saved."
    );
    if (confirmCancel) {
      navigate(`/inventory`);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      const updatedFormData = { ...prevFormData, [name]: value };

      if (name === "status" && value === "Out of Stock") {
        updatedFormData.quantity = "0";
      }

      if (errors[name]) {
        setErrors((prevErrors) => {
          const updatedErrors = { ...prevErrors };
          delete updatedErrors[name];
          return updatedErrors;
        });
      }

      return updatedFormData;
    });
  };

  return (
    <PageContainer>
      <form className="add-item-form" onSubmit={handleSubmit}>
        <PageTitle
          className="add-item-form__title"
          title="Add New Inventory Item"
          backLink="/inventory"
        />
        <section className="add-item-form__tablet-container">
          <section className="add-item-form__container add-item-form__container--top">
            <div className="add-item-form__section">
              <h3 className="add-item-form__section-title">Item Details</h3>
              <div className="add-item-form__group">
                <label className="add-item-form__label" htmlFor="item_name">
                  Item Name
                </label>
                <input
                  type="text"
                  name="item_name"
                  placeholder="Item Name"
                  value={formData.item_name}
                  onChange={handleChange}
                  className={`add-item-form__input ${
                    errors.item_name ? "add-item-form__input--error" : ""
                  }`}
                />
                {errors.item_name && (
                  <span className="add-item-form__error-message">
                    <img src={errorIcon} alt="error-icon"/>
                    {errors.item_name}
                  </span>
                )}
              </div>
              <div className="add-item-form__group">
                <label className="add-item-form__label" htmlFor="description">
                  Description
                </label>
                <textarea
                  name="description"
                  placeholder="Please enter a brief item description..."
                  value={formData.description}
                  onChange={handleChange}
                  className={`add-item-form__textarea ${
                    errors.description ? "add-item-form__textarea--error" : ""
                  }`}
                />
                {errors.description && (
                  <span className="add-item-form__error-message">
                    <img src={errorIcon} alt="error-icon"/>
                    {errors.description}
                  </span>
                )}
              </div>
              <div className="add-item-form__group">
                <label className="add-item-form__label" htmlFor="category">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`add-item-form__select ${
                    errors.category ? "add-item-form__select--error" : ""
                  } ${
                    formData.category === ""
                      ? "add-item-form__select--default"
                      : ""
                  }`}
                >
                  <option value="" disabled="disabled" default>
                    Please select
                  </option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <span className="add-item-form__error-message">
                    <img src={errorIcon} alt="error-icon"/>
                    {errors.category}
                  </span>
                )}
              </div>
            </div>
          </section>
          <section className="add-item-form__container">
            <div className="add-item-form__section">
              <h3 className="add-item-form__section-title">
                Item Availability
              </h3>
              <div className="add-item-form__group">
                <label className="add-item-form__label" htmlFor="status">
                  Status
                </label>
                <div className="add-item-form__radio-group">
                  <input
                    type="radio"
                    id="in-stock"
                    name="status"
                    value="In Stock"
                    checked={formData.status === "In Stock"}
                    onChange={handleChange}
                    className="add-item-form__radio-input"
                  />
                  <label
                    className={`add-item-form__radio-label ${
                      formData.status === "In Stock"
                        ? "add-item-form__radio-label--active"
                        : ""
                    }`}
                    htmlFor="in-stock"
                  >
                    In stock
                  </label>
                  <input
                    type="radio"
                    id="out-of-stock"
                    name="status"
                    value="Out of Stock"
                    checked={formData.status === "Out of Stock"}
                    onChange={handleChange}
                    className="add-item-form__radio-input"
                  />
                  <label
                    className={`add-item-form__radio-label ${
                      formData.status === "Out of Stock"
                        ? "add-item-form__radio-label--active"
                        : ""
                    }`}
                    htmlFor="out-of-stock"
                  >
                    Out of stock
                  </label>
                </div>
                {errors.status && (
                  <span className="add-item-form__error-message">
                    <img src={errorIcon} alt="error-icon"/>
                    {errors.status}
                  </span>
                )}
              </div>
              {formData.status === "In Stock" && (
                <div className="add-item-form__group">
                  <label className="add-item-form__label" htmlFor="quantity">
                    Quantity
                  </label>
                  <input
                    type="text"
                    name="quantity"
                    placeholder="0"
                    value={formData.quantity}
                    onChange={handleChange}
                    className={`add-item-form__input ${
                      errors.quantity ? "add-item-form__input--error" : ""
                    }`}
                  />
                  {errors.quantity && (
                    <span className="add-item-form__error-message">
                        <img src={errorIcon} alt="error-icon"/>
                        {errors.quantity}
                    </span>
                  )}
                </div>
              )}
              <div className="add-item-form__group">
                <label className="add-item-form__label" htmlFor="warehouse_id">
                  Warehouse
                </label>
                <select
                  name="warehouse_id"
                  value={formData.warehouse_id}
                  onChange={handleChange}
                  className={`add-item-form__select ${
                    errors.warehouse_id ? "add-item-form__select--error" : ""
                  } ${
                    formData.warehouse_id === ""
                      ? "add-item-form__select--default"
                      : ""
                  }`}
                >
                  <option value="" disabled="disabled" default>
                    Please select
                  </option>
                  {warehouses.map((warehouse) => (
                    <option key={warehouse.id} value={warehouse.id}>
                      {warehouse.warehouse_name}
                    </option>
                  ))}
                </select>
                {errors.warehouse_id && (
                  <span className="add-item-form__error-message">
                    <img src={errorIcon} alt="error-icon"/>
                    {errors.warehouse_id}
                  </span>
                )}
              </div>
            </div>
          </section>
        </section>
        <div className="add-item-form__actions">
          <button
            type="button"
            className="add-item-form__button add-item-form__button--cancel"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="add-item-form__button add-item-form__button--submit"
            onClick={handleSubmit}
          >
            + Add Item
          </button>
        </div>
      </form>
    </PageContainer>
  );
};

export default AddNewItemForm;
