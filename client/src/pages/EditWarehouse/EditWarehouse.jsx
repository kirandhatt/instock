import TextField from "../../components/TextField/TextField";
import { useState, useEffect, useRef } from "react";
import { api_URL } from "../../utils/const";
import axios from "axios";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../components/SecondaryButton/SecondaryButton";
import PageContainer from "../../components/PageContainer/PageContainer";
import PageTitle from "../../components/PageTitle/PageTitle";
import classNames from "classnames";
import { useParams, useNavigate } from "react-router-dom";

function EditWarehouse() {
  const { warehouseId } = useParams();
  const [warehouseDetails, setWarehouseDetails] = useState({
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

  useEffect(() => {
    const fetchWarehouseDetails = async () => {
      try {
        const { data } = await axios.get(
          `${api_URL}/api/warehouses/${warehouseId}`
        );
        setWarehouseDetails(data);
      } catch (e) {
        console.error("Failed to fetch warehouse details", e);
      }
    };
    fetchWarehouseDetails();
  }, [warehouseId]);

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
    setWarehouseDetails({
      ...warehouseDetails,
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
    } = warehouseDetails;

    const newErrors = {
      warehouse_name: !warehouse_name,
      address: !address,
      city: !city,
      country: !country,
      contact_name: !contact_name,
      contact_position: !contact_position,
      contact_phone: contact_phone.length !== 10,
      contact_email: !contact_email.includes("@"),
    };

    console.log("ALL ERRORS: ", newErrors);
    setError(newErrors);

    return Object.values(newErrors).every((error) => !error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      console.log("Form validation failed");
      return;
    }

    try {
      const { data } = await axios.put(
        `${api_URL}/api/warehouses/${warehouseId}`,
        warehouseDetails
      );
    } catch (e) {
      console.error("Failed to update warehouse details.", e);
    }

    const confirmSubmit = window.confirm("Save all changes?");
    if (confirmSubmit) {
      navigate(`/warehouse/${warehouseId}`);
    }
  };

  const handleCancel = async () => {
    const confirmCancel = window.confirm(
      "Are you sure you want to leave? Your changes will not be saved."
    );
    if (confirmCancel) {
      navigate(`/`);
    }
  };

  return (
    <PageContainer>
      <section className="add-warehouse">
        <div>
          <PageTitle title="Edit Warehouse" backLink={`/warehouse/${warehouseId}`} />
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
                value={warehouseDetails.warehouse_name}
                onChange={handleInputChange}
                required={true}
                hasError={error.warehouse_name}
              />

              <TextField
                label="Street Address"
                name="address"
                placeholder="Street Address"
                value={warehouseDetails.address}
                onChange={handleInputChange}
                required={true}
                hasError={error.address}
              />

              <TextField
                label="City"
                name="city"
                placeholder="City"
                value={warehouseDetails.city}
                onChange={handleInputChange}
                required={true}
                hasError={error.city}
              />

              <TextField
                label="Country"
                name="country"
                placeholder="Country"
                value={warehouseDetails.country}
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
                value={warehouseDetails.contact_name}
                onChange={handleInputChange}
                required={true}
                hasError={error.contact_name}
              />

              <TextField
                label="Position"
                name="contact_position"
                placeholder="Position"
                value={warehouseDetails.contact_position}
                onChange={handleInputChange}
                required={true}
                hasError={error.contact_position}
              />

              <TextField
                label="Phone Number"
                name="contact_phone"
                placeholder="Phone Number"
                value={warehouseDetails.contact_phone}
                onChange={handleInputChange}
                required={true}
                hasError={error.contact_phone}
                validationType="phone"
              />

              <TextField
                label="Email"
                name="contact_email"
                placeholder="Email"
                value={warehouseDetails.contact_email}
                onChange={handleInputChange}
                required={true}
                hasError={error.contact_email}
                validationType="email"
              />
            </div>
          </div>

          <div className="add-warehouse__buttons">
            <SecondaryButton buttonText="Cancel" onClick={handleCancel} />
            <PrimaryButton
              type="submit"
              buttonText="Save"
              onClick={handleSubmit}
            />
          </div>
        </form>
      </section>
    </PageContainer>
  );
}

export default EditWarehouse;
