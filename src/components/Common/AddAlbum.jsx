import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { apiConnecter } from '../../services/apiconnecter';
import toast from 'react-hot-toast';

const AddAlbum = () => {
  const [loader, setLoader] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('Name', data.Name);
    formData.append('Url', data.Url);
    formData.append('Image', data.Image[0]); // Assuming 'Image' is the file input
    formData.append('AlbumName', data.AlbumName);
    formData.append('AlbumImg', data.AlbumImg[0]); // Assuming 'AlbumImg' is the file input
    formData.append('ArtistName', data.ArtistName);
    formData.append('ArtistImage', data.ArtistImage[0]); // Assuming 'ArtistImage' is the file input

    const loaderId = toast.loading('Loading...');
    try {
      const res = await apiConnecter('POST', 'tracks/CreateAlbum', formData);
      console.log(res);
      toast.success("Album Added successfully")
      toast.dismiss(loaderId);
    } catch (err) {
      toast.dismiss(loaderId);
      console.log(err);
    }
    console.log(data);
    // Handle the form submission logic here
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mb-[300px] max-w-md mx-auto mt-8 p-6  w-full bg-white rounded-md shadow-md"
    >
      <div className="mb-4">
        <label className="block text-gray-700">Song Name:</label>
        <input
          type="text"
          {...register('Name', { required: 'Song Name is required' })}
          className="w-full px-3 py-2 border rounded-md"
        />
        {errors.Name && <p className="text-red-500">{errors.Name.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Song URL:</label>
        <input
          type="text"
          {...register('Url', { required: 'Song URL is required' })}
          className="w-full px-3 py-2 border rounded-md"
        />
        {errors.Url && <p className="text-red-500">{errors.Url.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Song Image:</label>
        <input
          type="file"
          {...register('Image', { required: 'Song Image is required' })}
          className="w-full px-3 py-2 border rounded-md"
        />
        {errors.Image && <p className="text-red-500">{errors.Image.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Album Name:</label>
        <input
          type="text"
          {...register('AlbumName', { required: 'Album Name is required' })}
          className="w-full px-3 py-2 border rounded-md"
        />
        {errors.AlbumName && <p className="text-red-500">{errors.AlbumName.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Album Image:</label>
        <input
          type="file"
          {...register('AlbumImg', { required: 'Album Image is required' })}
          className="w-full px-3 py-2 border rounded-md"
        />
        {errors.AlbumImg && <p className="text-red-500">{errors.AlbumImg.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Artist Name</label>
        <input
          type="text"
          {...register('ArtistName', { required: 'Artist Name is required' })}
          className="w-full px-3 py-2 border rounded-md"
        />
        {errors.ArtistName && <p className="text-red-500">{errors.ArtistName.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Artist Image URL:</label>
        <input
          type="file"
          {...register('ArtistImage', { required: 'Artist Image is required' })}
          className="w-full px-3 py-2 border rounded-md"
        />
        {errors.ArtistImage && <p className="text-red-500">{errors.ArtistImage.message}</p>}
      </div>

      <button
        type="submit"
        className="bg-black border border-black text-black px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};

export default AddAlbum;
