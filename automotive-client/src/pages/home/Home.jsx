import { useEffect, useState } from "react";
import axios from "axios";
import Banner from "../../components/banner/Banner";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const Home = () => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        // data view or get using axios
        const apiUrl = "https://automotive-server-fr7lqmtf0-tomal-s-projects.vercel.app/products";

        axios.get(apiUrl)
            .then((response) => {
                if (Array.isArray(response.data)) {
                    setData(response.data);
                } else {
                    console.error("Invalid data format:", response.data);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    }, []);

    return (
        <div className="max-w-7xl mx-auto">
            <ToastContainer></ToastContainer>
            <Banner></Banner>
            <div className="mb-10">
                {loading ? (
                    <p>Loading...</p>
                ) : data ? (
                    <div>
                        <p className="text-5xl text-center mb-12 font-bold">Our Brands</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            {Array.from(new Set(data.map((item) => item.brandName))).map((brandName) => {
                                const uniqueItem = data.find((item) => item.brandName === brandName);
                                return (
                                    <div key={uniqueItem._id} className="flex gap-6 items-center">
                                        <img src={uniqueItem.brandImage} alt="image" className="w-[50px]" />
                                        <Link to={`/allCarsUnderBrand/${uniqueItem.brandName}`}>
                                            <p className="text-2xl btn btn-ghost">{uniqueItem.brandName}</p>
                                        </Link>
                                    </div>
                                );
                            })}
                            <div className="flex gap-2 items-center">
                                <img src="https://i.ibb.co/wpY2bvw/volkswagen.jpg" alt="image" className="w-[60px]" />
                                <Link to={`/allCarsUnderBrand/${data.brandName}`}>
                                    <p className="text-2xl btn btn-ghost">Volkswagen</p>
                                </Link>

                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="text-5xl text-center">No data available.</p>
                )}
            </div>
        </div>
    );
};

export default Home;
