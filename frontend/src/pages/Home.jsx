import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeatureCards from "../components/FeatureCards";
//import Workflow from "../components/Workflow";
import JobForm from "../components/JobForm";

function Home() {

    return (

        <div>

            <Navbar />

            <Hero />

            <FeatureCards />

            {/* <Workflow /> */}

            <JobForm />

        </div>

    );

}

export default Home;