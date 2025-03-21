"use client";
import { authenticator } from "@/lib/imagekitAuthenticator";
import { IKUpload, ImageKitProvider } from "imagekitio-next";
import { useEffect, useState } from "react";

export default function ImageUpload() {
  const [isFileValid, setIsFileValid] = useState(true);
  const [fileValidationError, setFileValidationError] = useState(undefined);

  const onError = (err) => {
    console.log("Error", err);
  };

  const onSuccess = (res) => {
    console.log("Success", res);
  };

  function validateFile(file) {
    if (file?.size > 5 * 1024 * 1024) {
      setIsFileValid(false);
      setFileValidationError("File must be less than 5MB in size.");
      return false;
    }
    if (!file?.type?.startsWith("image/")) {
      setIsFileValid(false);
      setFileValidationError("File must be an image");
      return false;
    }
    setIsFileValid(true);
    setFileValidationError(undefined);
    return true;
  }

  useEffect(() => {
    if (!isFileValid) {
      alert(
        fileValidationError ??
          "File is not valid. Please make sure it is an image, and less than 5MB in size."
      );
      setIsFileValid(true);
      setFileValidationError(undefined);
    }
  }, [isFileValid, fileValidationError]);

  return (
    <ImageKitProvider
      publicKey={process.env.NEXT_PUBLIC_PUBLIC_KEY}
      urlEndpoint={process.env.NEXT_PUBLIC_URL_ENDPOINT}
      authenticator={authenticator}
    >
      <p>Upload an image</p>
      <IKUpload
        fileName="test-upload1234"
        validateFile={validateFile}
        onError={onError}
        onSuccess={onSuccess}
      />
    </ImageKitProvider>
  );
}
