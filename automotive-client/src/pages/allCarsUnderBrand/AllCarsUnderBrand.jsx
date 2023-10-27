import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AwesomeSlider from 'react-awesome-slider';

const AllCarsUnderBrand = () => {

    const { brandName } = useParams();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Define the URL of your API endpoint for fetching data from MongoDB
        const apiUrl = `https://automotive-server-fr7lqmtf0-tomal-s-projects.vercel.app/products/brand/${brandName}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                setData(data); // Update the state with the retrieved data
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    }, [brandName]);

    // const slider = (


    // );

    return (
        <div className="mb-10">
            {/* <h2>Cars under the brand: {brandName}</h2> */}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="">

                    {/* <div className="mb-10">
                        <AwesomeSlider>
                            <div className="hero bg-slate-50">
                                <div className="hero-content flex-col lg:flex-row-reverse items-center">
                                    <img src={data[0].image} className="w-[800px] h-[400px]" />
                                    <div>
                                        <h1 className="text-5xl font-bold">{data[0].name}</h1>
                                        <p className="py-6">{data[0].shortDescription}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="hero bg-slate-50">
                                <div className="hero-content flex-col lg:flex-row-reverse items-center">
                                    <img src={data[0].image} className="w-[800px] h-[400px]" />
                                    <div>
                                        <h1 className="text-5xl font-bold">{data[0].name}</h1>
                                        <p className="py-6">{data[0].shortDescription}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="hero bg-slate-50">
                                <div className="hero-content flex-col lg:flex-row-reverse items-center">
                                    <img src={data[0].image} className="w-[800px] h-[400px]" />
                                    <div>
                                        <h1 className="text-5xl font-bold">{data[0].name}</h1>
                                        <p className="py-6">{data[0].shortDescription}</p>
                                    </div>
                                </div>
                            </div>
                        </AwesomeSlider>
                    </div> */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {
                            data && data.length > 0 ? (
                                data.map((item, index) => (
                                    <div key={index}>
                                        <div className="card card-side">
                                            <figure><img src={item.image} alt="image" /></figure>
                                            <div className="card-body">
                                                <h2 className="card-title font-bold">{item.name}</h2>
                                                <h1 className="font-bold">Brand: {item.brandName}</h1>
                                                <p className="font-bold">Price: {item.price}</p>
                                                <p className="font-bold">Rating: {item.rating}</p>
                                                <p>
                                                    {item.shortDescription.length > 80
                                                        ? `${item.shortDescription.slice(0, 200)}...`
                                                        : item.shortDescription}
                                                </p>
                                                <div className="flex justify-between">
                                                    <div className="card-actions">
                                                        <Link to={`/details/${item._id}`}><button className="btn bg-blue-400">Details</button></Link>
                                                    </div>
                                                    <div className="card-actions">
                                                        <Link to={`/updateCarInfo/${item._id}`}><button className="btn bg-blue-400">Update</button></Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="flex flex-col items-center justify-center gap-6 h-screen ">
                                    <p className="text-5xl font-bold text-center">
                                        No data found for this brand car.
                                    </p>
                                    <Link to="/addProduct">
                                        <button className="btn bg-blue-400">Add Product</button>
                                    </Link>
                                </div>

                            )
                        }
                    </div>
                </div>
            )}
        </div>
    )
}

export default AllCarsUnderBrand;
