import MainCard from "components/cards/MainCard";
import * as Yup from "yup";
import ProductForm from "./ProductForm";
import { Formik } from "formik";
import { Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { apiBaseUrl } from "config";

const validationSchema = Yup.object().shape({
  // vendor_user_id: Yup.number().required("Vendor User ID is required"),
  // isActive: Yup.boolean().required("Active status is required"),
  // name: Yup.string().required("Product name is required"),
  // category_name: Yup.string().required("Category name is required"),
  // description: Yup.string().required("Description is required"),
  // currency: Yup.string().required("Currency is required"),
  // price: Yup.number().required("Price is required"),
  // stock_quantity: Yup.number().required("Stock quantity is required"),
  // size: Yup.string().required("Size is required"),
  // SKUs: Yup.array().of(Yup.string()).required("At least one SKU is required"),
});

const initialValues = {
  vendor_user_id: null,
  name: "Test Name",
  description: "",
  price: 200,
  SKUs: [""],
  tags: [""],
  stock_quantity: 200,
  type: "",
  brand: "",
  is_new: true,
  is_trending: false,
  category_id: 1,
  isActive: true,
  discounted_price: null,
  currency: "",
  short_description: "",
  source: "",
  source_link: "",
  review: "",
  product_rating: null,
  ships_to_bahrain: true,
  is_variant_of: "",
  is_authentic_reviewer: true,
  color_hex: "",
  serialized_sku: "",
  ingredients: "",
  product_benefits: "",
  how_to_apply: "",
  key_benefits: "",
  skin_type: "",
  targeting: "",
  the_good_stuff: "",
  about_brand: "",
  subvariant_type: "multi-color",
  brand_logo: "",
  shade: "",
  shade_hex: "",
  option: "",
  images: [],
  videos: [],
};

const AddProduct = ({ onClose }: { onClose: () => void }) => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleSubmit = async (values: any, actions: any) => {
    console.log(values);
    try {
      // Make your Axios POST request here.
      const response = await axios.post(`${apiBaseUrl}/products`, values);

      if (response.status === 200) {
        // Reset the form and set the form submission flag.
        actions.resetForm();
        setIsFormSubmitted(true);
        onClose();
      }
    } catch (error) {
      // Handle any errors from the Axios request.
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <ProductForm />
      </Formik>
    </>
  );
};

export default AddProduct;
