import React, {useRef, useState, useContext} from "react";
import CountryContext from "../store/CountryContext";
import "./_Header.scss";
import TopMenu from "./TopMenu";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const optionRef = useRef(null);
    const inputRef = useRef(null);
    const [option, setOption] = useState("Country Name");
    const {countryData, setSearchParam, setInput} = useContext(CountryContext);
    const navigate = useNavigate();

    const handleSearchChange = () => {
        setOption(optionRef.current.value);
        setSearchParam(option);
    }

    const handleSearch = () => {
        setSearchParam(option);
        setInput(inputRef.current.value);
    }

    const handleKeyDown = (e) => {
        if(e.keyCode === 13){
            e.preventDefault();
            handleSearch();
        }
    }

    const handleRandomCountry = () => {
        // find random index number in array
        const maxLimit = countryData.length -1;
        let rand = Math.random() * maxLimit;
        rand = Math.floor(rand);
        
        navigate(`${countryData[rand].name.official}`, {state:countryData[rand]});
    }

    return (
    <>
        <header className="header">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xs-2 col-lg-2">
                        <div className="header__logo">
                            <i className="fa fa-globe"></i>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-7">
                    <div className="input-group" style={{display: "flex", marginTop:"3px" }}>
                        <div className="input-group-prepend" style={{width:"33%"}}>
                        <select onChange={handleSearchChange} ref={optionRef} className="form-control btn btn-success dropdown-toggle">
                            <option>Country Name</option>
                            <option>Language</option>
                            <option>Continent</option>
                        </select>
                        </div>
                        <input type="text" className="form-control" onKeyDown={handleKeyDown} ref={inputRef} placeholder={`Search by ${option}`} />
                        <div className="input-group-append">
                        <button className="btn btn-success" style={{height:"100%"}} onClick={handleSearch}>
                            <i className="fa fa-search"></i>
                            Search
                        </button>
                        </div>
                        <button className="btn" style={{marginLeft:"15px"}} onClick={handleRandomCountry}>
                            Random Country
                        </button>
                    </div>
                    </div>
                </div>
            </div>
        </header>
        <TopMenu/>
    </>
    )
}
export default Header;