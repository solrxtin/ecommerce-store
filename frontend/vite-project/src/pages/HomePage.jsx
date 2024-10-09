import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useProductStore } from '../store/product.js'
import ProductCard from '../components/ProductCard.jsx'


const Homepage = () => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts])

  console.log(products)
  return (
    <div className='py-12'>
        <div className="">
            <div className="w-full text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent uppercase text-center pb-4">
                Current Products 🚀
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 w-full mx-2 lg:mx-10 xl:mx-20">
                {products.map(product => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
            {products.length === 0 &&
                <div className="text-xl text-center font-semibold text-gray-500 pb-4">
                No products found 😢{" "}
                <Link to={"/create"}>
                    <span className="text-blue-500 hover:underline">
                        Create a product
                    </span>
                </Link>
            </div>
            }
        </div>
    </div>
  )
}

export default Homepage