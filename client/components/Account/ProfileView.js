import React, { Fragment, useState } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../store";
import { Check } from "react-feather";
import * as Yup from "yup";
import { useLocation } from "react-router-dom";
import includes from "lodash/includes";
import { createGuest } from "../../store";

const ProfileFormSchema = Yup.object().shape({
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

const ProfileView = () => {
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const currUser = useSelector((state) => state.auth);
  const products = useSelector((state) => state.products);
  return (
    <div>
      {!includes(location.pathname, "checkout") ? (
        <Fragment>
          <div className="text-5xl mb-5">My profile</div>
          {success ? (
            <div className="mt2 py-3 px-5 bg-forest-green flex gap-2 text-white rounded-lg">
              <Check strokeWidth={1} />
              Your account has been updated
            </div>
          ) : null}
        </Fragment>
      ) : null}

      <Formik
        initialValues={{
          firstName: `${currUser.firstName || ""}`,
          lastName: `${currUser.lastName || ""}`,
          email: `${currUser.email || ""}`,
        }}
        validationSchema={ProfileFormSchema}
        onSubmit={(values) => {
          if (!includes(location.pathname, "checkout")) {
            dispatch(updateUser(values, currUser.id));
            setSuccess(true);
          } else {
            dispatch(createGuest(values, products));
          }
        }}
      >
        {({ dirty, isValid }) => (
          <Form className="max-w-3xl flex flex-col">
            <div className="flex md:flex-row flex-col flex-start m-0 md:gap-5">
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
                  className="py-3 px-5 border-forest-green border-2 block w-full rounded-full bg-beige
                  focus:border-forest-green focus:ring-2 focus:ring-xlight-green
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
                  className="py-3 px-5 border-forest-green border-2 block w-full rounded-full bg-beige
                  focus:border-forest-green focus:ring-2 focus:ring-xlight-green
          "
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="text-red-700 m-0 text-sm"
                />
              </div>
            </div>
            <div className="flex flex-col m-0 md:w-3/5 w-full">
              <label
                htmlFor="email"
                className="text-sm font-bold uppercase pt-5 pb-3"
              >
                Email Address
              </label>
              <Field
                name="email"
                type="email"
                className="py-3 px-5 border-forest-green border-2 block w-full rounded-full bg-beige
                focus:border-forest-green focus:ring-2 focus:ring-xlight-green
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
                disabled={!isValid || !dirty}
                type="submit"
                className="disabled:bg-stone-300 mt-5 block p-6 py-3 w-48 text-center rounded-full text-base font-bold text-beige bg-forest-green uppercase"
              >
                Save
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProfileView;
