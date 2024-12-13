'use client'
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import {useRouter} from "next/navigation";
import Link from 'next/link';
function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [updatedName, setUpdatedName] = useState('');
  const router=useRouter();
  // Fetch product data from the API
   
    async function fetchProducts() {
      try {
        const response = await fetch('https://crud.teamrabbil.com/api/v1/ReadProduct');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    }

     


  useEffect(() => {
    fetchProducts();
  }, []);


   //console.log('first',products);
  // Handle Update
  async function handleUpdate(productId) {
    try {
      const response = await fetch(`https://api.example.com/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: updatedName }),
      });

      if (response.ok) {
        const updatedProduct = await response.json();
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === productId ? { ...product, name: updatedName } : product
          )
        );
        setEditingProduct(null);
        setUpdatedName('');
        alert('Product updated successfully');
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  }

  // Handle Delete
  async function handleDelete(productId) {
     
    try {
      const response = await fetch(`https://crud.teamrabbil.com/api/v1/DeleteProduct/${productId}`, {
        method: 'GET',
        headers: {           
          'Content-Type': 'application/json',
        },
      });
     

      if (response.ok) {
        toast.success('Product deleted successfully');
        fetchProducts();

      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr className='text-[darkcyan] font-bold text-lg'>         
        <th>Img</th>
        <th>Name</th>
        <th>code</th>
        <th>Qty</th>
        <th>Unit Price</th>
        <th>Total Price</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
    
      {products["data"].map((product) => 
          (
            

<tr key={product._id}>
         
        <td>
          <div className="flex items-center">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={product.Img}
                  alt="Img" />
              </div>
            </div>
            
          </div>
        </td>
        <td> {product.ProductName} </td>
        <td> {product.ProductCode} </td>
        <td> {product.Qty} </td>
        <td> {product.UnitPrice} </td>
        <td> {product.TotalPrice} </td>
         
        <td>
        <Link href={`/product/updateproduct/${product._id}`}>
                   <MdEdit  size={30} /> &nbsp; 
        </Link>
       

        <button onClick={() => handleDelete(product._id)}><MdDelete size={39} />
        </button>
        </td>
      </tr>




               
             
             
          )
           
        

        

        
      )}
</tbody>
</table>
</div>
    </div>
  );
}

export default ProductList;
