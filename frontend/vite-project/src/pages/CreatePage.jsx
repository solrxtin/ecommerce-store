import { useState } from 'react';
import { useColorModeValue, Box, Button, useToast } from '@chakra-ui/react';

import { useProductStore } from '../store/product.js';
import ImageUpload from '../components/ImageUpload.jsx';

const CreatePage = () => {
  const [ newProduct, setNewProduct ] = useState({
    name: "",
    price: "",
    image: "",
  });
  const [imageUploading, setImageUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const { createProduct } = useProductStore();
  const toast = useToast();

  const handleSubmit = async () => {
    // Send the newProduct object (including the image URL) to the backend
    console.log("Submitting product:", newProduct);
    const { success, message } = await createProduct(newProduct);
		if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				isClosable: true,
			});
		} else {
			toast({
				title: "Success",
				description: message,
				status: "success",
				isClosable: true,
			});
		}
		setNewProduct({ name: "", price: "", image: "" });
        setImagePreview("")
  };

  return (
    <div>
        <h1 className='text-2xl text-center mt-2 lg:mt-5 mb-2' color={useColorModeValue("gray.800", "white")}>Create New Product</h1>
        <Box className='w-full lg:w-[50%] p-6 rounded-lg shadow-md flex flex-col gap-4 lg:gap-6 mx-auto' bg={useColorModeValue("white", "gray.800")} >
            <input
                className=' rounded-md p-4 mx-auto w-full'
                placeholder='Product Name'
                type='text'
                value={newProduct.name}
                onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                }
            />
            <input
                className='w-full rounded-md p-4 mx-auto'
                placeholder='Product Price'
                type='number'
                value={newProduct.price}
                onChange={(e) =>
                    setNewProduct({ ...newProduct, price: e.target.value })
                }
            />
            <ImageUpload imageUploading={imageUploading} setImageUploading={setImageUploading} setNewProduct={setNewProduct} newProduct={newProduct} imagePreview={imagePreview} setImagePreview={setImagePreview}/>
            <Button
                className="mt-6"
                colorScheme="blue"
                onClick={handleSubmit}
                isDisabled={imageUploading}
            >
                Submit Product
            </Button>
        </Box>
    </div>
  )
}

export default CreatePage