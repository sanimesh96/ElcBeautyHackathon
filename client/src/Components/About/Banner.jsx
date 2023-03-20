import React from 'react';
import banner from './img/banner.png';
import teddy from './img/teddy.webp';
import heart from './img/heart.webp';
import oneMore from './img/oneMore.webp';
import {motion as m} from 'framer-motion';

function Banner() {
    return (
        <>
            <div className="banner_outer">

                <m.div
                initial={{x:"-100%"}}
            animate={{x:"0%"}}
            transition={{duration:0.55 , ease: "easeOut"}}
            exit={{opacity:1}}
                >
                        <img src={banner} alt="Not found" />

                </m.div>


                <m.div className='second_div_about'
                initial={{x:"100%"}}
            animate={{x:"0%"}}
            transition={{duration:0.55 , ease: "easeOut"}}
            exit={{opacity:1}}
                >

                    <div><h2>About Us</h2></div>
                     <p><q className='testingQuote'> Khoobsurat is a one stop shop for all your fashion and lifestyle needs. Being India's largest e-commerce store for fashion and lifestyle products, Myntra aims at providing a hassle free and enjoyable shopping experience to shoppers across the country with the widest range of brands and products on its portal. The brand is making a conscious effort to bring the power of fashion to shoppers with an array of the latest and trendiest products available in the country </q></p>
                </m.div>


            </div>


            <div className="welcomeSection">

                <h2>Welcome to #Khoobsurat.</h2>
                <p>Beauty is inclusive and not limited to few people</p>
            </div>

            <div className="aboutMesection">
                <div>
                    <img src="https://static.thcdn.com/images/medium/webp/widgets/289-eu/51/original-frank-body-about-us-slot2_749w-x-561h-104951.jpg" alt="Not found" />
                </div>
                <div>

                    <h3>My story.</h3> <br />
                        <p>Several years ago in a coffee shop, five friends had a drink and an idea: a humble coffee scrub. Their mission was to remove the hyperbole that saturates the skincare industry and make clean skincare fun. So they called me frank and I've been getting babes dirty since.
That simple, that good.</p>
                </div>
            </div>


        </>
    );
}

export default Banner;