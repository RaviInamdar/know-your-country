import React, {useContext} from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import "./_CountryDetail.scss";
import CountryContext from "../store/CountryContext";

const CountryDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const country = location.state;
    const {countryData} = useContext(CountryContext);

    const findBorderCountries = (border) =>{
        return countryData.find(item => {
            return (item.cca2 === border|| item.fifa === border || item.cca3 === border|| item.cioc === border)
        });
    }

    return(
        <body>
            <header className="country-header">
                <div className="header-items">
                    <div className="">
                        <button className="country-detail-button" onClick={()=>{navigate(-1)}}>
                            <i className="fa fa-arrow-left"></i> Go Back
                        </button>
                        <button className="country-detail-home" onClick={()=>{navigate("/")}}>
                            <i className="fa fa-home"></i> Home
                        </button>
                    </div>
                    <div className="header-column">
                        <h1>{country.name.common}</h1>
                    </div>
                </div>
            </header>
            <div className="body-items">
                <div className="body-main"> 
                    <div className="country-flag">
                        <img src={`${country.flags.png}`} alt={`flag of ${country.name.official}`}></img>
                    </div>
                    <div className="country-details">
                        <p><strong>Population:</strong> {country.population.toLocaleString() || "Unknown"} citizens</p>
                        {country.capital && (<p><strong>Capital:</strong> {country.capital}</p>)}
                        {country.area && (<p><strong>Area:</strong> {country.area.toLocaleString()}km&sup2;</p>)}
                        {country.region && (<p><strong>Region:</strong> {country.region}</p>)} 
                        {country.subregion && (<p><strong>Subregion:</strong> {country.subregion}</p>)}
                        {country.name.nativeName && (<p><strong>Native Name:</strong> {country?.name?.nativeName && Object.values(country.name.nativeName)[0].official}</p>)}
                        <p><strong>Official Name:</strong> {country?.name?.official}</p>
                        <p><strong>Currencies Used:</strong> {country.currencies ? Object.values(country.currencies).map((value, index) => 
                        {
                            if(index+1 < Object.values(country.currencies).length){
                                return <>{value.name}, </>
                            }
                            return <>{value.name}</>
                        }): "Unknown"}</p>
                        {country.languages && (<p><strong>Languages: </strong>
                        {country.languages && Object.values(country.languages).map((language, index) => {
                            if(index+1 < Object.values(country.languages).length){
                                return <>{language}, </>
                            }
                            return(
                            <>{language}</>
                            )
                        })}</p>)}
                        {country.borders && (<p><strong>Border Countries: </strong>
                            {country.borders && country.borders.map((border,index) => {
                            if(index+1 < country.borders.length){
                                return <Link to={`/${findBorderCountries(border)?.cca3}`} state={findBorderCountries(border)}>{findBorderCountries(border)?.name?.common}, </Link>
                            }
                            return(
                            <Link to={`/${findBorderCountries(border)?.cca3}`} state={findBorderCountries(border)}>{findBorderCountries(border)?.name?.common}</Link>
                            )
                        })}</p>)}
                        <div style={{display:"inline"}}>
                            <button className="country-detail-view" onClick={()=>{window.open(country.maps.googleMaps, '_blank').focus();}}>
                                <i className="fa fa-eye"></i> View on Google Maps
                            </button>
                            <button className="country-detail-view" onClick={()=>{window.open(country.maps.openStreetMaps, '_blank').focus();}}>
                            <i className="fa fa-eye"></i> View on OpenStreetMaps
                            </button>
                        </div>
                    </div>
                  </div>
            </div>
        </body>
    )
}

export default CountryDetail;