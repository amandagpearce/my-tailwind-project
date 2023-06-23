import React, { useRef, useState, useEffect } from 'react';

import Button from './Button';
import './ImageUpload.css';

const ImageUpload = (props) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);
  const filePickerRef = useRef();

  // will trigger whenever the file changes
  useEffect(() => {
    if (!file) {
      return;
    }

    // initializes the FileReader web API
    const fileReader = new FileReader();

    // this anonymous fn will execute once .readAsDataURL is done
    fileReader.onload = () => {
      // updating the previewUrl state
      setPreviewUrl(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid;

    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];

      setFile(pickedFile);
      setIsValid(true);

      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }

    // args to execute inputHandler in the Auth component
    props.onInput(props.id, pickedFile, fileIsValid);
  };

  const pickImageHandler = () => {
    // triggering a click on the hidden file picker
    filePickerRef.current.click();
  };

  return (
    <div className="form-control">
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: 'none' }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      <div className="image-upload flex flex-wrap items-center justify-center">
        <div className="image-upload__preview flex items-center w-full">
          {previewUrl && <img src={previewUrl} alt="Preview" />}
          {!previewUrl && <p>Please pick an image.</p>}
        </div>
        <Button type="button" onClick={pickImageHandler}>
          PICK IMAGE
        </Button>
      </div>
    </div>
  );
};

export default ImageUpload;
