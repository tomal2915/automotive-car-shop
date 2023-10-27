
import { useLoaderData, useParams } from "react-router-dom";
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { context } from "../../context/AuthContext";

const CarDetails = () => {

    const { _id } = useParams(); // Access _id from URL parameters

    const details = useLoaderData();

    const { user } = useContext(context);

    const detail = details.find(item => item._id === _id);
    
    const [cart, setCart] = useState([]);

    const handleAddToCart = (_id, productImage, productName, productBrandName, productPrice, productRating, productShortDescription) => {
        if (!cart.some(item => item._id === _id)) {
            const updatedCart = [...cart, { _id, image: productImage, name: productName, brandName: productBrandName, price: productPrice, rating: productRating, shortDescription: productShortDescription }];
            const email = user.email;
            setCart(updatedCart);

            // Send the updated cart data to the server
            axios.post('https://automotive-server-fr7lqmtf0-tomal-s-projects.vercel.app/carts', { cart: updatedCart, email: email })
                .then((response) => {
                    if (response.status === 200) {
                        toast(`${productName} added to your cart.`);
                    } else {
                        toast.error('Failed to added your cart.');
                    }
                })
                .catch((error) => {
                    toast.error('Failed to added your cart.');
                    console.error(error);
                });
        } else {
            toast(`${productName} is already in your cart.`);
        }
    };


    const slider = (

        <AwesomeSlider>
            <div className="hero bg-slate-50">
                <div className="hero-content flex-col lg:flex-row-reverse items-center">
                    <img src={detail.image} className="w-[800px] h-[400px]" />
                    <div>
                        <h1 className="text-5xl font-bold">{detail.name}</h1>
                        <p className="py-6">{detail.shortDescription}</p>
                    </div>
                </div>
            </div>
            <div className="hero bg-slate-50">
                <div className="hero-content flex-col lg:flex-row-reverse items-center">
                    <img src={detail.image} className="w-[800px] h-[400px]" />
                    <div>
                        <h1 className="text-5xl font-bold">{detail.name}</h1>
                        <p className="py-6">{detail.shortDescription}</p>
                    </div>
                </div>
            </div>
            <div className="hero bg-slate-50">
                <div className="hero-content flex-col lg:flex-row-reverse items-center">
                    <img src={detail.image} className="w-[800px] h-[400px]" />
                    <div>
                        <h1 className="text-5xl font-bold">{detail.name}</h1>
                        <p className="py-6">{detail.shortDescription}</p>
                    </div>
                </div>
            </div>
        </AwesomeSlider>
    );

    return (
        <div className="mb-10">
            <ToastContainer></ToastContainer>
            <div className="mb-10">
                {slider}
            </div>
            <div className="card card-side">
                <figure>
                    <img src={detail.image} alt="image" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title font-bold">{detail.name}</h2>
                    <h1 className="font-bold">Brand: {detail.brandName}</h1>
                    <p className="font-bold">Price: {detail.price}</p>
                    <p className="font-bold">Rating: {detail.rating}</p>
                    <p>{detail.shortDescription}</p>
                </div>
            </div>
            <div className="card-actions justify-center">
                {/* <Link to={`/details/${item._id}`}></Link> */}
                <button className="btn bg-blue-400" onClick={() => handleAddToCart(_id, detail.image, detail.name, detail.brandName, detail.price, detail.rating, detail.shortDescription)} >Add to Cart</button>
            </div>
        </div>
    );
};

export default CarDetails;
