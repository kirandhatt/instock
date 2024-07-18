import TextField from "../../components/TextField/TextField";
import { useState, useRef } from "react";
import axios from "axios";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../components/SecondaryButton/SecondaryButton";
import "./AddWarehouse.scss";
import PageContainer from "../../components/PageContainer/PageContainer";
import PageTitle from "../../components/PageTitle/PageTitle";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";

function AddWarehouse() {
  const [values, setValues] = useState({
    warehouse_name: "",
    address: "",
    city: "",
    country: "",
    contact_name: "",
    contact_position: "",
    contact_phone: "",
    contact_email: "",
  });

  const navigate = useNavigate();

  const [error, setError] = useState({
    warehouse_name: false,
    address: false,
    city: false,
    country: false,
    contact_name: false,
    contact_position: false,
    contact_phone: false,
    contact_email: false,
  });

  const [success, setSuccess] = useState(false);

  const formRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const validate = () => {
    const {
      warehouse_name,
      address,
      city,
      country,
      contact_name,
      contact_position,
      contact_phone,
      contact_email,
    } = values;

    const newErrors = {
      warehouse_name: !warehouse_name,
      address: !address,
      city: !city,
      country: !country,
      contact_name: !contact_name,
      contact_position: !contact_position,
      contact_phone: !contact_phone ,
      contact_email: !contact_email.includes("@"),
    };

    setError(newErrors);

    return Object.values(newErrors).every((error) => !error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      console.log("Form validation failed");
      return;
    }

    const confirmSubmit = window.confirm("Add new warehouse?");
    if (confirmSubmit) {
      navigate(`/warehouse`);
    } else {
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/warehouses",
        values
      );
      setSuccess(true);
      alert("Form submitted successfully!");
      formRef.current.reset();
    } catch (error) {
      console.error("Failed to create new warehouse:", error);
      setError("Failed to create new warehouse");
    }

    location.reload(true);
  };

  const handleCancel = async () => {
    const confirmCancel = window.confirm(
      "Are you sure you want to leave? Your changes will not be saved."
    );
    if (confirmCancel) {
      navigate(`/warehouse`);
    }

    location.reload(true);
  };

  return (

    <PageContainer>
      <section className="add-warehouse">
        <div>
          <PageTitle title="Add New Warehouse" backLink="/" />
        </div>

        <form
          className="add-warehouse__form"
          onSubmit={handleSubmit}
          ref={formRef}
        >
          <div className="add-warehouse__container">
            <div
              className={classNames("add-warehouse__card", "form-group", {
                error: error.warehouse_name,
              })}
            >
              <h2 className="add-warehouse__title">Warehouse Details</h2>
              <TextField
                label="Warehouse Name"
                name="warehouse_name"
                placeholder="Warehouse Name"
                value={values.warehouse_name}
                onChange={handleInputChange}
                required={true}
                hasError={error.warehouse_name}
              />

              <TextField
                label="Street Address"
                name="address"
                placeholder="Street Address"
                value={values.address}
                onChange={handleInputChange}
                required={true}
                hasError={error.address}
              />

              <TextField
                label="City"
                name="city"
                placeholder="City"
                value={values.city}
                onChange={handleInputChange}
                required={true}
                hasError={error.city}
              />

              <TextField
                label="Country"
                name="country"
                placeholder="Country"
                value={values.country}
                onChange={handleInputChange}
                required={true}
                hasError={error.country}
              />
            </div>
            <div className="add-warehouse__divider-line"> </div>
            <div className="add-warehouse__card">
              <h2 className="add-warehouse__title">Contact Details</h2>

              <TextField
                label="Contact Name"
                name="contact_name"
                placeholder="Contact Name"
                value={values.contact_name}
                onChange={handleInputChange}
                required={true}
                hasError={error.contact_name}
              />

              <TextField
                label="Position"
                name="contact_position"
                placeholder="Position"
                value={values.contact_position}
                onChange={handleInputChange}
                required={true}
                hasError={error.contact_position}
              />

              <TextField
                label="Phone Number"
                name="contact_phone"
                placeholder="Phone Number"
                value={values.contact_phone}
                onChange={handleInputChange}
                required={true}
                hasError={error.contact_phone}
                validationType="phone"
              />

              <TextField
                label="Email"
                name="contact_email"
                placeholder="Email"
                value={values.contact_email}
                onChange={handleInputChange}
                required={true}
                hasError={error.contact_email}
                validationType="email"
              />
            </div>
          </div>

          <div className="add-warehouse__buttons">
            <SecondaryButton buttonText="Cancel" onClick={handleCancel} />
            <PrimaryButton type="submit" buttonText="+ Add Warehouse" />
          </div>
        </form>
      </section>
    </PageContainer>
  );
}

export default AddWarehouse;
