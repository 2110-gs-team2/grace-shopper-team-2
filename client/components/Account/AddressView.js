import React, { useState } from "react";
import { useFormik, Formik, Form, ErrorMessage, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../store";
import { Check } from "react-feather";
import { states } from "./states";

const AddressView = () => {
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const currUser = useSelector((state) => state.auth);
  return (
    <div>
      <div className="text-5xl mb-5">My address</div>
      {success ? (
        <div className="mt2 py-3 px-5 bg-forest-green flex gap-2 text-white rounded-lg">
          <Check strokeWidth={1} />
          Your address has been updated
        </div>
      ) : null}
      <Formik
        initialValues={{
          addressLine1: `${currUser.addressLine1 || ""}`,
          addressLine2: `${currUser.addressLine2 || ""}`,
          city: `${currUser.city || ""}`,
          state: `${currUser.state || ""}`,
          zipcode: `${currUser.zipcode || ""}`,
        }}
        onSubmit={(values) => {
          dispatch(updateUser(values, currUser.id));
          setSuccess(true);
        }}
      >
        <Form className="max-w-3xl flex flex-col">
          <div className="flex flex-start m-0 gap-5">
            <div className="flex flex-col grow m-0">
              <label
                htmlFor="addressLine1"
                className="text-sm font-bold uppercase pt-5 pb-3"
              >
                Street Address
              </label>
              <Field
                name="addressLine1"
                type="text"
                className="py-3 px-5 border-forest-green border-2 focus:ring-forest-green block w-full rounded-full bg-beige
          "
              />
              <ErrorMessage name="addressLine1" />
            </div>
            <div className="flex flex-col grow m-0">
              <label
                htmlFor="addressLine2"
                className="text-sm font-bold uppercase pt-5 pb-3"
              >
                Apartment, Suite, Building (optional)
              </label>
              <Field
                name="addressLine2"
                type="text"
                className="py-3 px-5 border-forest-green border-2 focus:ring-forest-green block w-full rounded-full bg-beige
          "
              />
              <ErrorMessage name="addressLine2" />
            </div>
          </div>

          <div className="flex flex-start m-0 gap-5 justify-between">
            <div className="flex flex-col m-0 grow">
              <label
                htmlFor="city"
                className="text-sm font-bold uppercase pt-5 pb-3"
              >
                City
              </label>
              <Field
                name="city"
                type="text"
                className="py-3 px-5 border-forest-green border-2 focus:ring-forest-green block w-full rounded-full bg-beige
          "
              />
              <ErrorMessage name="city" />
            </div>
            <div className="flex flex-col m-0 basis-1/6">
              <label
                htmlFor="state"
                className="text-sm font-bold uppercase pt-5 pb-3"
              >
                State
              </label>
              <Field
                as="select"
                name="state"
                className="py-3 px-5 border-forest-green border-2 focus:ring-forest-green block w-full rounded-full bg-beige
          "
              >
                {states.map((s, idx) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="state" />
            </div>
            <div className="flex flex-col m-0 ">
              <label
                htmlFor="zipcode"
                className="text-sm font-bold uppercase pt-5 pb-3"
              >
                Zipcode
              </label>
              <Field
                name="zipcode"
                type="text"
                className="py-3 px-5 border-forest-green border-2 focus:ring-forest-green block w-full rounded-full bg-beige
          "
              />
              <ErrorMessage name="zipcode" />
            </div>
          </div>
          <div className="m-0">
            <button
              type="submit"
              className="mt-5 block p-6 py-3 w-48 text-center rounded-full text-base font-bold text-beige bg-forest-green uppercase"
            >
              Save
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default AddressView;
