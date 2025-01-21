const NavCategories = () => {
  return (
    <section>
      <ul className="flex flex-wrap gap-4">
        <li>
          <a
            href="/products"
            className="py-2 text-[#004d26] hover:border-b-2 hover:border-[#004d26]"
          >
            Hombres
          </a>
        </li>
        <li>
          <a
            href="/products"
            className="py-2 text-[#004d26] hover:border-b-2 hover:border-[#004d26]"
          >
            Mujeres
          </a>
        </li>
        <li>
          <a
            href="/products"
            className="py-2 text-[#004d26] hover:border-b-2 hover:border-[#004d26]"
          >
            Cosas
          </a>
        </li>
        <li>
          <a
            href="/about"
            className="py-2 text-[#004d26] hover:border-b-2 hover:border-[#004d26]"
          >
            Nosotros
          </a>
        </li>
      </ul>
    </section>
  );
};

export default NavCategories;
