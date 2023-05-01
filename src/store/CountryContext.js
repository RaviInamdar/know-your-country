import React from 'react';

const CountryContext = React.createContext({
    countryData: [],
    originalData: [],
    searchParam: "ALL",
    input: "",
    setCountryData: () => {},
    setOriginalData: () => {},
    setSearchParam: () => {},
    setInput: () => {}
});

export default CountryContext;