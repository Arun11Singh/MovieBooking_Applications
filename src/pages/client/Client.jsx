import React from "react";
import Footer from '../../component/footer/Footer'
import Header from "../../component/header/Header";
import TheatresList from "../../component/theatres-list/TheatresList";
import MoviesList from "../../component/movies-list/MoviesList";

import "./client.css";

const Client = () => {
    const name = localStorage.getItem("name");
    return (
        <div>
            <Header />
            <div className='client-main container bg-light text-dark p-3'>
                <h2>Welcome, {name}</h2>
                <h4>Please check these products below</h4>

                <TheatresList />
                <MoviesList/>
            </div>

            <Footer />
        </div>
    );
};
export default Client;