import { AboutMsg } from "@/utils/constants";

function AboutPage() {
  return (
    <main>
      <section className="flex flex-col justify-center items-center gap-6">
        <h1 className="text-center text-2xl sm:text-4xl text-green-800">
          Sobre Nosotros
        </h1>
        <p className="sm:mx-16">{AboutMsg}</p>
      </section>
    </main>
  );
}
export default AboutPage;
