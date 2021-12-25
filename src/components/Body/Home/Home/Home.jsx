import React from 'react';
import { Helmet } from 'react-helmet';
import Contact from '../Contact/Contact';
import Projects from '../Projects/Projects';
import Services from '../Services/Services';
import TestMonials from '../TestMonials/TestMonials';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home | Luxury Living</title>
            </Helmet>
            <Projects></Projects>
            <Services></Services>
            <TestMonials/>
            <Contact></Contact>
        </div>
    );
};

export default Home;