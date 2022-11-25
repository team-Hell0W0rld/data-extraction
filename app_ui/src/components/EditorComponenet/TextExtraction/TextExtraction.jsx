import React, { useEffect, useState, useRef } from "react";
import Tesseract from "tesseract.js";

import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import { canvasPreview } from "./canvasPreview";
import { useDebounceEffect } from "./useDebounceEffect";
import { DocActions } from "../../../store/slices/selectedDoc";
import { useDispatch } from "react-redux";

import "react-image-crop/dist/ReactCrop.css";
import { alertClasses } from "@mui/material";
// import { get } from "immer/dist/internal";

export default function TextExtraction() {
  const [imgSrc, setImgSrc] = useState("");
  const previewCanvasRef = useRef(null);
  const parentImg = useRef(null);
  const parentImgRef = useRef(null);
  const imgRef = useRef(null);
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState();
  const [scale, setScale] = useState(1);
  // const [text, setText] = useState("");
  let key, value, keyMetadata, valueMetadata;
  // const [coOrdinates, setCoOrdinates] = useState({});
  let coOrdinates;

  const dispatch = useDispatch();

  function onSelectFile(e) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined); // Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result?.toString() || "")
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale
        );
      }
    },
    100,
    [completedCrop, scale]
  );

  // const getPosition = () => {
  //   // console.log(parentImgRef);
  //   // console.log(imgRef.current.getBoundingClientRect());
  //   // let parentPos = imgRef.current.getBoundingClientRect(),
  //   //   // childPos = document
  //   //   //   .getElementByClassName("ReactCrop__crop-selection")
  //   //   //   .getBoundingClientRect(),
  //   //   relativePos = {};

  //   // relativePos.top = childPos.top - parentPos.top;
  //   // relativePos.right = childPos.right - parentPos.right;
  //   // relativePos.bottom = childPos.bottom - parentPos.bottom;
  //   // relativePos.left = childPos.left - parentPos.left;

  //   // console.log(relativePos);

  // };

  const addAsKey = () => {
    const cb = (text) => {
      if (text) key = text;
      console.log("key", key);
      // getPosition();
      keyMetadata = JSON.parse(JSON.stringify(coOrdinates));
    };
    getCurrentText(cb);
  };

  const addAsValue = () => {
    const cb = (text) => {
      if (text) value = text;
      console.log("value", value);
      console.log(coOrdinates);
      valueMetadata = JSON.parse(JSON.stringify(coOrdinates));
      console.log(coOrdinates);
      console.log(valueMetadata);
    };
    getCurrentText(cb);
  };

  const getCurrentText = (cb) => {
    console.log(previewCanvasRef);
    let can = previewCanvasRef.current;
    let ctx = can.getContext("2d");

    ctx.fillRect(50, 50, 50, 50);

    var img = new Image();
    img.src = can.toDataURL();
    if (!completedCrop) {
      cb();
      return;
    }
    // console.log(img);
    // Tesseract.recognize(img.src, "eng", {
    //   logger: (m) => console.log(m),
    // });
    Tesseract.recognize(img, "eng")
      .catch((err) => {
        console.error(err);
      })
      .then((result) => {
        console.log(result);
        let newText = result.data.text;
        console.log(newText);
        // setText(newText);
        cb(newText);
      });
  };

  const handleSave = () => {
    console.log(key, value);
    if (!value) {
      alert("Please select the value");
      return;
    }
    const newData = { title: key, value: value, keyMetadata, valueMetadata };
    console.log(newData);
    dispatch(DocActions.addData(newData));
  };

  const fillCoOrdinates = (c) => {
    coOrdinates = {
      x: c.x,
      y: c.y,
      height: c.height,
      width: c.width,
    };
    // console.log(coOrdinates);
    // setCoOrdinates(coOrdinates);
    console.log(coOrdinates);
  };

  return (
    <div className="App">
      <div className="Crop-Controls">
        <input type="file" accept="image/*" onChange={onSelectFile} />
        <div>
          <label htmlFor="scale-input">Scale: </label>
          <input
            id="scale-input"
            type="number"
            step="0.1"
            value={scale}
            disabled={!imgSrc}
            onChange={(e) => setScale(Number(e.target.value))}
          />
        </div>
      </div>
      {!!imgSrc && (
        <ReactCrop
          ref={parentImgRef}
          crop={crop}
          onChange={(_, percentCrop) => setCrop(percentCrop)}
          onComplete={(c) => {
            fillCoOrdinates(c);

            setCompletedCrop(c);
          }}
        >
          <img
            alt="Crop me"
            ref={imgRef}
            src={imgSrc}
            style={{ transform: `scale(${scale})` }}
          />
        </ReactCrop>
      )}
      <div>
        {!!completedCrop && (
          <canvas
            ref={previewCanvasRef}
            style={{
              border: "1px solid black",
              objectFit: "contain",
              width: completedCrop.width,
              height: completedCrop.height,
            }}
          />
        )}
        <button onClick={addAsKey} style={{ height: 50 }}>
          {" "}
          add as Key
        </button>
        <button onClick={addAsValue} style={{ height: 50 }}>
          {" "}
          add as Value
        </button>
        <button onClick={handleSave} style={{ height: 50 }}>
          {" "}
          Save to DB
        </button>
      </div>
    </div>
  );
}
