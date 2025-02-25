import AddToCart from "@/components/singleProduct/AddToCart";
import BreadCrumbs from "@/components/singleProduct/BreadCrumbs";
import ColorSelector from "@/components/singleProduct/ColorSelector";
import { fetchProductById } from "@/utils/actions";
import Image from "next/image";

const SingleProductPage = async ({ params }: { params: { id: string } }) => {
  const product = await fetchProductById(params.id);
  const { product_name, price, description, options } = product;
  const formattedPrice = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
  }).format(price);

  return (
    <section>
      <BreadCrumbs name={product_name} />
      <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
        <div className="relative h-full">
          <Image
            src={"/images/default.jpg"}
            alt={product_name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            className="object-cover w-full h-full rounded-lg"
          />
        </div>
        <div>
          <div className="flex gap-x-8 items-center">
            <h1 className="capitalize text-3xl font-bold">{product_name}</h1>
          </div>
          <h4 className="text-lg text-white mt-2 bg-primary inline-block p-2 rounded-lg">
            {formattedPrice}
          </h4>
          <p className="mt-6 leading-8 text-muted-foreground">{description}</p>
          <div className="flex flex-col gap-y-1">
            <ColorSelector options={options} />
            <AddToCart id={params.id} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleProductPage;
