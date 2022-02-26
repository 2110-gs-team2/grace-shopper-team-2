import React, { useState } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { useDispatch } from "react-redux";
import { updateProduct } from "../../store/products";
import { Check } from "react-feather";
import { addProduct } from "../../store/products";
import omit from "lodash/omit";
import * as Yup from "yup";
export const types = ["INDOOR", "SUCCULENT", "HERB"];
export const sizes = ["X-SMALL", "SMALL", "MEDIUM", "LARGE"];
export const lightLevels = ["LOW", "INDIRECT", "DIRECT"];
export const difficultyLevels = ["EASY", "MODERATE", "EXPERT"];

const SingleInventoryForm = ({
  product,
  operation,
  triggerBanner,
  closeModal,
}) => {
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();

  const InventoryFormSchema = Yup.object().shape({
    name: Yup.string("Invalid value")
      .min(2, "Too short!")
      .required("Name is required"),
    description: Yup.string("Invalid value")
      .min(2, "Too short!")
      .required("Description is required"),
    quantity: Yup.number("Invalid quantity")
      .min(1)
      .required("Quantity is required"),
    price: Yup.number("Invalid price").min(1.0).required("Price is required"),
    type: Yup.mixed().oneOf(types).required("Type is required"),
    size: Yup.mixed().oneOf(sizes).required("Size is required"),
    difficulty: Yup.mixed()
      .oneOf(difficultyLevels)
      .required("Difficulty level is required"),
    light: Yup.mixed().oneOf(lightLevels).required("Light level is required"),
  });

  return (
    <Formik
      initialValues={{
        id: `${product.id || ""}`,
        name: `${product.name || ""}`,
        description: `${product.description || ""}`,
        quantity: `${product.quantity || ""}`,
        price: `${product.price || ""}`,
        type: `${product.type || ""}`,
        size: `${product.size || ""}`,
        difficulty: `${product.difficulty || ""}`,
        light: `${product.light || ""}`,
        isPetFriendly: product.isPetFriendly || false,
      }}
      validationSchema={InventoryFormSchema}
      onSubmit={(values) => {
        if (values.id) dispatch(updateProduct(values));
        else {
          values = omit(values, "id");
          values.slug = values.name.replace(/\s+/g, "-").toLowerCase();
          dispatch(addProduct(values));
        }
        triggerBanner(operation);
        closeModal();
        // setSuccess(true);
      }}
    >
      <Form className="flex flex-col gap-3">
        <div className="flex flex-col m-0">
          <div className="flex justify-between items-center m-0">
            <label htmlFor="name" className="text-sm font-bold uppercase">
              Name
            </label>
            <Field
              name="name"
              type="text"
              className="py-2 px-4 w-2/3 border-forest-green border-2 block rounded-full bg-beige
              focus:border-forest-green focus:ring-2 focus:ring-xlight-green
          "
            />
          </div>
          <ErrorMessage
            name="name"
            component="div"
            className="m-0 text-red-700 self-end text-sm"
          />
        </div>
        <div className="flex flex-col m-0">
          <div className="flex justify-between items-center m-0">
            <label
              htmlFor="description"
              className="text-sm font-bold uppercase"
            >
              Description
            </label>
            <Field
              name="description"
              as="textarea"
              type="text"
              rows="5"
              className="py-2 px-4 w-2/3 border-forest-green border-2 block rounded-lg bg-beige
              focus:border-forest-green focus:ring-2 focus:ring-xlight-green
          "
            />
          </div>
          <ErrorMessage
            name="description"
            component="div"
            className="m-0 text-red-700 self-end text-sm"
          />
        </div>
        <div className="flex flex-col m-0">
          <div className="flex justify-between items-center m-0">
            <label htmlFor="quantity" className="text-sm font-bold uppercase ">
              Quantity
            </label>
            <Field
              name="quantity"
              type="number"
              className="py-2 px-4 border-forest-green border-2 block w-2/3 rounded-full bg-beige
              focus:border-forest-green focus:ring-2 focus:ring-xlight-green
          "
            />
          </div>
          <ErrorMessage
            name="quantity"
            component="div"
            className="m-0 text-red-700 self-end text-sm"
          />
        </div>
        <div className="flex flex-col m-0">
          <div className="flex justify-between items-center m-0">
            <label htmlFor="price" className="text-sm font-bold uppercase ">
              Price
            </label>
            <Field
              name="price"
              type="text"
              className="py-2 px-4 border-forest-green border-2 block w-2/3 rounded-full bg-beige
              focus:border-forest-green focus:ring-2 focus:ring-xlight-green
          "
            />
          </div>
          <ErrorMessage
            name="price"
            component="div"
            className="m-0 text-red-700 self-end text-sm"
          />
        </div>

        <div className="flex flex-col m-0">
          <div className="flex justify-between items-center m-0">
            <label htmlFor="type" className="text-sm font-bold uppercase">
              Type
            </label>
            <Field
              as="select"
              name="type"
              className="py-2 px-4 border-forest-green border-2 block w-2/3 rounded-full bg-beige
              focus:border-forest-green focus:ring-2 focus:ring-xlight-green
          "
            >
              <option value="">Pick a type</option>
              {types.map((t, idx) => (
                <option key={idx} value={t}>
                  {t}
                </option>
              ))}
            </Field>
          </div>
          <ErrorMessage
            name="type"
            component="div"
            className="m-0 text-red-700 self-end text-sm"
          />
        </div>
        <div className="flex flex-col m-0">
          <div className="flex justify-between items-center m-0">
            <label htmlFor="size" className="text-sm font-bold uppercase">
              size
            </label>
            <Field
              as="select"
              name="size"
              className="py-2 px-4 border-forest-green border-2 block w-2/3 rounded-full bg-beige
              focus:border-forest-green focus:ring-2 focus:ring-xlight-green
          "
            >
              <option value="">Pick a size</option>
              {sizes.map((s, idx) => (
                <option key={idx} value={s}>
                  {s}
                </option>
              ))}
            </Field>
          </div>
          <ErrorMessage
            name="size"
            component="div"
            className="m-0 text-red-700 self-end text-sm"
          />
        </div>
        <div className="flex flex-col m-0">
          <div className="flex justify-between items-center m-0">
            <label htmlFor="difficulty" className="text-sm font-bold uppercase">
              Difficulty
            </label>
            <Field
              as="select"
              name="difficulty"
              className="py-2 px-4 border-forest-green border-2 block w-2/3 rounded-full bg-beige
              focus:border-forest-green focus:ring-2 focus:ring-xlight-green
          "
            >
              <option value="">Pick a difficulty level</option>
              {difficultyLevels.map((d, idx) => (
                <option key={idx} value={d}>
                  {d}
                </option>
              ))}
            </Field>
          </div>
          <ErrorMessage
            name="difficulty"
            component="div"
            className="m-0 text-red-700 self-end text-sm"
          />
        </div>
        <div className="flex flex-col m-0">
          <div className="flex justify-between items-center m-0">
            <label htmlFor="light" className="text-sm font-bold uppercase">
              Light
            </label>
            <Field
              as="select"
              name="light"
              className="py-2 px-4 border-forest-green border-2 block w-2/3 rounded-full bg-beige
              focus:border-forest-green focus:ring-2 focus:ring-xlight-green
          "
            >
              <option value="">Pick a light level</option>
              {lightLevels.map((l, idx) => (
                <option key={idx} value={l}>
                  {l}
                </option>
              ))}
            </Field>
          </div>
          <ErrorMessage
            name="light"
            component="div"
            className="m-0 text-red-700 self-end text-sm"
          />
        </div>
        <div className="flex flex-col m-0">
          <div className="flex justify-between items-center m-0">
            <label
              htmlFor="isPetFriendly"
              className="text-sm font-bold uppercase"
            >
              Pet-friendly?
            </label>
            <Field
              name="isPetFriendly"
              type="checkbox"
              className="pr-4 block bg-beige h-6 w-6 border-2 rounded-lg border-forest-green  checked:hover:bg-forest-green checked:bg-forest-green 
              focus:border-forest-green focus:ring-2 focus:ring-xlight-green   focus:text-forest-green
              "
            />
          </div>
          <ErrorMessage
            name="isPetFriendly"
            component="div"
            className="m-0 text-red-700 self-end text-sm"
          />
        </div>
        {success ? (
          <div className="m-0 mt-2 py-3 px-5 bg-forest-green flex gap-2 text-white rounded-lg">
            <Check strokeWidth={1} />
            Your product has been {operation === "add" ? "added" : "updated"}
          </div>
        ) : null}
        <button className="self-end block p-6 w-48 py-3 text-center rounded-full text-base font-bold text-beige bg-forest-green uppercase disabled:bg-slate-300">
          Save
        </button>
      </Form>
    </Formik>
  );
};

export default SingleInventoryForm;
