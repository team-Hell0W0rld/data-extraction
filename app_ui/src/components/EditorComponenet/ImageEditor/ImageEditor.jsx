import styles from "./ImageEditor.module.css";
// import TextExtraction from "../TextExtraction/TextExtraction";
import TextExtractionFinal from "../TextExtraction/TextExtractionFinal";

const ImageEditor = () => {
  return (
    <div className={styles.ImageEditor}>
      <h1>Image Editor</h1>
      {/* <TextExtraction /> */}
      <TextExtractionFinal />
    </div>
  );
};

export default ImageEditor;
