import Container from "@/components/globals/Container";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <Container className="my-10">{children}</Container>;
};

export default layout;
