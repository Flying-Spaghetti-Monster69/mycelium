import { Button } from "@/components/ui/button";
import Link from "next/link";

function HomePage() {
  return (
    <div className="flex justify-center items-center flex-col gap-12">
      <h1 className="text-3xl">HomePage</h1>
      <Button variant="destructive" size="lg" asChild>
        <Link href="/orders">Orders</Link>
      </Button>
    </div>
  );
}
export default HomePage;
