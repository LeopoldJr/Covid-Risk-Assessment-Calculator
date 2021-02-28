import React, { useState, useEffect, useRef } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Autocomplete from '@material-ui/lab/Autocomplete';
//import CheckIcon from '@material-ui/icons/Check';
//import ToggleButton from '@material-ui/lab/ToggleButton';
import useInputState from "../hooks/useInputState";
import "../styles/Form.css";

function Form( props ) {
    //const [{businessName}, {changeBusinessName}] = useInputState("");

    const [county, changeCounty] = useInputState("");

    const [businessName, changeBusinessName] = useInputState("");

    //const [getReviews, changeGetReviews] = useInputState("");
    
    /*
    const [isFrequentlyOutside, setIsFrequentlyOutside] = React.useState(false);
    */
    const [data, setData] = useState({response: []});
    const [data2, setData2] = useState({response2: []});
    const [data3, setData3] = useState({response3: []});
    const [allCounties, setAllCounties] = useState([]);
    // var getReviews = [{isIDUpdated: false}];
    // var test = false;
    // 
    // var prevID = 0;
    
    useEffect( () => {
        const axios = require("axios");
        const axiosCancelSource = axios.CancelToken.source();     
          
        axios.get('https://api.covidactnow.org/v2/counties.json?apiKey=9f87d5ec187e4e2c98c3ca0ad65b4e02')
        .then((response2)=>{
        setData2(response2.data);
        
        })
        .catch((error)=>{
        console.log(error)
        })

        return () => {
            axiosCancelSource.cancel('Axios request canceled.')
        }
          
    }, []);

    useEffect( () => {
        
        const axios = require("axios");
        const axiosCancelSource = axios.CancelToken.source();

        axios.get('https://cusehacks-306121.ue.r.appspot.com/business')
        .then((response)=>{
          setData(response.data);
          
        })
        .catch((error)=>{
          console.log(error)
        })
        
            return () => {
                axiosCancelSource.cancel('Axios request canceled.')
              }
          
          }, []);

         
          useEffect( () => {
                const axios = require("axios");
                const axiosCancelSource = axios.CancelToken.source();
                axios.get(`https://cusehacks-306121.ue.r.appspot.com/businessReview`)
                    .then((response3)=>{
                        setData3(response3.data);
                    
                     })
                    .catch((error)=>{
                        console.log(error)
                    })
                return () => {
                    axiosCancelSource.cancel('Axios request canceled.')
                }
              
              
        
              
              },[]);
        
          
    var counter = 0;
    var countyNameVar;
    var stateNameVar;
    const setCounties = (e) => {
        
        if (counter === 0 && allCounties.length === 0)
        {
            data2.map(data2 =>{
                setAllCounties(allCounties => [...allCounties, {county: data2.county, state: data2.state}]);
            })
            counter++;
        }
    }
    // const UseBusinessId = () => {
    //     const axios = require("axios");
    //     const axiosCancelSource = axios.CancelToken.source();
    //     console.log(Id);
    //     axios.get(`https://cusehacks-306121.ue.r.appspot.com/businessReview/1`)
    //     .then((response3)=>{
    //     setData3(response3.data);
    //     console.log(data3);
    //     console.log(data3.socialDistance);
        
    //     })
    //     .catch((error)=>{
    //     console.log(error)
    //     })

    //     return () => {
    //         axiosCancelSource.cancel('Axios request canceled.')
    //     }

    // }

    const handleSubmit = (e) => {
        e.preventDefault();
        var businessId;
        var socialDistance;
        var busy;
        //var stateDeaths;
        var countyCases;
        var countyRiskLevel;
        var countyInfectionRate;
        var countCaseDensity;
        var countyVaccinationsCompleted;
        var allReviews = [];
        var oneReview = [];
        var reviewText;
        var pickupOptions;
        //var obj = JSON.parse(data);
        {data.map(data =>{ 
            if (data.name === businessName){
                businessId = data.id;
                //stateDeaths = data.actuals.deaths;
            }
            
        })}
        //UseBusinessId(businessId);
        
       
        {data2.map(data2 =>{ 
            if (data2.county === countyNameVar && data2.state === stateNameVar){
                countyCases = data2.actuals.newCases;
                countyRiskLevel = data2.riskLevels.overall;
                countyInfectionRate = data2.riskLevels.infectionRate;
                countCaseDensity = data2.riskLevels.caseDensity;
                countyVaccinationsCompleted = data2.actuals.vaccinationsCompleted;
            }
            
        })}
        {data3.map(data3 =>{ 
            if (data3.businessId === businessId){
                socialDistance = data3.socialDistance;
                busy = data3.busy;
                pickupOptions = data3.pickupOptions;
                reviewText = data3.reviewText;
                oneReview = [socialDistance, busy, pickupOptions, reviewText];
                allReviews = [...allReviews,oneReview];
            }
            
        })}
        props.calculate(allReviews, countyNameVar, countyCases, countyRiskLevel, countyInfectionRate, countCaseDensity, countyVaccinationsCompleted );

    }

    return (
        <div>
        <Paper>
            <form>
            <div className="New-Field">
                <h1>Type the business name</h1>
                <div>
                <TextField value={businessName} onChange={changeBusinessName} />
            </div>
            <div className="auto-complete">

            {/* <div className="New-Field">
                <h1>County</h1>
                <TextField value={county} onChange={changeCounty} />
            </div> */}
            <Autocomplete
                id="combo-box-demo"
                options={allCounties}
                getOptionLabel={(option) => option.county + ', ' + option.state }
                style={{ width: 300 }}
                onChange={(event, value) => {if(value != null){countyNameVar = value.county.toString();stateNameVar = value.state.toString();}}}
                renderInput={(params) => <TextField {...params} value={county} onChange={e => { changeCounty(e); setCounties(e); }} label="Enter County" variant="outlined" />}
                />  
            </div>

            {/* <div className="New-Field">
                <h1>Are you actively participating in social distancing?</h1>
                <ToggleButton
                value="check"
                selected={isQuaratined}
                onChange={() => {
                    setIsQuaratined(!isQuaratined);
                }}
                >
                <CheckIcon />
                </ToggleButton>
            </div>

            <div className="New-Field">
                <h1>Do you enter public spaces two times a week or less?</h1>
                <ToggleButton
                value="check"
                selected={isFrequentlyOutside}
                onChange={() => {
                    setIsFrequentlyOutside(!isFrequentlyOutside);
                }}
                >
                <CheckIcon />
                </ToggleButton>
            </div> */}
            </div>
            
            <Button className="submit-button" variant="secondary" onClick={ (e) => {handleSubmit(e)}}>Calculate</Button>
            </form>
        </Paper>
        </div>
    )


}
export default Form;