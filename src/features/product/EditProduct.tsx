import MainCard from "components/cards/MainCard";
import * as Yup from "yup";
import ProductForm from "./ProductForm";
import { Formik } from "formik";

const validationSchema = Yup.object().shape({
  vendor_user_id: Yup.number().required("Vendor User ID is required"),
  isActive: Yup.boolean().required("Active status is required"),
  name: Yup.string().required("Product name is required"),
  category_name: Yup.string().required("Category name is required"),
  description: Yup.string().required("Description is required"),
  currency: Yup.string().required("Currency is required"),
  price: Yup.number().required("Price is required"),
  stock_quantity: Yup.number().required("Stock quantity is required"),
  size: Yup.string().required("Size is required"),
  SKUs: Yup.array().of(Yup.string()).required("At least one SKU is required"),
});

const initialValues = {
  vendor_user_id: 1,
  name: "",
  description: "",
  price: null,
  SKUs: ["SKU1"],
  tags: ["tag1"],
  stock_quantity: null,
  type: "",
  brand: "",
  is_new: true,
  is_trending: false,
  category_id: 1,
  isActive: true,
  discounted_price: null,
  currency: "USD",
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
  subvariant_type: "",
  brand_logo: "",
  shade: "",
  shade_hex: "",
  option: "",
};

const AddProduct = () => {
  const handleSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <MainCard title="Edit product">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <ProductForm />
      </Formik>
    </MainCard>
  );
};

export default AddProduct;
