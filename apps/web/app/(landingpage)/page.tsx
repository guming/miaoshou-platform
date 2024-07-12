import Navbar from "@/components/navbar/navbar";
import HeroSection from "./hero-section";
import SecondSection from "./second-section";
import Footer from "@/components/footer";
import Menu from "@/components/tailwind/ui/menu";
const LandingPage = () => {
    return ( 
    <div className="">
        <Navbar />
        <HeroSection />
        <SecondSection />
        <Footer />

    </div> );
}

export default LandingPage;