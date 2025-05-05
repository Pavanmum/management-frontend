import { useEffect, useState } from 'react';
import axios from 'axios';

const User = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [editingId, setEditingId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    try{
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/auth/getUsers`,{
        withCredentials: true,
    });
    setUsers(res.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("Failed to fetch users. Please try again.");
    }

  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    const payload = {
      username: form.username,
      email: form.email,
      password: form.password,
    };

    if (editingId) {
        try {
            const res = await axios.put(`${import.meta.env.VITE_API_URL}/auth/updateUser?id=${editingId}`, payload,{
                withCredentials: true,
            });
            if(res.status === 200) {
                alert("User updated successfully!");
            }   
            
        } catch (error) {
            console.error("Error updating user:", error);
            alert("Failed to update user. Please try again.");
            }
    } else {
        try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/adduser`, payload,{
        withCredentials: true
      });
        if(res.status === 201) {
            alert("User added successfully!");
        }
            
        } catch (error) {
            console.error("Error adding user:", error);
            alert("Failed to add user. Please try again.");   
        }
    }

    setForm({ username: '', email: '', password: ''  });
    setEditingId(null);
    fetchUsers();
  };

  const handleEdit = (user) => {
    setForm(user);
    setEditingId(user._id);
  };

  const handleDelete = async (id) => {
    try {
        const res = await axios.delete(`${import.meta.env.VITE_API_URL}/auth/deleteUser?id=${id}`,{
            withCredentials: true,
        });
        if(res.status === 200) {
            alert("User deleted successfully!");
            fetchUsers();

        }
    } catch (error) {
        console.error("Error deleting user:", error);
        alert("Failed to delete user. Please try again.");
    }
   
  };

  const handleView = (users) => {
    setSelectedUser(users);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4 text-center">User Details</h1>

        <form onSubmit={handleAddOrUpdate} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleInputChange}
            placeholder="UserName"
            className="border p-2 rounded"
            required
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="border p-2 rounded"
            required
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleInputChange}
            placeholder="password"
            className="border p-2 rounded"
            required
          />
          <button
            type="submit"
            className="col-span-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
          >
            {editingId ? 'Update User' : 'Add User'}
          </button>
        </form>

        <table className="w-full table-auto border text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-2 py-1">Username</th>
              <th className="border px-2 py-1">Email</th>
              <th className="border px-2 py-1">Actions</th>

            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="text-center">
                <td className="border px-2 py-1">{user.username}</td>
                <td className="border px-2 py-1">{user.email}</td>
                <td className="border px-2 py-1 space-x-2">
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded"
                    onClick={() => handleView(user)}
                  >
                    View
                  </button>
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                    onClick={() => handleEdit(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* View Modal */}
        {selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-96 shadow-xl">
              <h2 className="text-xl font-bold mb-4">Product Details</h2>
              <p><strong>UserName:</strong> {selectedUser.username}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Created:</strong> {new Date(selectedUser.createdAt).toLocaleString()}</p>
              <button
                onClick={() => setSelectedUser(null)}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default User;
