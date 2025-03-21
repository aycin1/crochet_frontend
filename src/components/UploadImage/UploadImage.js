import {
  authenticator,
  publicKey,
  urlEndpoint,
} from "@/lib/imagekitAuthenticator";
import { IKContext, IKUpload } from "imagekitio-react";

export default function UploadImage() {
  const onError = (err) => {
    console.log("Error", err);
  };

  const onSuccess = (res) => {
    console.log("Success", res);
  };

  return (
    <IKContext
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <p>Upload an image</p>
      <IKUpload
        fileName="test-upload.png"
        onError={onError}
        onSuccess={onSuccess}
      />
    </IKContext>
  );
}
