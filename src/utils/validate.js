export const checkValidData = (data, isSignIn = true) => {
  const { firstName, lastName, phoneNumber, email, password } = data;

  if (!isSignIn) {
    if (!/^[A-Za-z]+(?: [A-Za-z]+)?$/.test(firstName)) {
      return "Enter valid first name";
    }
    if (!/^[A-Za-z]+(?: [A-Za-z]+)?$/.test(lastName)) {
      return "Enter valid last name";
    }

    if (!/^\+?[1-9]\d{9}$/.test(phoneNumber)) {
      return "Enter valid phone number";
    }
  }
  const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
    email
  );
  const isPasswordValid =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

  if (!isEmailValid) return "Enter valid email";
  if (!isPasswordValid) return "Enter valid password";

  return null;
};