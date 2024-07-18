import "./StatusTag.scss";

function StatusTag({ status }) {
  const inStockClassName = "in-stock";
  const outOfStockClassName = "out-of-stock";
  const statusClass =
    status === "In Stock" ? inStockClassName : outOfStockClassName;

  return <p className={statusClass}>{status}</p>;
}

export default StatusTag;
