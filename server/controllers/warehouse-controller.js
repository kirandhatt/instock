import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

const validateWarehouse = (req, res, next) => {
  const {
    warehouse_name,
    address,
    city,
    country,
    contact_name,
    contact_position,
    contact_phone,
    contact_email,
  } = req.body;

  if (
    !warehouse_name ||
    !address ||
    !city ||
    !country ||
    !contact_name ||
    !contact_position ||
    !contact_phone ||
    !contact_email
  ) {
    return res.status(400).json({ error: "All fields are required." });
  }

  next();
};

// to get list of all warehouses
const index = async (_req, res) => {
  try {
    const data = await knex
      .select(
        "id",
        "warehouse_name",
        "address",
        "city",
        "country",
        "contact_name",
        "contact_position",
        "contact_phone",
        "contact_email"
      )
      .from("warehouses");
    res.status(200).json(data);
  } catch (e) {
    res.status(400).send(`Error retrieving warehouses: ${e}`);
  }
};

// to get a specific warehouse based on id; includes all information
const findOne = async (req, res) => {
  try {
    const warehouseFound = await knex("warehouses").where({
      id: Number(req.params.id),
    });

    if (warehouseFound.length === 0) {
      return res.status(404).json({
        message: `User with ID ${req.params.id} not found`,
      });
    }
    const warehouseData = warehouseFound[0];
    res.json(warehouseData);
  } catch (e) {
    res.status(500).json({
      message: `Unable to retrieve warehouse data for warehouse with ID ${req.params.id}`,
    });
  }
};

// delete a warehouse
const deleteWarehouse = async (req, res) => {
  try {
    const deletedRow = await knex("warehouses")
      .where({ id: req.params.id })
      .delete();

    if (deletedRow === 0) {
      return res.status(404).json({
        message: "No such warehouse",
      });
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(404).json({
      message: "Unable to delete warehouse",
    });
  }
};

// to get inventories for a given warehouse
const getInventory = async (req, res) => {
  try {
    const inventoryItems = await knex("warehouses")
      .join("inventories", "inventories.warehouse_id", "warehouses.id")
      .where({ warehouse_id: req.params.id })
      .select(
        "inventories.id",
        "inventories.item_name",
        "inventories.category",
        "inventories.status",
        "inventories.quantity"
      );

    if (inventoryItems.length === 0) {
      return res.status(404).json({
        message: `Could not find any items for warehouse with ID ${req.params.id}.`,
      });
    }
    res.status(200).json(inventoryItems);
  } catch (e) {
    res.status(500).json({
      message: `Unable to retrieve inventory items for warehouse with ID ${req.params.id}: ${e}`,
    });
  }
};

function formatPhoneNumber(phoneNumber) {
  
  const phonePattern = /^\+(\d{1,2})\s?\((\d{3})\)\s?(\d{3})-(\d{4})$/;
  

  if (phonePattern.test(phoneNumber)) {
    return true;
  } else {
    return false;
  }
}

const createNewWarehouse = async (req, res) => {


  if (
    !req.body.warehouse_name ||
    !req.body.address ||
    !req.body.city ||
    !req.body.country ||
    !req.body.contact_name ||
    !req.body.contact_position
  ) {
    return res.status(400).json({
      message: "Please fill in all the required fields",
    });
  }
  if (!req.body.contact_phone || !formatPhoneNumber(req.body.contact_phone)) {
    return res.status(400).json({
      message: "Please provide a valid phone number",
    });
  }

  if (!req.body.contact_email || !req.body.contact_email.includes("@")) {
    return res.status(400).json({
      message: "Please provide a valid email address",
    });
  }

  try {
    const {
      warehouse_name,
      address,
      city,
      country,
      contact_name,
      contact_position,
      contact_phone,
      contact_email,
    } = req.body;

    const [id] = await knex("warehouses").insert({
      warehouse_name,
      address,
      city,
      country,
      contact_name,
      contact_position,
      contact_phone,
      contact_email,
    });

    const newWarehouse = await knex("warehouses").where({ id }).first();

    res.status(201).json(newWarehouse);
  } catch (error) {
    res.status(500).json({ error: "Failed to  create new warehouse." });
  }
};

const updateWarehouse = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      warehouse_name,
      address,
      city,
      country,
      contact_name,
      contact_position,
      contact_phone,
      contact_email,
    } = req.body;

    const warehouse = await knex("warehouses")
      .where({ id: req.params.id })
      .first();
    if (!warehouse) {
      return res.status(404).json({ error: "Warehouse does not exist" });
    }

    await knex("warehouses").where({ id }).update({
      warehouse_name,
      address,
      city,
      country,
      contact_name,
      contact_position,
      contact_phone,
      contact_email,
    });
    const updatedWarehouse = await knex("warehouses").where({
      id: req.params.id,
    });
    res.status(200).json(updatedWarehouse[0]);
  } catch (e) {
    res.status(500).json({ error: "Failed to update warehouse" });
  }
};

export {
  validateWarehouse,
  index,
  findOne,
  deleteWarehouse,
  getInventory,
  updateWarehouse,
  createNewWarehouse,
};
