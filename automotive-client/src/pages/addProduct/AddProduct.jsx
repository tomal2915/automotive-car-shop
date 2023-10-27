
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const AddProduct = () => {

  const handleSubmit = (event) => {

    event.preventDefault();

    const form = new FormData(event.currentTarget);

    const image = form.get('image');
    const name = form.get('name');
    const brandName = form.get('brandName');
    const brandImage = form.get('brandImage');
    const price = form.get('price');
    const shortDescription = form.get('shortDescription');
    const rating = form.get('rating');

    const myData = {
      image,
      name,
      brandName,
      brandImage,
      price,
      shortDescription,
      rating,
    }
    // console.log(myData);

    // data create or post using axios
    axios.post('https://automotive-server-fr7lqmtf0-tomal-s-projects.vercel.app/products', myData, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => {
        if (response.status === 200) {
          // Product added successfully, so display the toast message
          toast('Product added successfully');
          console.log(response.data);
        } else {
          // Handle errors or failed responses here
          throw new Error('Failed to add the product');
        }
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });

      form.current.reset();

  };

  return (
    <div className="max-w-7xl mx-auto border">
      <h2 className="text-5xl font-bold text-center m-4">Add Product</h2>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 p-4 text-2xl">
          <div className="space-x-4">
            <label>Car Image URL:</label>
            <input
              type="text"
              name="image"
              className="input input-bordered"
            />
          </div>
          <div className="space-x-4">
            <label>Car Model:</label>
            <input
              type="text"
              name="name"
              className="input input-bordered"
            />
          </div>
          <div className="space-x-4">
            <label>Brand Name:</label>
            <input
              type="text"
              name="brandName"
              className="input input-bordered"
            />
          </div>
          <div className="space-x-4">
            <label>Brand Image URL:</label>
            <input
              type="text"
              name="brandImage"
              className="input input-bordered"
            />
          </div>
          <div className="space-x-4">
            <label>Price:</label>
            <input
              type="text"
              name="price"
              className="input input-bordered"
            />
          </div>
          <div className="space-x-4">
            <label>Short Description:</label>
            <input
              type="text"
              name="shortDescription"
              className="input input-bordered"
            />
          </div>
          <div className="space-x-4">
            <label>Rating:</label>
            <input
              type="text"
              name="rating"
              className="input input-bordered"
            />
          </div>
        </div>
        <div className="flex justify-center m-4">
          <button type=" submit" className="btn bg-slate-600 text-yellow-50">Add Product</button>
        </div>
      </form>
    </div>
  )
}

export default AddProduct