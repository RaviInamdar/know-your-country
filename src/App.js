import React, {useState, useEffect} from "react";
import './App.css';
import Main from './components/Main';
import CountryContext from "./store/CountryContext";
import {Routes, Route} from "react-router-dom";
import CountryDetail from "./components/CountryDetail";

function App() {
  const [countryData, setCountryData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [searchParam, setSearchParam] = useState("ALL");
  const [input, setInput] = useState("");

  const value = {countryData, originalData, searchParam, input, setCountryData, setOriginalData, setSearchParam, setInput};


  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all').then(response => response.json())
      .then(responseData => {
        setCountryData(responseData);
        setOriginalData(responseData);
      }).catch(error => {
        console.log("error in fetching all", error);
      });

  },[]);

  useEffect(() => {
    if(input === ""){
      fetch('https://restcountries.com/v3.1/all').then(response => response.json())
      .then(responseData => {
        setCountryData(responseData);
      }).catch(error => {
        console.log("error in fetching all", error);
      });
    } else {
      if(searchParam === "Language"){
        fetch(`https://restcountries.com/v3.1/lang/${input}`).then(response => response.json())
        .then(responseData => {
          setCountryData(responseData);
        }).catch(error => {
          console.log("error in fetching country based on language", error);
        });
      }
      else if(searchParam === "Continent"){
        fetch(`https://restcountries.com/v3.1/region/${input}`).then(response => response.json())
        .then(responseData => {
          setCountryData(responseData);
        }).catch(error => {
          console.log("error in fetching country based on continent", error);
        });
      }
      else if(searchParam === "Country Name"){
        fetch(`https://restcountries.com/v3.1/name/${input}`).then(response => response.json())
        .then(responseData => {
          setCountryData(responseData);
        }).catch(error => {
          console.log("error in fetching country based on country name", error);
        });
      }
    }
  },[input]);

  return (
    <>
      <CountryContext.Provider value={value}>
      <Routes>
        <Route path="/">
          <Route index element={<Main/>}></Route>
          <Route path=":id" element={<CountryDetail/>}></Route>
        </Route>
      </Routes>
      </CountryContext.Provider>
    </>
  );
}

export default App;
