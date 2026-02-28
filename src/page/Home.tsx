import Exploring from "../components/Home/Exploring/Exploring";
import { PopularAccessories } from "../components/Home/PopularAccessories/PopularAccessories";
import BestSeller from "../components/Home/BestSeller/BestSeller";
import { PopularSmartphones } from "../components/Home/PopularSmartphones/PopularSmartphones";

function Home() {
  return (
    <div>
      <Exploring />
      <PopularAccessories />
      <BestSeller />
      <PopularSmartphones />
    </div>
  );
}

export default Home;
