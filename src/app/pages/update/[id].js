import { useState } from 'react';

const UpdateForm = ({ initialData }) => {
  const [formData, setFormData] = useState({
    name: initialData.name,
    email: initialData.email,
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://api.example.com/users/' + initialData.id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage('Update successful!');
      } else {
        setMessage('Update failed. Please try again.');
      }
    } catch (error) {
      console.error(error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <h1>Update User</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.query;

  // Fetch initial data from the external API
  const response = await fetch(`https://api.example.com/users/${id}`);
  const data = await response.json();

  return {
    props: { initialData: data }, // Pass initial data to the page
  };
}

export default UpdateForm;
