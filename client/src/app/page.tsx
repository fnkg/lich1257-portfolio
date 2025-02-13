// import Cube from '@/ui/cube/cube'
import { MainNavigation } from '@/ui/navigation/MainNavigation';

import { notFound } from "next/navigation";

export default function HomeRoute() {
  return (
    <div className="w-full h-full">
      <MainNavigation />
      {/* <Cube /> */}
    </div>
  );
}