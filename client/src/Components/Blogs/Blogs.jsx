import React from 'react';
import Navbar from '../LandingPage/TopSection/Navbar/Navbar';
import {Footer} from '../Footer/footer';

function Blogs() {
    return (
        <>
        
            <Navbar />
            <div class="container position-relative px-4 px-lg-5">
                <div class="row gx-4 gx-lg-5 justify-content-center">
                    <div class="col-md-10 col-lg-8 col-xl-7">
                        <div class="site-heading">
                            <h2>Makeup Blogs</h2>
                            {/* <span class="subheading">A Blog Theme by Start Bootstrap</span> */}
                        </div>
                    </div>
                </div>
            </div>
            <div class="container px-4 px-lg-5"  style={{"width" : 'auto'}}>
            <div class="row gx-4 gx-lg-5 justify-content-center">
                <div class="col-md-10 col-lg-8 col-xl-7">
                    <div class="post-preview">
                        <a href="post.html">
                            <h2 class="post-title">Makeup and Beauty Blog Monday Poll, Vol. 773</h2>
                            <h3 class="post-subtitle">Problems look mighty small from 150 miles up</h3>
                        </a>
                        <p class="post-meta">
                            Posted by
                            <a href="#!"> Karen </a>
                            on March 20th, 2023
                        </p>
                    </div>
                    <hr class="my-4" />
                    <div class="post-preview">
                        <a href="post.html"><h2 class="post-title">Before You Pluck or Wax Your Brows, You Must Do This</h2></a>
                        <p class="post-meta">
                            Posted by
                            <a href="#!">Karan</a>
                            on September 4th, 2018
                        </p>
                    </div>
                    <hr class="my-4" />
                    <div class="post-preview">
                        <a href="post.html">
                            <h2 class="post-title">Science has not yet mastered prophecy</h2>
                            <h3 class="post-subtitle">We predict too much for the next year and yet far too little for the next ten.</h3>
                        </a>
                        <p class="post-meta">
                            Posted by
                            <a href="#!">Start Bootstrap</a>
                            on August 24, 2022
                        </p>
                    </div>
                    <hr class="my-4" />
                    <div class="post-preview">
                        <a href="post.html">
                            <h2 class="post-title">Failure is not an option</h2>
                            <h3 class="post-subtitle">Many say exploration is part of our destiny, but it’s actually our duty to future generations.</h3>
                        </a>
                        <p class="post-meta">
                            Posted by
                            <a href="#!">Start Bootstrap</a>
                            on July 8, 2022
                        </p>
                    </div>
                    <hr class="my-4" />
                    <div class="d-flex justify-content-end mb-4"><a class="btn btn-primary text-uppercase" href="#!">Older Posts →</a></div>
                </div>
            </div>
        </div>
            <Footer />
        </>
    );
}
export default Blogs;