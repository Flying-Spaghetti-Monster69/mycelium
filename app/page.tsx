function HomePage() {
  return (
    <main
      className="bg-[url(/images/background2.jpg)] bg-cover bg-center w-full h-[calc(100vh-113.6px)] overflow-hidden"
      style={{ filter: "brightness(0.8)" }}
    >
      <div
        className="flex justify-center items-center flex-col gap-12 mt-20"
        style={{ filter: "brightness(1)" }}
      >
        <h1 className="text-6xl font-bold text-primary bg-transparent bg-white bg-opacity-70 p-4  rounded-3xl flex flex-col">
          Mycelium
          <span className="text-3xl mx-auto mt-2 text-amber-900">
            Go back to the roots
          </span>
        </h1>
        <p className="text-2xl font-semibold text-center bg-transparent bg-white bg-opacity-70 p-4  rounded-xl">
          Creamos ropa con creatividad y naturaleza en mente.
        </p>
      </div>
    </main>
  );
}
export default HomePage;
