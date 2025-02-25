function HomePage() {
  return (
    <main className="bg-[url(/images/background2.jpg)] bg-cover bg-center w-full h-[calc(100vh-112px)] overflow-hidden">
      <div className="flex justify-center items-center flex-col gap-12 mt-20">
        <h1 className="text-6xl text-primary bg-white p-4 rounded">Mycelium</h1>
        <div className="bg-white p-4 rounded ">
          <p className="text-xl text-center ">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <p className="text-xl text-center ">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
      </div>
    </main>
  );
}
export default HomePage;
