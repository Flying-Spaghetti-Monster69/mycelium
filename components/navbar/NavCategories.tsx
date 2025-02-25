import Link from "next/link";

const NavCategories = () => {
  return (
    <section>
      <ul className="flex flex-wrap gap-4">
        <li>
          <Link
            href="/products?category=hombres"
            className="py-2 text-white hover:border-b-2 hover:border-white"
          >
            Hombres
          </Link>
        </li>
        <li>
          <Link
            href="/products?category=mujeres"
            className="py-2 text-white hover:border-b-2 hover:border-white"
          >
            Mujeres
          </Link>
        </li>
        <li>
          <Link
            href="/products?category=cosas"
            className="py-2 text-white hover:border-b-2 hover:border-white"
          >
            Cosas
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="py-2 text-white hover:border-b-2 hover:border-white"
          >
            Nosotros
          </Link>
        </li>
      </ul>
    </section>
  );
};

export default NavCategories;
