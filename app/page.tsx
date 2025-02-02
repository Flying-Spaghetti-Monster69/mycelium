import Container from "@/components/globals/Container";

function HomePage() {
  return (
    <Container>
      <div className="flex justify-center items-center flex-col gap-12">
        <h1 className="text-6xl text-primary">Mycelium</h1>
        <p className="text-xl text-center ">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div>
    </Container>
  );
}
export default HomePage;
