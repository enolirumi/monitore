import Header from "../../components/Header/Header"
import Banner from "../../components/Home/banner/banner"
import OurSkills from "../../components/Home/ourSkills/AboutUs"
import AboutUs from "../../components/Home/aboutUs/AboutUs"
import Footer from "../../components/Footer/Footer"

const Home = () => {
    return (
        <>
            <Header/>
            <Banner/>
            <AboutUs/>
            <OurSkills/>
            <Footer/>
        </>
    )
}

export default Home