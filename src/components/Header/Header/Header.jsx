import React from 'react';
import Banner from '../Banner/Banner';
import Navs from '../Navs/Navs';

const Header = () => {
    return (
        <div style={{backgroundColor:"#E5E5E5"}}>
            <Navs></Navs>
            <Banner></Banner>
        </div>
    );
};

export default Header;