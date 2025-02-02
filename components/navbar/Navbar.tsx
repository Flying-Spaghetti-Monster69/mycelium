import Container from "../globals/Container";
import CartButton from "./CartButton";
import LinksDropdown from "./LinksDropdown";
import Logo from "./Logo";
import NavCategories from "./NavCategories";

const Navbar = () => {
  return (
    <nav className="border-b-2 border-white bg-[#004d26] sticky top-0 z-50">
      <Container className="flex flex-col sm:flex-row sm:justify-between sm:items-center flex-wrap gap-4 py-8">
        <Logo />
        <NavCategories />
        <div className="flex gap-4 items-center">
          <CartButton />
          <LinksDropdown />
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
