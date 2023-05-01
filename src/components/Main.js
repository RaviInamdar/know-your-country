import React from "react";
import "./_Main.scss";
import Countries from "./Countries";
import Header from "./Header";

const Main = () => {
    return(
        <>
            <Header />
            <section className="container-fluid">
                <div className="results-row">
                    <Countries/>
                </div>
            </section>
        </>
    );
}
export default Main;