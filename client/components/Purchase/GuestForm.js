import React, { useState } from "react";
import { useFormik, Formik, Form, ErrorMessage, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../store";
import { Check } from "react-feather";
import * as Yup from "yup";

const GuestFormSchema = Yup.object().shape({
  firstName: Yup.string("Invalid value")
    .min(2, "Too short!")
    .max(50, "Too long!")
    .required("First name is required"),
  lastName: Yup.string("Invalid value")
    .min(2, "Too short!")
    .max(50, "Too long!")
    .required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const GuestForm = () => {
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const currUser = useSelector((state) => state.auth);
  return (
    <div>
      <Formik
        initialValues={{
          firstName: `${currUser.firstName || ""}`,
          lastName: `${currUser.lastName || ""}`,
          email: `${currUser.email || ""}`,
        }}
        validationSchema={GuestFormSchema}
        onSubmit={(values) => {
          dispatch(updateUser(values, currUser.id));
          setSuccess(true);
        }}
      >
        <Form className="max-w-3xl flex flex-col">
          <div className="flex flex-start m-0 gap-5">
            <div className="flex flex-col grow m-0">
              <label
                htmlFor="firstName"
                className="text-sm font-bold uppercase pt-5 pb-3"
              >
                First Name
              </label>
              <Field
                name="firstName"
                type="text"
                className="py-3 px-5 border-forest-green border-2 focus:ring-forest-green block w-full rounded-full bg-beige
          "
              />
              <ErrorMessage
                name="firstName"
                component="div"
                className="text-red-700 m-0 text-sm"
              />
            </div>
            <div className="flex flex-col grow m-0">
              <label
                htmlFor="lastName"
                className="text-sm font-bold uppercase pt-5 pb-3"
              >
                Last Name
              </label>
              <Field
                name="lastName"
                type="text"
                className="py-3 px-5 border-forest-green border-2 focus:ring-forest-green block w-full rounded-full bg-beige
          "
              />
              <ErrorMessage
                name="lastName"
                component="div"
                className="text-red-700 m-0 text-sm"
              />
            </div>
          </div>
          <div className="flex flex-col m-0 w-3/5">
            <label
              htmlFor="email"
              className="text-sm font-bold uppercase pt-5 pb-3"
            >
              Email Address
            </label>
            <Field
              name="email"
              type="email"
              className="focus:outline-none py-3 px-5 border-forest-green border-2 focus:ring-forest-green block w-full rounded-full bg-beige
          "
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-700 m-0 text-sm"
            />
          </div>
          <div className="m-0">
            <button
              type="submit"
              className="focus:outline-none mt-5 block p-6 py-3 w-48 text-center rounded-full text-base font-bold text-beige bg-forest-green uppercase"
            >
              Save information
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default GuestForm;
