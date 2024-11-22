import React, { useState } from 'react';
import axios from 'axios';

function Card() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState('');
  const [country, setCountry] = useState('');
  const [location, setLocation] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', image);
    formData.append('price', price);
    formData.append('country', country);
    formData.append('location', location);

    try {
      // Send form data to API
      const response = await axios.post('http://localhost:8000/api/listings/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Listing created successfully!');
      console.log(response.data);
      
      // Clear form inputs after submission
      setTitle('');
      setDescription('');
      setImage(null);
      setPrice('');
      setCountry('');
      setLocation('');
    } catch (error) {
      console.error('Error creating listing:', error);
      alert('Failed to create listing. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4 md:px-0">
      <h1 className="text-3xl font-semibold text-blue-500 mb-8">Create a New Listing</h1>

      <form
        onSubmit={handleFormSubmit}
        className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 space-y-6"
      >
        {/* Title */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Title</label>
          <input
            type="text"
            id='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Description</label>
          <textarea
          id='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          ></textarea>
        </div>

        {/* Upload Image */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Upload Image</label>
          <input
          name='image'
            type="file"
            id='image'
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Price ($)</label>
          <input
            type="number"
            id='price'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* Country */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Country</label>
          <input
            type="text"
            id='country'
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Enter country"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Location</label>
          <input
            type="text"
            id='location'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* Add Button */}
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default Card;
