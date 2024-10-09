import React, { useState } from 'react'
import { 
    useColorModeValue, 
    useDisclosure, 
    Button,
    IconButton, 
    useToast, 
    Modal, 
    ModalOverlay, 
    ModalContent, 
    ModalHeader, 
    ModalCloseButton, 
    ModalBody, 
    VStack, 
    Input, 
    ModalFooter 
} from '@chakra-ui/react'
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useProductStore } from '../store/product.js';
import ImageUpload from './ImageUpload.jsx';

const ProductCard = ({product}) => {
    const [updatedProduct, setUpdatedProduct] = useState(product);
    const textColor = useColorModeValue("gray.600", "gray.200");
	const bg = useColorModeValue("white", "gray.800");
    const [imageUploading, setImageUploading] = useState(false);
    const [imagePreview, setImagePreview] = useState("");

    const { isOpen, onOpen, onClose } = useDisclosure();

    const { deleteProduct, updateProduct } = useProductStore();
    const toast = useToast();
    const handleDeleteProduct = async (productId) => {
        const { success, message } = await deleteProduct(productId);
        if (!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 3000,
                isClosable: true
            })
        } else {
            toast({
                title: "Success",
                description: message,
                status: "success",
                duration: 3000,
                isClosable: true
            })
        }
    }

    const handleUpdateProduct = async (pid, updatedProduct) => {
		const { success, message } = await updateProduct(pid, updatedProduct);
		onClose();
		if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		} else {
			toast({
				title: "Success",
				description: "Product updated successfully",
				status: "success",
				duration: 3000,
				isClosable: true,
			});
		}
	};

  return (
    <div className='shadow-lg rounded-lg overflow-hidden transition-all delay-300 hover:-translate-y-5 hover:shadow-xl'>
        <img src={product.image} alt={product.name} className="h-48 w-full object-cover" />
        <div className="p-4">
            <div className="mb-2 text-lg">
                {product.name}
            </div>
            <div className="font-bold text-2xl mb-4">${product.price}</div>
            <div className="flex">
                <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme='blue' className='me-2'/>
                <IconButton
                    icon={<DeleteIcon />}
                    onClick={() => handleDeleteProduct(product._id)}
                    colorScheme='red'
                />
            </div>
        </div>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />

            <ModalContent>
                <ModalHeader>Update Product</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack>
                        <Input
                            placeholder='Product Name'
                            name='name'
                            value={updatedProduct.name}
                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                        />
                        <Input
                            placeholder='Price'
                            name='price'
                            type='number'
                            value={updatedProduct.price}
                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
                        />
                         <ImageUpload imageUploading={imageUploading} setImageUploading={setImageUploading} setNewProduct={setUpdatedProduct} newProduct={updatedProduct} imagePreview={imagePreview} setImagePreview={setImagePreview}/>
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <Button
                        colorScheme='blue'
                        mr={3}
                        onClick={() => handleUpdateProduct(product._id, updatedProduct)}
                    >
                        Update
                    </Button>
                    <Button variant='ghost' onClick={onClose}>
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </div>
  )
}

export default ProductCard