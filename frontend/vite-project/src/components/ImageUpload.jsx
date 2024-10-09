import React, {useState} from 'react'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../config/firebaseConfig.js';


const ImageUpload = ({imageUploading, setImageUploading, setNewProduct, newProduct, imagePreview, setImagePreview}) => {
    const [imageUploadProgress, setImageUploadProgress] = useState(0);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0]; // Get the uploaded file
        if (file) {
          setImagePreview(URL.createObjectURL(file)); // Show image preview
          setImageUploading(true);
    
          // Create a storage reference to store the file in Firebase
          const storageRef = ref(storage, `products/${file.name}`);
          console.log(storageRef)
          console.log(file)
          // Upload the file to Firebase Storage
          const uploadTask = uploadBytesResumable(storageRef, file);
    
          // Monitor the upload process
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              // Calculate and update upload progress
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setImageUploadProgress(progress);
              console.log("Upload is " + progress + "% done");
            },
            (error) => {
              // Handle any errors
              console.error("Error uploading image:", error);
              setImageUploading(false);
            },
            () => {
              // On complete, get the download URL
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log("File available at", downloadURL);
                setImageUploading(false);
                setNewProduct({...newProduct, image: downloadURL})
              });
            }
          );
        }
      };

    return (
        <>
            <input
                className='w-full mx-auto' 
                type="file" // Use type="file" for image uploads
                accept="image/*" // Accept image files only
                onChange={handleImageUpload} 
            />

            {imagePreview && (
                <div className="mt-4">
                    <h2 className="text-lg">Image Preview:</h2>
                    <img
                    src={imagePreview}
                    alt="Product Preview"
                    className="mt-2 rounded-md"
                    style={{ maxWidth: "100%" }}
                    />
                </div>
            )}
            {imageUploading && <p>Uploading image...</p>}
            {imageUploading && (
            <div className="mt-4">
                <p>Uploading image: {Math.round(imageUploadProgress)}%</p> 
            </div>
            )}
        </>
    )
}

export default ImageUpload