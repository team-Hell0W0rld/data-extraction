import styles from "./ImageEditor.module.css";
import TextExtraction from "../../testExtraction";

const ImageEditor = () => {
  return (
    <div className={styles.ImageEditor}>
      <h1>Image Editor</h1>
      <TextExtraction />
    </div>
  );
};

export default ImageEditor;
