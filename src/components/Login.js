import { useRef, useState } from "react";
import sha256 from "crypto-js/sha256";
import { useNavigate } from "react-router-dom";
import { checkValidData } from "../utils/validate";

const Login = () => {
  const navigate = useNavigate();
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const phoneNumberRef = useRef(null);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
    setErrorMessage(null); // Reset the error message

    // Optionally clear the form fields
    emailRef.current.value = "";
    passwordRef.current.value = "";
    if (!isSignInForm) {
      // These fields are only present in the sign-up form
      firstNameRef.current.value = "";
      lastNameRef.current.value = "";
      phoneNumberRef.current.value = "";
    }
  };

  const handleButtonClick = () => {
    let message;
    if (isSignInForm) {
      // Handle sign-in validation
      const emailValue = emailRef.current.value;
      const passwordValue = sha256(passwordRef.current.value).toString(); // Hash the entered password to compare

      // Retrieve user data from localStorage
      const userDataString = localStorage.getItem("user");
      const userData = userDataString && JSON.parse(userDataString);

      // Check if email and hashed password match the stored values
      if (
        userData &&
        userData.email === emailValue &&
        userData.password === passwordValue
      ) {
        // Credentials are valid, redirect to the dashboard
        navigate("/dashboard");
      } else {
        // Set an error message if credentials are invalid
        message = "Invalid email or password";
      }
    } else {
      // Handle sign-up validation and data storage
      message = checkValidData(
        {
          firstName: firstNameRef.current.value,
          lastName: lastNameRef.current.value,
          phoneNumber: phoneNumberRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
        },
        false
      );

      if (!message) {
        // Hash the password
        const hashedPassword = sha256(passwordRef.current.value).toString();

        // Store user data in localStorage
        const userData = {
          firstName: firstNameRef.current.value,
          lastName: lastNameRef.current.value,
          phoneNumber: phoneNumberRef.current.value,
          email: emailRef.current.value,
          password: hashedPassword,
        };
        localStorage.setItem("user", JSON.stringify(userData));

        // Clear the form fields after successful signup
        firstNameRef.current.value = "";
        lastNameRef.current.value = "";
        phoneNumberRef.current.value = "";
        emailRef.current.value = "";
        passwordRef.current.value = "";

        // Switch to the sign-in form and set a success message
        setIsSignInForm(true);
        message = "Signup successful. Please sign in.";
      }
    }
    setErrorMessage(message);
  };

  return (
    <>
      <div className="absolute flex items-center justify-center h-screen w-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
        {/* LOGIN AND SING UP FORM */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-6/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
        >
          <h1 className="font-bold text-3xl py-4">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>

          {errorMessage && (
            <p
              className={`py-1 ${
                errorMessage.startsWith("Signup successful")
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {errorMessage}
            </p>
          )}

          {!isSignInForm && (
            <>
              <input
                ref={firstNameRef}
                type="text"
                placeholder="First Name"
                className="p-2 my-4 w-full bg-gray-700"
              />
              <input
                ref={lastNameRef}
                type="text"
                placeholder="Last Name"
                className="p-2 my-4 w-full bg-gray-700"
              />
              <input
                ref={phoneNumberRef}
                type="text"
                placeholder="Phone Number"
                className="p-2 my-4 w-full bg-gray-700"
              />
            </>
          )}

          <input
            ref={emailRef}
            type="text"
            placeholder="Email address"
            className="p-2 my-4 w-full bg-gray-700"
          />

          <input
            ref={passwordRef}
            type="password"
            placeholder="Password"
            className="p-2 my-4 w-full bg-gray-700"
          />

          <button
            className="p-2 my-6 bg-red-700 w-full rounded-lg"
            onClick={handleButtonClick}
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>

          <p className="py-1 cursor-pointer" onClick={toggleSignInForm}>
            {isSignInForm
              ? "New to Here? Sign Up Now"
              : "Already Registered? Sign In Now"}
          </p>

        </form>
      </div>
      </>
  );
};

export default Login;
