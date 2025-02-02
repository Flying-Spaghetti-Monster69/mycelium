const NavCategories = () => {
  return (
    <section>
      <ul className="flex flex-wrap gap-4">
        <li>
          <a
            href="/products?category=hombres"
            className="py-2 text-white hover:border-b-2 hover:border-white"
          >
            Hombres
          </a>
        </li>
        <li>
          <a
            href="/products?category=mujeres"
            className="py-2 text-white hover:border-b-2 hover:border-white"
          >
            Mujeres
          </a>
        </li>
        <li>
          <a
            href="/products?category=cosas"
            className="py-2 text-white hover:border-b-2 hover:border-white"
          >
            Cosas
          </a>
        </li>
        <li>
          <a
            href="/about"
            className="py-2 text-white hover:border-b-2 hover:border-white"
          >
            Nosotros
          </a>
        </li>
      </ul>
    </section>
  );
};

export default NavCategories;
