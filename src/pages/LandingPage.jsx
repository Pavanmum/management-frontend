import { useEffect, useState } from 'react';
import axios from 'axios';
import User from '../components/User';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', price: '' });
  const [editingId, setEditingId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigation = useNavigate();

  const fetchProducts = async () => {
    try{
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/product`,{
      withCredentials: true,
    });
    setProducts(res.data.products);
  }catch (error) {
    console.error("Error fetching products:", error);
    alert("Failed to fetch products. Please try again.");
  }
  };

  const fetchUserDetails = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/auth/profileDetails`, {
        withCredentials: true,
      });
      console.log("User details:", res.data);
      localStorage.setItem("user", JSON.stringify(res.data.user));
    } catch (error) {
      console.error("Error fetching user details:", error);
      alert("Failed to fetch user details. Please try again.");
    }
  }

  const userString = localStorage.getItem('user');
  const user = JSON.parse(userString); 
  

  useEffect(() => {
    fetchProducts();
    fetchUserDetails();
  }, []);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    const payload = {
      name: form.name,
      description: form.description,
      price: Number(form.price),
    };

    if (editingId) {
      try {
        const res = await axios.put(`${import.meta.env.VITE_API_URL}/product?id=${editingId}`, payload, {
          withCredentials: true,
        });
        if(res.status === 200) {
          alert("Product updated successfully!");
        }
      } catch (error) {
        console.error("Error updating product:", error);
        alert("Failed to update product. Please try again.");
      }
    } else {
      try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/product`, payload, {
          withCredentials: true,
        });
        if(res.status === 200) {
          alert("Product added successfully!");
        }
      } catch (error) {
        console.error("Error adding product:", error);
        alert("Failed to add product. Please try again.");
        
      }
    }

    setForm({ name: '', description: '', price: '' });
    setEditingId(null);
    fetchProducts();
  };

  const handleEdit = (product) => {
    setForm(product);
    setEditingId(product._id);
  };

  const handleDelete = async (id) => {
    // await axios.delete(`${import.meta.env.VITE_API_URL}/products/${id}`);
    try {
      const res = await axios.delete(`${import.meta.env.VITE_API_URL}/product?id=${id}`, {
        withCredentials: true,
      });
      if(res.status === 200) {
        alert("Product deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product. Please try again.");
    }
    fetchProducts();
  };

  const handleView = (product) => {
    setSelectedProduct(product);
  };

  const handleLogout = async() => {
    try {
       await axios.post(`${import.meta.env.VITE_API_URL}/auth/logout`,"", {
        withCredentials: true,
      });
        alert("Logged out successfully!");
        localStorage.removeItem('user');
        navigation('/login');
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Failed to log out. Please try again.");
    }
  }
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded shadow">
      {user && (
        <div className="mb-4 flex justify-between items-center">
          <div className='flex justify-between items-center w-full '>
            <div>
            <h2 className="text-2xl font-semibold">Welcome, {user.username || 'User'}!</h2>
            <p className="text-lg text-gray-600">Email: {user.email}</p>

            <p className="text-lg text-gray-600">Role: {user.role}</p>
            </div>
            <div>
              <button className='bg-red-500 text-white px-2 py-1 rounded'
              onClick={() => {handleLogout();}
              }
              >
                logout
              </button>
            </div>
          </div>
        </div>
      )}


        <h1 className="text-2xl font-bold mb-4 text-center">Product Management</h1>

        <form onSubmit={handleAddOrUpdate} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleInputChange}
            placeholder="Product Name"
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleInputChange}
            placeholder="Description"
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleInputChange}
            placeholder="Price"
            className="border p-2 rounded"
            required
          />
          <button
            type="submit"
            className="col-span-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
          >
            {editingId ? 'Update Product' : 'Add Product'}
          </button>
        </form>

        <table className="w-full table-auto border text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-2 py-1">Name</th>
              <th className="border px-2 py-1">Description</th>
              <th className="border px-2 py-1">Price</th>
              <th className="border px-2 py-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="text-center">
                <td className="border px-2 py-1">{product.name}</td>
                <td className="border px-2 py-1">{product.description}</td>
                <td className="border px-2 py-1">₹{product.price}</td>
                <td className="border px-2 py-1 space-x-2">
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded"
                    onClick={() => handleView(product)}
                  >
                    View
                  </button>
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                    onClick={() => handleEdit(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* View Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-96 shadow-xl">
              <h2 className="text-xl font-bold mb-4">Product Details</h2>
              <p><strong>Name:</strong> {selectedProduct.name}</p>
              <p><strong>Description:</strong> {selectedProduct.description}</p>
              <p><strong>Price:</strong> ₹{selectedProduct.price}</p>
              <p><strong>Created:</strong> {new Date(selectedProduct.createdAt).toLocaleString()}</p>
              <button
                onClick={() => setSelectedProduct(null)}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
      {(user.role === "admin")  && (
      <User/>)}
    </div>
  );
};

export default LandingPage;
