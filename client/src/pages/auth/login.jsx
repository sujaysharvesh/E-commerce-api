import CommonForm from "@/components/common/form";
import { loginFormControls } from "@/config/registe-form";
import { useState } from "react";
import { Link } from "react-router-dom";

const initialState = {
  Email: "",
  Password: "",
};
function LoginAuth() {
  const [formData, setFormData] = useState(initialState);
  function onSubmit() {}
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <h1 className="text-3xl fonr-bold tracking-tight text-foreground ">
        Sign In To Your Account
      </h1>
      <CommonForm
        formControls={loginFormControls}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default LoginAuth;
