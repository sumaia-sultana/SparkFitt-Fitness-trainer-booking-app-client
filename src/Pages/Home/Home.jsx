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
        <div>
            <Banner/>
            <HmFeatured/>
            <LatestForum/>
            <AboutUs/>
            <FeaturedCls/>
            <Review/>
            <NewsLetter/>
            <Teamtrainer/>
            
        </div>
        </>
    );
};

export default Home;