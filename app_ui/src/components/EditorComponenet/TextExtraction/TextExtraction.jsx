import { useState, useEffect, useRef } from "react";
import Cropper from "cropperjs";
import styles from "./TextExtraction.module.css";
import Tesseract from "tesseract.js";

function TextExtraction() {
  const [imagePath, setImagePath] = useState("");
  const [text, setText] = useState("");
  const imgEl = useRef(null);
  let stage;

  // we can pass coordinates to tesseract
  // just need to search for snipping tool

  useEffect(() => {
    console.log(window.Jcrop);
    if (!imagePath || imagePath.length === 0) return;
    // stage = window.Jcrop.attach("target", {
    //   shadeColor: "black",
    //   multi: true,
    // });
    // stage.listen("crop.activate", function (widget, e) {
    //   const pos = widget.pos;
    //   console.log(pos.x, pos.y, pos.w, pos.h);
    // });
    // console.log(stage);
    const cropper = new Cropper(imgEl.current);

    let imgsrc = cropper.getCroppedCanvas({ width: "50px" }).toDataURL();
    console.log(imgsrc);
  }, [imagePath]);

  const handleChange = (event) => {
    setImagePath(URL.createObjectURL(event.target.files[0]));
  };

  const handleClick = () => {
    // Tesseract.recognize(imagePath, "eng", {
    //   logger: (m) => console.log(m),
    // })
    Tesseract.recognize(imagePath, "eng")
      .catch((err) => {
        console.error(err);
      })
      .then((result) => {
        let text = result.data.text;
        console.log(text);
        setText(text);
      });
    // window.Jcrop.destroy();
    // stage.listen("crop.move", function (widget, e) {
    //   const pos = widget.pos;
    //   console.log(pos.x, pos.y, pos.w, pos.h);
    // });
    // console.log(imgEl);
    // const cropper = new Cropper(imgEl.current, {
    //   crop(event) {
    //     console.log(event);
    //     // console.log(event.detail.x);
    //     // console.log(event.detail.y);
    //     // console.log(event.detail.width);
    //     // console.log(event.detail.height);
    //   },
    // });
    // console.log(cropper);
    // console.table(stage);
  };

  return (
    <div className="App">
      <main className="App-main">
        <h3>Actual imagePath uploaded</h3>

        {/* <img
          src={imagePath}
          className={styles.target}
          alt="logo"
          id="target"
          style={{ zIndex: 0 }}
          ref={imgEl}
        /> */}

        <h3>Extracted text</h3>
        <div className="text-box">
          <p> {text} </p>
        </div>
        <input type="file" onChange={handleChange} />
        {/* <button onClick={handleClick} style={{ height: 50 }}> */}
        <button onClick={handleClick} style={{ height: 50 }}>
          {" "}
          convert to text
        </button>
      </main>
    </div>
  );
}

export default TextExtraction;
