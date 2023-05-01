import React, {useState, useContext} from "react";
import "./_Topmenu.scss";
import CountryContext from "../store/CountryContext";

const TopMenu = () => {
    const [populationSort, setPopulationSort] = useState(true);
    const [countrySizeSort, setCountrySizeSort] = useState(false);
    const [alphabetSort, setAlphabetSort] = useState(true);
    const TopMenuItems = [
        {text: "Sort by Population", icon:"fa-users", comparator: `${populationSort ? 'largest to smallest': 'smallest to largest'}`, flag: populationSort}, 
        {text: "Sort by Country Size", icon:"fa-image", comparator: `${countrySizeSort ? 'largest to smallest': 'smallest to largest'}`, flag: countrySizeSort}, 
        {text: "Sort Alphabetically", icon: "fa-font", comparator: `${alphabetSort ? 'A to Z': 'Z to A'}`, flag: alphabetSort}];
    const {countryData, setCountryData} = useContext(CountryContext);
    
    const sortByPopulation = (boolFlag) =>{
        if(!boolFlag) {
            return countryData.toSorted((a,b) => {
                if(a.population > b.population){
                    return 1;
                }
                if(b.population > a.population){
                    return -1;
                }
                return 0;
            })
        }
        return countryData.toSorted((a,b) => {
            if(b.population > a.population){
                return 1;
            }
            if(a.population > b.population){
                return -1;
            }
            return 0;

        })
    }

    const sortByCountrySize = (boolFlag) =>{
        if(!boolFlag) {
            return countryData.toSorted((a,b) => {
                if(a.area > b.area){
                    return 1;
                }
                if(b.area > a.area){
                    return -1;
                }
                return 0;
            })
        }
        return countryData.toSorted((a,b) => {
            if(b.area > a.area){
                return 1;
            }
            if(a.area > b.area){
                return -1;
            }
            return 0;

        })
    }

    const sortAlphabetic = (boolFlag) =>{
        if(boolFlag) {
            return countryData.toSorted((a,b) => {
                if(a.name.common > b.name.common){
                    return 1;
                }
                if(b.name.common > a.name.common){
                    return -1;
                }
                return 0;
            })
        }
        return countryData.toSorted((a,b) => {
            if(b.name.common > a.name.common){
                return 1;
            }
            if(a.name.common > b.name.common){
                return -1;
            }
            return 0;
        })
    }

    const handleClick = (item) => {
        if(item === "Sort by Population"){
            setPopulationSort(!populationSort);
            setCountryData(sortByPopulation(populationSort));
        } else if(item === "Sort by Country Size"){ 
            setCountrySizeSort(!countrySizeSort);
            setCountryData(sortByCountrySize(countrySizeSort));
        } else if (item === "Sort Alphabetically"){
            setAlphabetSort(!alphabetSort);
            setCountryData(sortAlphabetic(alphabetSort));
        }
    }

    
    return (
        <header className="menuHeader">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xl-12 col-lg-12">
                        <nav className="menu">
                            <ul>
                                {TopMenuItems.map(menuItem=>{
                                    return(                            
                                    <li key={menuItem.text}>
                                        <button onClick={()=>{handleClick(menuItem.text)}}>
                                            <i className={`fa ${menuItem.icon}`} style={{paddingRight:"5px"}}></i> 
                                             {menuItem.text} (click for {menuItem.comparator})</button>
                                    </li>)
                                })}

                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default TopMenu;