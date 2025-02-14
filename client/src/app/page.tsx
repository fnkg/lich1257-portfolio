import { Header } from "@/components/layout/Header";
import { getHomePage } from "@/data/loaders";
import { notFound } from "next/navigation";

async function loader() {
  const data = await getHomePage();
  if (!data) notFound();
  return { ...data.data };
}

export default async function HomeRoute() {
  const data = await loader();
  const background = data.background;

  console.log(background);

  return (
    <div className="w-full h-full">
      <Header data={data.header} />
      {/* <video autoPlay muted loop className="backgroundVideo">
        <source src={`http://localhost:1337/${background.url}`} type="video/mp4" />
      </video> */}
    </div>
  );
}
