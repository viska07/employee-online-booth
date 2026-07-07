import Navbar from "../components/Navbar";
import HeroBanner from "../components/HeroBanner";
import DynamicBooths from "../components/DynamicBooths";
import DynamicAnnouncement from "../components/DynamicAnnouncement";

function Home() {
  return (
    <>
      <Navbar />
      <HeroBanner />
      <DynamicBooths />
      <DynamicAnnouncement />
    </>
  );
}

export default Home;