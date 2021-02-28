import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Autocomplete from '@material-ui/lab/Autocomplete';
import useInputState from "../hooks/useInputState";
import "../styles/Form.css";

function Form( props ) {

    const [county, changeCounty] = useInputState("");

    const [businessName, changeBusinessName] = useInputState("");
    

    const [data, setData] = useState({response: []});

    const [data2, setData2] = useState({response2: []});

    const [data3, setData3] = useState({response3: []});

    const [allCounties, setAllCounties] = useState([]);

    //variables needed for grabbing autocomplete text
    var countyNameVar;
    var stateNameVar;

    //the following can be used for bad input later on
    //var defaultData = [];
    //var defaultData3 = [[0,0,0,"N/A"], [0,0,0,"N/A"]];
    
    //get all counties and their info from CovidActNow API
    useEffect( () => {
        const axios = require("axios");
        const axiosCancelSource = axios.CancelToken.source();     
          
        axios.get('https://api.covidactnow.org/v2/counties.json?apiKey=9f87d5ec187e4e2c98c3ca0ad65b4e02')
        .then((response2)=>{
        setData2(response2.data);
        // if(typeof(data2) == 'undefined' || data2 == null){
        //     setData2(defaultData);
        // }
        
        })
        .catch((error)=>{
          //setData2(defaultData);
          console.log(error)
        })

        return () => {
            axiosCancelSource.cancel('Axios request canceled.')
        }
          
    },[]);
    //get all businesses stored in our Database
    useEffect( () => {
        const axios = require("axios");
        const axiosCancelSource = axios.CancelToken.source();

        axios.get('https://cusehacks-306121.ue.r.appspot.com/business')
        .then((response)=>{
          setData(response.data);
        //   if(typeof(data) == 'undefined' || data == null){
        //     setData(defaultData);
        //     }
          
        })
        .catch((error)=>{
          //setData(defaultData);
          console.log(error)
        })
        
            return () => {
                axiosCancelSource.cancel('Axios request canceled.')
              }
          
          },[]);

    //get all business reviews from our Database
    useEffect( () => {
        const axios = require("axios");
        const axiosCancelSource = axios.CancelToken.source();

        axios.get(`https://cusehacks-306121.ue.r.appspot.com/businessReview`)
            .then((response3)=>{
                setData3(response3.data);
                // if(typeof(data3) == 'undefined' || data3 == null){
                //     setData3(defaultData);
                // }
                    
                })
            .catch((error)=>{
                //setData3(defaultData);
                console.log(error)
            })
        return () => {
            axiosCancelSource.cancel('Axios request canceled.')
        }

        },[]);
        
    /*
        Loops through the list of counties from the CovidActNow API and stores them along with their state
        to be used with autocomplete
    */
    var counter = 0;
    const setCounties = (e) => {
        
        if (counter === 0 && allCounties.length === 0)
        {
            data2.map(data2 =>{
                setAllCounties(allCounties => [...allCounties, {county: data2.county, state: data2.state}]);
                return 0;
            })
            counter++;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        var businessId;
        var socialDistance;
        var busy;
        var countyCases;
        var countyRiskLevel;
        var countyInfectionRate;
        var countCaseDensity;
        var countyVaccinationsCompleted;
        var allReviews = [];
        var oneReview = [];
        var reviewText;
        var pickupOptions;
        //Grabs the business ID from the entered business
        data.map(data =>{ 
            if (data.name === businessName){
                businessId = data.id;
            }
            return 0;
            
        })
        
       //grabs the desired info about the entered county
        data2.map(data2 =>{ 
            if (data2.county === countyNameVar && data2.state === stateNameVar){
                countyCases = data2.actuals.newCases;
                countyRiskLevel = data2.riskLevels.overall;
                countyInfectionRate = data2.riskLevels.infectionRate;
                countCaseDensity = data2.riskLevels.caseDensity;
                countyVaccinationsCompleted = data2.actuals.vaccinationsCompleted;
            }
            return 0;
            
        })
        //grabs all the review data for the business via the business ID
        data3.map(data3 =>{ 
            if (data3.businessId === businessId){
                socialDistance = data3.socialDistance;
                busy = data3.busy;
                pickupOptions = data3.pickupOptions;
                reviewText = data3.reviewText;
                oneReview = [socialDistance, busy, pickupOptions, reviewText];
                allReviews = [...allReviews,oneReview];
            }
            //This may be used for handling bad input later on
            // if(typeof(allReviews) == 'undefined' || allReviews == null){
            //     allReviews = defaultData3;
            // }
            return 0;
            
        })
        props.calculate(allReviews, countyNameVar, countyCases, countyRiskLevel, countyInfectionRate, countCaseDensity, countyVaccinationsCompleted );

    }

    return (
        <div>
        <Paper className="Form-1">
            <form>
            <div className="New-Field">
                <h1>Type the business name</h1>
                <div>
                <TextField value={businessName} onChange={changeBusinessName} label="Business Name" />
            </div>
            <div className="auto-complete">
            <Autocomplete
                id="combo-box-demo"
                options={allCounties}
                getOptionLabel={(option) => option.county + ', ' + option.state }
                style={{ width: 300 }}
                onChange={(event, value) => {if(value != null){countyNameVar = value.county.toString();stateNameVar = value.state.toString();}}}
                renderInput={(params) => <TextField {...params} value={county} onChange={e => { changeCounty(e); setCounties(e); }} label="Enter County" variant="outlined" />}
                />  
            </div>
        </div>
            
            <Button className="submit-button" variant="secondary" onClick={ (e) => {handleSubmit(e)}}>Calculate</Button>
            </form>
        </Paper>
        </div>
    )


}
export default Form;