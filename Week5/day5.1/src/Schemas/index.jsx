import * as Yup from "yup";

export const RegisterSchema = Yup.object({
  username: Yup.string()
    .required("Name is required")
    .min(2, "Name should contain at least 2 characters")
    .max(25, "Name should be less than 26 characters"),
  email: Yup.string()
    .email()
    .required("Please enter your email")
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z]{2,}$/i,
      "email must be a valid email"
    ),
  password: Yup.string()
    .required("Please enter your password")
    .min(6, "Password must be more than 6 characters"),
});
// confirm_password: Yup.string().required().min(6).oneOf([Yup.ref("password")], "Passwords must match"),

export const LoginSchema = Yup.object({
  email: Yup.string()
    .email()
    .required("Please enter your email")
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z]{2,}$/i,
      "email must be a valid email"
    ),
  password: Yup.string()
    .required("Please enter your password")
    .min(6, "Password must be more than 6 characters"),
});
