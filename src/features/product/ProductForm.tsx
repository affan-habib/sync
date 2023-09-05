import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Button, IconButton, TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import ScrollableModal from "components/common/ScrollableModal";
import InputCheckBox from "components/form/InputCheckbox";
import InputField from "components/form/InputField";
import InputSelect from "components/form/InputSelect";
import InputTextArea from "components/form/InputTextArea";
import { Field, FieldArray, Form } from "formik";
import { useCategoryQuery } from "hooks/useCategoriesQuery";
import { useVendorQuery } from "hooks/useVendorQuery";
import { useState } from "react";
import AddVendor from "./AddVendor";
import MediaUpload from "components/MediaUplaod";

const ProductForm = () => {
  const { data: categories } = useCategoryQuery();
  const { data: vendors } = useVendorQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Step 3: Create a function to handle opening the modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Step 4: Create a function to handle closing the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Form>
      <Grid container spacing={3}>
        <Grid item xs={4} display="flex">
          <InputSelect
            label="Vendor"
            name="vendor_user_id"
            valueKey="id"
            labelKey="full_name"
            options={vendors || []}
          />
          <IconButton
            aria-label="Open Modal"
            onClick={handleOpenModal}
            sx={{ ml: 1 }} // Adjust margin as needed
          >
            <AddIcon />
          </IconButton>
        </Grid>
        <Grid item xs={4}>
          <InputField label="Product Name" name="name" />
        </Grid>
        <Grid item xs={4}>
          <InputSelect
            label="Category"
            name="category_id"
            valueKey="id"
            labelKey="name"
            options={categories || []}
          />
        </Grid>

        <Grid item xs={4}>
          <InputField label="Option" name="option" />
        </Grid>
        <Grid item xs={4}>
          <InputField label="How to Apply" name="how_to_apply" />
        </Grid>
        <Grid item xs={4}>
          <InputField label="Good Stuffs" name="the_good_stuff" />
        </Grid>
        <Grid item xs={4}>
          <InputField label="Skin Type" name="skin_type" />
        </Grid>
        <Grid item xs={4}>
          <InputField label="Targeting" name="targeting" />
        </Grid>
        <Grid item xs={4}>
          <InputField label="Source" name="source" />
        </Grid>
        <Grid item xs={4}>
          <InputField label="Source Link" name="source_link" />
        </Grid>
        <Grid item xs={4}>
          <InputField label="Hex Color Code" name="color_hex" />
        </Grid>
        <Grid item xs={12}>
          <InputTextArea label="Short Description" name="short_description" />
        </Grid>
        <Grid item xs={12}>
          <InputTextArea label="Description" name="description" />
        </Grid>
        <Grid item xs={6}>
          <InputTextArea label="Key Benefits" name="key_benefits" />
        </Grid>
        <Grid item xs={6}>
          <InputTextArea label="Product Benefits" name="product_benefits" />
        </Grid>
        <Grid item xs={12}>
          <InputTextArea label="Ingredients" name="ingredients" rows={1} />
        </Grid>
        <Grid item xs={4}>
          <InputField label="Price" name="price" type="number" />
        </Grid>
        <Grid item xs={4}>
          <InputField
            label="Discounted Price"
            name="discounted_price"
            type="number"
          />
        </Grid>
        <Grid item xs={4}>
          <InputField label="Stock" name="stock_quantity" type="number" />
        </Grid>
        <Grid item xs={4}>
          <InputField
            label="Product Rating"
            name="product_rating"
            type="number"
          />
        </Grid>
        <Grid item xs={4}>
          <InputCheckBox label="Active" name="isActive" />
        </Grid>
        <Grid item xs={4}>
          <InputCheckBox label="Is Trending" name="is_trending" />
        </Grid>
        <Grid item xs={4}>
          <InputCheckBox label="Is New" name="is_new" />
        </Grid>
        <Grid item xs={4}>
          <InputCheckBox label="Ships to Bahrain" name="ships_to_bahrain" />
        </Grid>
        <Grid item xs={4}>
          <InputCheckBox
            label="is Authentic Reviewer"
            name="is_authentic_reviewer"
          />
        </Grid>
        <Grid item xs={4}>
          <InputField label="Currency" name="currency" />
        </Grid>
        <Grid item xs={4}>
          <InputField label="Stock Quantity" name="stock_quantity" />
        </Grid>
        <Grid item xs={4}>
          <InputField label="Size" name="size" />
        </Grid>

        <Grid item xs={4}>
          <FieldArray name="tags">
            {(arrayHelpers) => (
              <div>
                {arrayHelpers.form.values.tags.map(
                  (sku: string, index: number) => (
                    <div
                      key={index}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <Field
                        name={`tags.${index}`}
                        as={TextField}
                        label={`Tag ${index + 1}`}
                        sx={{ mb: 1 }}
                      />
                      <IconButton
                        type="button"
                        onClick={() => arrayHelpers.remove(index)}
                        aria-label="Remove tag"
                      >
                        <RemoveIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => arrayHelpers.push("")}
                        aria-label="Add Tag"
                      >
                        <AddIcon />
                      </IconButton>
                    </div>
                  )
                )}
              </div>
            )}
          </FieldArray>
        </Grid>
        <Grid item xs={4}>
          <InputField label="shade" name="shade" />
        </Grid>
        <Grid item xs={4}>
          <InputField label="Shade hex" name="shade_hex" />
        </Grid>

        <Grid item xs={4}>
          <InputField label="Brand" name="brand" />
        </Grid>
        <Grid item xs={4}>
          <InputField label="About Brand" name="about_brand" />
        </Grid>
        <Grid item xs={4}>
          <InputField label="Review" name="review" />
        </Grid>

        <Grid item xs={4}>
          <InputField label="Type" name="type" />
        </Grid>
        <Grid item xs={4}>
          <InputSelect
            label="Subvariant Type"
            name="subvariant_type"
            valueKey="value"
            labelKey="name"
            options={[
              { name: "multi-color", value: "multi-color" },
              { name: "multi-option", value: "multi-option" },
              { name: "multi-shade", value: "multi-shade" },
              { name: "multi-size", value: "multi-size" },
              { name: "single", value: "single" },
            ]}
          />
        </Grid>
        <Grid item md={12}>
          <Field name="images">
            {(fieldProps: any) => (
              <MediaUpload setFieldValue={fieldProps.form.setFieldValue} />
            )}
          </Field>
        </Grid>
      </Grid>
      <Button variant="contained" type="submit" sx={{ mt: 2 }}>
        Submit
      </Button>
      <ScrollableModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Add New Vendor"
      >
        <AddVendor onClose={handleCloseModal} />
      </ScrollableModal>
    </Form>
  );
};

export default ProductForm;
