import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom"
import { context } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";


const Register = () => {

    const { createUser } = useContext(context);
    const navigate = useNavigate();

    const handleSignUp = e => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);

        const email = form.get('email');
        const password = form.get('password');
        // console.log(email, password);

        const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\]/;

        if (password.length < 6) {
            toast('Password must be six character or longer');
            return;
        }
        else if (/[A - Z]/.test(password)) {
            toast('Password must be lower case');
            return;
        }
        else if (specialCharRegex.test(password)) {
            toast('Password do not have special character');
            return;
        }

        //create user
        createUser(email, password)
            .then(result => {
                console.log(result.user);
                navigate('/');

                toast('Sign Up or Register Successfully Done');

                const user = { email };

                // data create or post using axios
                axios.post('https://automotive-server-fr7lqmtf0-tomal-s-projects.vercel.app/users', user, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                    .then((response) => {
                        if (response.status === 200) {
                            // Product added successfully, so display the toast message
                            toast('User added successfully');
                            console.log(response.data);
                        } else {
                            // Handle errors or failed responses here
                            throw new Error('Failed to add the user');
                        }
                    })
                    .catch((error) => {
                        // Handle any errors
                        console.error(error);
                    });
                form.current.reset();
            })
            .catch((error) => {
                toast(error.message);
            });
    }

    return (
        <div className="hero bg-base-200 max-w-7xl mx-auto">
            <ToastContainer />
            <form className="card-body" onSubmit={handleSignUp}>
                <h2 className="text-5xl mb-2">Please, Sign Up</h2>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" placeholder="email" name="email" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password" placeholder="password" name="password" className="input input-bordered" required />
                </div>
                <div className="form-control mt-6">
                    <button className="btn btn-primary">Sign Up</button>
                    <p className="mt-2">Already have an account? <span><Link to='/signIn' className="text-blue-500 font-bold">Sign In</Link></span></p>
                </div>
            </form>
        </div>
    )
}

export default Register