import DataCell from "../DataCell/DataCell";
import styles from "./DataRow.module.css";
import IconButton from "@mui/material/IconButton";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import KVEditor from "./KVEditor/KVEditor";
import { useState } from "react";

const lrip =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
const DataRow = ({ title, value, keyMetadata, valueMetadata, index }) => {
  const [viewEdit, setViewEdit] = useState(true);
  return (
    <div className={styles.DataRow}>
      <div className={styles.Main}>
        <IconButton
          color="primary"
          aria-label="add to shopping cart"
          onClick={() => setViewEdit(!viewEdit)}
        >
          <RemoveRedEyeIcon />
        </IconButton>
        <p className={styles.SampleData}>{title.substring()}</p>
        <p className={styles.SampleData}>{value}</p>
      </div>
      {viewEdit && <KVEditor index={index} />}
    </div>
  );
};

export default DataRow;
