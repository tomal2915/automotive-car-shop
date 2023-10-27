import { useContext, useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { context } from "../../context/AuthContext";
import Swal from "sweetalert2";
import axios from "axios";

const MyCart = () => {

  const { _id } = useParams();

  const details = useLoaderData();
  const { user } = useContext(context);

  // Filter the details based on user email
  const userCartDetails = details.filter((item) => item.email === user.email);

  const [data, setData] = useState(userCartDetails);
  const [loading, setLoading] = useState(null);

  const handleDelete = _id => {
    console.log(_id);
    console.log(details, 'details');

    const apiUrl = `https://automotive-server-fr7lqmtf0-tomal-s-projects.vercel.app/carts/${_id}`;
    axios.delete(apiUrl)
      .then(() => {
        // Handle the successful deletion operation here

        // Update the data or perform any other necessary actions
        // Update the local state with the removed item filtered out
        const updatedCartItems = details.filter(cart => cart._id !== _id);
        console.log(updatedCartItems, 'updatedCartItems');
        setData(updatedCartItems);

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
        setLoading(false);
      });
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 mb-6">
      {data.length > 0 ? (
        data.map((item, index) => (
          <div key={index}>
            <div className="card card-side">
              <figure><img src={item.cart[0].image} alt="image" /></figure>
              <div className="card-body">
                <h2 className="card-title font-bold">{item.cart[0].name}</h2>
                <h1 className="font-bold">Brand: {item.cart[0].brandName}</h1>
                <p className="font-bold">Price: {item.cart[0].price}</p>
                <p className="font-bold">Rating: {item.cart[0].rating}</p>
                <p> {item.cart[0].shortDescription}</p>
              </div>
            </div>
            <div className="card-actions justify-center">
              <button className="btn bg-blue-400" onClick={() => handleDelete(item._id)} >Remove</button>
            </div>
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center gap-6 h-screen">
          <p className="text-5xl font-bold text-center">
            No data found for cart.
          </p>
        </div>
      )}
    </div>
  );
};

export default MyCart;
