import CommonForm from "@/components/common/form";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  Name: "",
  Email: "",
  Password: "",
  ConfirmPassword: "",
};

function RegisterAuth() {
  const [formData, setFormData] = useState(initiacdlState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function onSubmit(event) {
    event.preventDefault();

    // Client-side validation
    if (formData.Password !== formData.ConfirmPassword) {
      toast({
        title: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({ title: data?.payload?.message });
        navigate("/auth/login");
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className="font-[sans-serif]">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full">
          <div className="border border-gray-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
            <form className="space-y-4" onSubmit={onSubmit}>
              <div className="mb-8">
                <h3 className="text-gray-800 text-3xl font-extrabold">Sign up</h3>
                <p className="text-gray-500 text-sm mt-4 leading-relaxed">
                  Create your account and explore a world of possibilities. Your journey begins here.
                </p>
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">User Name</label>
                <input
                  name="Name"
                  type="text"
                  required
                  className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600"
                  placeholder="Enter user name"
                  value={formData.Name}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">Email</label>
                <input
                  name="Email"
                  type="email"
                  required
                  className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600"
                  placeholder="Enter email"
                  value={formData.Email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">Password</label>
                <input
                  name="Password"
                  type="password"
                  required
                  className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600"
                  placeholder="Enter password"
                  value={formData.Password}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">Confirm Password</label>
                <input
                  name="ConfirmPassword"
                  type="password"
                  required
                  className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600"
                  placeholder="Re-enter password"
                  value={formData.ConfirmPassword}
                  onChange={handleChange}
                />
              </div>

              <div className="mt-8">
                <button
                  type="submit"
                  className="w-full shadow-xl py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-black hover:bg-white hover:text-black focus:outline-none"
                >
                  Sign Up
                </button>
              </div>

              <p className="text-sm mt-8 text-center text-gray-800">
                Already have an account?{" "}
                <Link
                  to="/auth/login"
                  className="text-blue-600 font-semibold hover:underline ml-1"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>

          <div className="lg:h-[400px] md:h-[300px] max-md:mt-8">
            <img
              src="https://readymadeui.com/login-image.webp"
              className="w-full h-full max-md:w-4/5 mx-auto block object-cover"
              alt="Sign up illustration"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterAuth;
