import {
  fetchAdminProductDetails,
  updateProductAction,
  updateProductImageAction,
} from "@/utils/actions";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import PriceInput from "@/components/form/PriceInput";
import TextAreaInput from "@/components/form/TextAreaInput";
import { SubmitButton } from "@/components/form/Buttons";
import ImageInputContainer from "@/components/form/ImageInputContainer";
import AddOption from "@/components/form/AddOption";

async function EditProductPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const product = await fetchAdminProductDetails(parseInt(id));
  const { product_name, category, description, price } = product;
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">update product</h1>
      <div className="border p-8 rounded-xl bg-white">
        <ImageInputContainer
          action={updateProductImageAction}
          name={product_name}
          image={product.image_url}
          text="update image"
        >
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="url" value={product.image_url} />
        </ImageInputContainer>
        <FormContainer action={updateProductAction}>
          <div className="grid gap-4 md:grid-cols-2 my-4">
            <input type="hidden" name="id" value={id} />
            <FormInput
              type="text"
              name="product_name"
              label="product name"
              defaultValue={product_name}
            />
            <FormInput type="text" name="category" defaultValue={category} />
            <PriceInput defaultValue={price} />
          </div>
          <TextAreaInput
            name="description"
            labelText="product description"
            defaultValue={description}
          />
          <AddOption defaultValue={product.options} />
          <SubmitButton text="update product" className="mt-8" />
        </FormContainer>
      </div>
    </section>
  );
}
export default EditProductPage;
