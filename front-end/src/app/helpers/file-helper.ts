import { ChangeEvent } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebase-config";

function getFile(
  event: ChangeEvent<HTMLInputElement>,
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>
) {
  if (event.target.files) {
    const currentFile = event.target.files[0];
    setFile(currentFile);
  }
}

async function postImage(file: File) {
  const imageRef = ref(storage, file.name);
  await uploadBytes(imageRef, file);
  const url = await getDownloadURL(imageRef);
  return url;
}

export { getFile, postImage };
