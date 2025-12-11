import HelmetTitle from "../../Comoponent/HelmetTitle";
import AboutUs from "./AboutUs";
import Banner from "./Banner";
import FeaturedCls from "./FeaturedCls";
import HmFeatured from "./HmFeatured";
import LatestForum from "./LatestForum";
import NewsLetter from "./NewsLetter";
import Review from "./Review";
import Teamtrainer from "./Teamtrainer";
 
 

const Home = () => {
    return (
        <>
        <HelmetTitle title="Home" />
        <div >
           
            <Banner/>
             <main className="max-w-7xl mx-auto px-4 py-12 space-y-10">
            <HmFeatured/>
            <Review/>
             <FeaturedCls/>
            <LatestForum/>
            <AboutUs/>
           
            
            <NewsLetter/>
              <Teamtrainer/>
            </main>
         
            
        </div>
        </>
    );
};

export default Home;