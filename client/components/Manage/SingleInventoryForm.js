import { Dialog, Transition } from "@headlessui/react";
import React, { useState, Fragment } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { useDispatch } from "react-redux";
import { updateProduct } from "../../store/products";
import { Check } from "react-feather";

const SingleInventoryForm = ({ product, setOpen }) => {
  const [success, setSuccess] = useState(false);

  const types = ["INDOOR", "SUCCULENT", "HERB"];
  const sizes = ["X-SMALL", "SMALL", "MEDIUM", "LARGE"];
  const lightLevels = ["LOW", "INDIRECT", "DIRECT"];
  const difficultyLevels = ["EASY", "MODERATE", "EXPERT"];

  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        id: `${product.id || ""}`,
        name: `${product.name || ""} `,
        description: `${product.description || ""}`,
        quantity: `${product.quantity || ""}`,
        price: `${product.price || ""}`,
        type: `${product.type || ""}`,
        size: `${product.size || ""}`,
        difficulty: `${product.difficulty || ""}`,
        light: `${product.light || ""}`,
      }}
      onSubmit={(values) => {
        if (values.id) dispatch(updateProduct(values));
        setSuccess(true);
        // setOpen(false);
      }}
    >
      <Form className="flex flex-col gap-3">
        <div className="flex justify-between items-center m-0">
          <label htmlFor="name" className="text-sm font-bold uppercase">
            Name
          </label>
          <Field
            name="name"
            type="text"
            className="py-2 px-4 w-2/3 border-forest-green border-2 focus:ring-forest-green block rounded-full bg-beige
          "
          />
          <ErrorMessage name="name" />
        </div>
        <div className="flex justify-between items-center m-0">
          <label htmlFor="description" className="text-sm font-bold uppercase">
            Description
          </label>
          <Field
            name="description"
            as="textarea"
            type="text"
            rows="5"
            className="py-2 px-4 w-2/3 border-forest-green border-2 focus:ring-forest-green block rounded-lg bg-beige
          "
          />

          <ErrorMessage name="description" />
        </div>
        <div className="flex justify-between items-center m-0">
          <label htmlFor="quantity" className="text-sm font-bold uppercase ">
            Quantity
          </label>
          <Field
            name="quantity"
            type="number"
            className="py-2 px-4 border-forest-green border-2 focus:ring-forest-green block w-2/3 rounded-full bg-beige
          "
          />
          <ErrorMessage name="quantity" />
        </div>

        <div className="flex justify-between items-center m-0">
          <label htmlFor="price" className="text-sm font-bold uppercase ">
            Price
          </label>
          <Field
            name="price"
            type="text"
            className="py-2 px-4 border-forest-green border-2 focus:ring-forest-green block w-2/3 rounded-full bg-beige
          "
          />
          <ErrorMessage name="price" />
        </div>
        <div className="flex justify-between items-center m-0">
          <label htmlFor="type" className="text-sm font-bold uppercase">
            Type
          </label>
          <Field
            as="select"
            name="type"
            className="py-2 px-4 border-forest-green border-2 focus:ring-forest-green block w-2/3 rounded-full bg-beige
          "
          >
            {types.map((t, idx) => (
              <option key={idx} value={t}>
                {t}
              </option>
            ))}
          </Field>
          <ErrorMessage name="type" />
        </div>
        <div className="flex justify-between items-center m-0">
          <label htmlFor="size" className="text-sm font-bold uppercase">
            size
          </label>
          <Field
            as="select"
            name="size"
            className="py-2 px-4 border-forest-green border-2 focus:ring-forest-green block w-2/3 rounded-full bg-beige
          "
          >
            {sizes.map((s, idx) => (
              <option key={idx} value={s}>
                {s}
              </option>
            ))}
          </Field>
          <ErrorMessage name="size" />
        </div>
        <div className="flex justify-between items-center m-0">
          <label htmlFor="difficulty" className="text-sm font-bold uppercase">
            Difficulty
          </label>
          <Field
            as="select"
            name="difficulty"
            className="py-2 px-4 border-forest-green border-2 focus:ring-forest-green block w-2/3 rounded-full bg-beige
          "
          >
            {difficultyLevels.map((d, idx) => (
              <option key={idx} value={d}>
                {d}
              </option>
            ))}
          </Field>
          <ErrorMessage name="difficulty" />
        </div>
        <div className="flex justify-between items-center m-0">
          <label htmlFor="light" className="text-sm font-bold uppercase">
            Light
          </label>
          <Field
            as="select"
            name="light"
            className="py-2 px-4 border-forest-green border-2 focus:ring-forest-green block w-2/3 rounded-full bg-beige
          "
          >
            {lightLevels.map((l, idx) => (
              <option key={idx} value={l}>
                {l}
              </option>
            ))}
          </Field>
          <ErrorMessage name="light" />
        </div>
        {success ? (
          <div className="m-0 mt-2 py-3 px-5 bg-forest-green flex gap-2 text-white rounded-lg">
            <Check strokeWidth={1} />
            Your product has been updated
          </div>
        ) : null}
        <button
          type="submit"
          className="block p-6 w-48 py-3 text-center rounded-full text-base font-bold text-beige bg-forest-green uppercase disabled:bg-slate-300"
        >
          Save
        </button>
      </Form>
    </Formik>
  );
};

export default SingleInventoryForm;
