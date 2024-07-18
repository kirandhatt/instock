import React, { useEffect, useState } from "react";
import axios from "axios";
import "./EditInventoryItem.scss";
import PageContainer from "../../components/PageContainer/PageContainer";
import PageTitle from "../../components/PageTitle/PageTitle";
import { api_URL } from "../../utils/const";
import { useNavigate, useParams } from "react-router-dom";
import errorIcon from "../../assets/images/icons/error-24px.svg";

const EditItemForm = ({ onUpdateItem }) => {
  const { inventoryItemId } = useParams();
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

    const fetchItemDetails = async () => {
      try {
        const response = await axios.get(
          `${api_URL}/api/inventories/${inventoryItemId}`
        );
        setFormData(response.data);
      } catch (error) {
        console.error("Failed to fetch item details.", error);
      }
    };

    fetchCategories();
    fetchWarehouses();
    fetchItemDetails();
  }, [inventoryItemId]);

  const validateForm = () => {
    const newErrors = {};

    Object.keys(formData).forEach((key) => {
      if (!formData[key] && key !== "quantity") {
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

    const confirmSubmit = window.confirm("Save all changes?");
    if (confirmSubmit) {
      navigate(`/inventory/${inventoryItemId}`);
    }

    try {
      const response = await axios.put(
        `${api_URL}/api/inventories/${inventoryItemId}`,
        formData
      );
      onUpdateItem(response.data);
    } catch (error) {
      console.error("Failed to update inventory item.", error);
    }

    location.reload(true);
  };

  const handleCancel = async () => {
    const confirmCancel = window.confirm(
      "Are you sure you want to leave? Your changes will not be saved."
    );
    if (confirmCancel) {
      navigate(`/inventory/${inventoryItemId}`);
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
      <section>
        <form className="edit-item-form" onSubmit={handleSubmit}>
          <PageTitle
            className="edit-item-form__title"
            title="Edit Inventory Item"
            editLink={`/inventory/${inventoryItemId}/edit`}
            backLink={`/inventory/${inventoryItemId}`}
          />
          <section className="edit-item-form__tablet-container">
            <section className="edit-item-form__container edit-item-form__container--top">
              <div className="edit-item-form__section">
                <h3 className="edit-item-form__section-title">Item Details</h3>
                <div className="edit-item-form__group">
                  <label className="edit-item-form__label" htmlFor="item_name">
                    Item Name
                  </label>
                  <input
                    type="text"
                    name="item_name"
                    placeholder="Item Name"
                    value={formData.item_name}
                    onChange={handleChange}
                    className={`edit-item-form__input ${
                      errors.item_name ? "edit-item-form__input--error" : ""
                    }`}
                  />
                  {errors.item_name && (
                    <span className="edit-item-form__error-message">
                       <img src={errorIcon} alt="error-icon"/>
                      {errors.item_name}
                    </span>
                  )}
                </div>
                <div className="edit-item-form__group">
                  <label
                    className="edit-item-form__label"
                    htmlFor="description"
                  >
                    Description
                  </label>
                  <textarea
                    name="description"
                    placeholder="Please enter a brief item description..."
                    value={formData.description}
                    onChange={handleChange}
                    className={`edit-item-form__textarea ${
                      errors.description
                        ? "edit-item-form__textarea--error"
                        : ""
                    }`}
                  />
                  {errors.description && (
                    <span className="edit-item-form__error-message">
                       <img src={errorIcon} alt="error-icon"/>
                      {errors.description}
                    </span>
                  )}
                </div>
                <div className="edit-item-form__group">
                  <label className="edit-item-form__label" htmlFor="category">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`edit-item-form__select ${
                      errors.category ? "edit-item-form__select--error" : ""
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
                    <span className="edit-item-form__error-message">
                       <img src={errorIcon} alt="error-icon"/>
                      {errors.category}
                    </span>
                  )}
                </div>
              </div>
            </section>
            <section className="edit-item-form__container">
              <div className="edit-item-form__section">
                <h3 className="edit-item-form__section-title">
                  Item Availability
                </h3>
                <div className="edit-item-form__group">
                  <label className="edit-item-form__label" htmlFor="status">
                    Status
                  </label>
                  <div className="edit-item-form__radio-group">
                    <input
                      type="radio"
                      id="in-stock"
                      name="status"
                      value="In Stock"
                      checked={formData.status === "In Stock"}
                      onChange={handleChange}
                      className="edit-item-form__radio-input"
                    />
                    <label
                      className={`edit-item-form__radio-label ${
                        formData.status === "In Stock"
                          ? "edit-item-form__radio-label--active"
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
                      className="edit-item-form__radio-input"
                    />
                    <label
                      className={`edit-item-form__radio-label ${
                        formData.status === "Out of Stock"
                          ? "edit-item-form__radio-label--active"
                          : ""
                      }`}
                      htmlFor="out-of-stock"
                    >
                      Out of stock
                    </label>
                  </div>
                  {errors.status && (
                    <span className="edit-item-form__error-message">
                       <img src={errorIcon} alt="error-icon"/>
                      {errors.status}
                    </span>
                  )}
                </div>
                {formData.status === "In Stock" && (
                  <div className="edit-item-form__group">
                    <label className="edit-item-form__label" htmlFor="quantity">
                      Quantity
                    </label>
                    <input
                      type="text"
                      name="quantity"
                      placeholder="0"
                      value={formData.quantity}
                      onChange={handleChange}
                      className={`edit-item-form__input ${
                        errors.quantity ? "edit-item-form__input--error" : ""
                      }`}
                    />
                    {errors.quantity && (
                      <span className="edit-item-form__error-message">
                        <img src={errorIcon} alt="error-icon"/>
                        {errors.quantity}
                      </span>
                    )}
                  </div>
                )}
                <div className="edit-item-form__group">
                  <label
                    className="edit-item-form__label"
                    htmlFor="warehouse_id"
                  >
                    Warehouse
                  </label>
                  <select
                    name="warehouse_id"
                    value={formData.warehouse_id}
                    onChange={handleChange}
                    className={`edit-item-form__select ${
                      errors.warehouse_id ? "edit-item-form__select--error" : ""
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
                    <span className="edit-item-form__error-message">
                       <img src={errorIcon} alt="error-icon"/>
                      {errors.warehouse_id}
                    </span>
                  )}
                </div>
              </div>
            </section>
          </section>
          <div className="edit-item-form__actions">
            <button
              type="button"
              className="edit-item-form__button edit-item-form__button--cancel"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="edit-item-form__button edit-item-form__button--submit"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </form>
      </section>
    </PageContainer>
  );
};

export default EditItemForm;
