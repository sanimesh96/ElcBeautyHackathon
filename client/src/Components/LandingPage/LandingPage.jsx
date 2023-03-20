import TopSection from "./TopSection/TopSection";
import {motion as m} from 'framer-motion';
import Maximise from "./MiddleSection/Maximise";
import LimitedTimeDeal from "./MiddleSection/LimitedTimeDeal";
import BrandSection from "./MiddleSection/BrandSection";
import { Footer } from "../Footer/footer";





function LandingPage() {


    return (
        <>
            <m.div initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{duration:0.35 , ease: "easeOut"}}
            exit={{opacity:1}}
            >
            
            <TopSection />
            
             <Maximise />

             <LimitedTimeDeal />

             <BrandSection />
             <div>
        <Footer />
        </div>
            </m.div>
        </>
    );
}

export default LandingPage;