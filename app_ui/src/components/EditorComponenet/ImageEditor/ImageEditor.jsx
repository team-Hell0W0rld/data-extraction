import styles from "./ImageEditor.module.css";
// import TextExtraction from "../TextExtraction/TextExtraction";
import TextExtraction from "../TextExtraction/TextExtraction";

const ImageEditor = () => {
  return (
    <div className={styles.ImageEditor}>
      <h1>Image Editor</h1>
      {/* <TextExtraction /> */}
      <TextExtraction />
    </div>
  );
};

export default ImageEditor;
