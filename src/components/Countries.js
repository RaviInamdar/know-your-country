import React, {useContext} from "react";
import CountryContext from "../store/CountryContext";
import "./_Countries.scss";
import { useNavigate } from "react-router-dom";


const Countries = () => {
    const {countryData} = useContext(CountryContext);
    const navigate = useNavigate();

    const handleClick = (country) =>{
        navigate(`/${country.name.official}`,{state: country});
    }

    return(
        <>
            {countryData.length > 0 ? countryData.map(country => {
                return(
                    <div className="product-row" role="button" onClick={()=>{handleClick(country)}}>
                        <div className="col-sm">
                            <img className="product-flag" src={country.flags.png} alt={`country flag of ${country.name.official}`}/>
                        </div>
                        <div className="col-sm product-information">
                            <h3>
                                {country.name.common}
                            </h3>
                            <div className="country__citizens">{country.population.toLocaleString()} citizens</div>
                            <div><strong>Country Area: </strong>{country.area.toLocaleString()}km&sup2;</div>
                            {country.capital && (<div><strong>Capital: </strong>{country.capital}</div>)}
                        </div>
                        <div className="col-sm">
                            <h1>Click to learn more...</h1>
                        </div>
                    </div>
                )
            }) : (
                <div>No Country Data Found. Please Search Again.</div>
            )}
        </>
    )
}
export default Countries;