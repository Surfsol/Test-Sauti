import React, { useState, useEffect } from "react";
import "./App.scss";
import "./index.css";
import ReactGa from "react-ga";
import Navbar from "./Components/Navbar";
import FilterBox from "./Components/FilterBox";
import "react-dropdown/style.css";
import { withRouter } from "react-router-dom";
import Queries from "./Components/Queries";

const App = () => {
  const [index, setIndex] = useState({type: "gender", query: "Users"});
  const [crossFilter, setCrossFilter] = useState({type: "", query: "Users"});
  const [additionalFilter, setAdditionalFilter] = useState({type: '', query: '', label: ''});
  const [indexLabel, setIndexLabel] = useState("Gender");
  const [crossLabel, setCrossLabel] = useState("");
  const [checkboxOptions, setCheckboxOptions] = useState([]);
  const [selectedCheckbox, setSelectedCheckbox] = useState({});
  console.log(selectedCheckbox)
  const [selectedCheckboxCross, setSelectedCheckboxCross] = useState({});
  console.log(selectedCheckboxCross)
  const [selectedCheckboxIndex, setSelectedCheckboxIndex] = useState({});
  console.log(selectedCheckboxIndex)
  const [startDate, setStartDate] = useState("2012-01-01");
  const [endDate, setEndDate] = useState("2020-01-08");

const allSelected = {...selectedCheckbox, ...selectedCheckboxCross, ...selectedCheckboxIndex}
console.log(`allSelected`,allSelected)
  
  // useEffect(() => {
  //   ReactGa.initialize("UA-155468784-1");
  //   //to report specified pageview:
  //   ReactGa.pageview("/");
  // }, []);

  const onChange = event => {
    setIndex(event.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    setCrossFilter(e.target.value);
  };

  return (
    <div className="App">
      <Navbar />
      <div className="main-container">
        <div className="header">
          <h1>Informal Cross-Border Trade Data</h1>
        </div>
        <div className="content-container">
          <div className="chart-container">
            <Queries
              index={index}
              crossFilter={crossFilter}
              label={indexLabel}
              crossLabel={crossLabel}
              selectedCheckbox={selectedCheckbox}
              checkboxOptions={checkboxOptions}
              allSelected={allSelected}
              setCheckboxOptions={setCheckboxOptions}
              additionalFilter={additionalFilter}
              startDate={startDate}
              endDate={endDate}
            />
          </div>
          <div className="dropdown-container">
            <FilterBox
              onChange={onChange}
              onSubmit={onSubmit}
              index={index}
              checkboxOptions={checkboxOptions}
              crossFilter={crossFilter}
              setIndex={setIndex}
              setCrossFilter={setCrossFilter}
              setIndexLabel={setIndexLabel}
              setCrossLabel={setCrossLabel}
              setSelectedCheckbox={setSelectedCheckbox}
              setSelectedCheckboxCross={setSelectedCheckboxCross}
              setSelectedCheckboxIndex={setSelectedCheckboxIndex}
              setCheckboxOptions={setCheckboxOptions}
              setAdditionalFilter={setAdditionalFilter}
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(App);
