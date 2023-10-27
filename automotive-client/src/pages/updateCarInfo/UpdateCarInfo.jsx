
import { useLoaderData } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";




const UpdateCarInfo = () => {

    const carInfo = useLoaderData();
    const { _id, brandImage, brandName, image, name, price, rating, shortDescription } = carInfo;

    const handleUpdate = (event) => {

        event.preventDefault();

        const form = new FormData(event.currentTarget);

        const image = form.get('image');
        const name = form.get('name');
        const brandName = form.get('brandName');
        const brandImage = form.get('brandImage');
        const price = form.get('price');
        const shortDescription = form.get('shortDescription');
        const rating = form.get('rating');

        const updatedData = {
            image,
            name,
            brandName,
            brandImage,
            price,
            shortDescription,
            rating,
        }
        // console.log(myData);

        const apiUrl = `https://automotive-server-fr7lqmtf0-tomal-s-projects.vercel.app/products/${_id}`; // Replace with your actual endpoint

        // Make a PUT or POST request to update the data
        fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json', // Set the content type to JSON
            },
            body: JSON.stringify(updatedData), // Convert the data to a JSON string
        })
            .then((response) => {
                if (response.ok) {
                    // Data updated successfully
                    toast('Data updated successfully');
                    // You can update the state or trigger a reload of the data
                } else {
                    // Handle errors or failed responses here
                    console.error('Failed to update the data');
                    toast('Failed to update the data');
                }
            })
            .catch((error) => {
                // Handle any errors
                console.error('Error updating data:', error);
                toast('Error updating data:', error);
            });

    }

    return (
        <div>
            <ToastContainer></ToastContainer>
            <p className="text-5xl font-bold text-center"> Update {name} Details</p>
            <form onSubmit={handleUpdate}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 text-2xl">
                    <div className="space-x-4">
                        <label>Car Image URL:</label>
                        <input
                            type="text"
                            name="image"
                            defaultValue={image}
                            className="input input-bordered"
                        />
                    </div>
                    <div className="space-x-4">
                        <label>Car Model:</label>
                        <input
                            type="text"
                            name="name"
                            defaultValue={name}
                            className="input input-bordered"
                        />
                    </div>
                    <div className="space-x-4">
                        <label>Brand Name:</label>
                        <input
                            type="text"
                            name="brandName"
                            defaultValue={brandName}
                            className="input input-bordered"
                        />
                    </div>
                    <div className="space-x-4">
                        <label>Brand Image URL:</label>
                        <input
                            type="text"
                            name="brandImage"
                            defaultValue={brandImage}
                            className="input input-bordered"
                        />
                    </div>
                    <div className="space-x-4">
                        <label>Price:</label>
                        <input
                            type="text"
                            name="price"
                            defaultValue={price}
                            className="input input-bordered"
                        />
                    </div>
                    <div className="space-x-4">
                        <label>Short Description:</label>
                        <input
                            type="text"
                            name="shortDescription"
                            defaultValue={shortDescription}
                            className="input input-bordered"
                        />
                    </div>
                    <div className="space-x-4">
                        <label>Rating:</label>
                        <input
                            type="text"
                            name="rating"
                            defaultValue={rating}
                            className="input input-bordered"
                        />
                    </div>
                </div>
                <div className="flex justify-center m-4">
                    <button type=" submit" className="btn bg-slate-600 text-yellow-50">Update</button>
                </div>
            </form>
        </div>
    )
}

export default UpdateCarInfo