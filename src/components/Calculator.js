import React, {Component} from 'react';
import '../styles/Calculator.css';
import Form from "./Form.js"

export default class Calculator extends Component {

  constructor(props){
    super(props);

    this.Compute = this.Compute.bind(this);

    this.state = {county:"N/A", reviews: [[0,0,0,'N/A'],[0,0,0,'N/A']], countyCases: "0", 
    countyRiskLevel: "0", countyInfectionRate: "0", countyCaseDensity: "0", countyVaccinationsCompleted: "0" };
  }


  Compute(Reviews, County, CountyCases, CountyRiskLevel, CountyInfectionRate, CountyCaseDensity, CountyVaccinationsCompleted ) {
    
    if (typeof(CountyVaccinationsCompleted) !== "number" ){
        this.setState({ countyVaccinationsCompleted: `0` });
    } else {
        this.setState({ countyVaccinationsCompleted: `${CountyVaccinationsCompleted}` });
    } 
    this.setState({ county: `${County}` });
    this.setState({ countyCases: `${CountyCases}` });
    this.setState({ countyRiskLevel: `${CountyRiskLevel}` });
    this.setState({ countyCaseDensity: `${CountyCaseDensity}` });
    this.setState({ countyInfectionRate: `${CountyInfectionRate}` });
    this.setState({ reviews: Reviews });
    console.log(this.state.reviews[0][0]);
  }
  

  render(){
    return (
      <div className="Calculator">
        <Form calculate={this.Compute} />
        <h1 className="center-h1" >{this.state.county}</h1>
        <h1 className="center-h1" >Risk Level: {this.state.countyRiskLevel}</h1>
        <h2 className="center-h1" >{this.state.countyCases} New Cases</h2>
        <h2 className="center-h1" >Case Density: {this.state.countyCaseDensity}</h2>
        <h2 className="center-h1" >County Infection Rate: {this.state.countyInfectionRate}</h2>
        <h2 className="center-h1" >{this.state.countyVaccinationsCompleted} Total Vaccinations Completed (both doses)</h2>
        <br/>
        <div className="reviews">
        <h1>Reviews:</h1>
        <h2 className="bold">Submitted By Anonymous</h2>
        <h3 className="left-h2" >This business {this.state.reviews[0][0] ? 'does' : 'does not'} Social Distance</h3>
        <h3 className="left-h2" >This business {this.state.reviews[0][1] ? 'is' : 'is not'} currently busy</h3>
        <h3 className="left-h2" >This business {this.state.reviews[0][2] ? 'does' : 'does not'} currently offer pickup options</h3>
        <h2 className="bold">Comments:</h2><h3 className="left-h2" >{this.state.reviews[0][3]}</h3>
        <br/>
        <h2 className="bold">Submitted By Anonymous</h2>
        <h3 className="left-h2" >This business {this.state.reviews[1][0] ? 'does' : 'does not'} Social Distance</h3>
        <h3 className="left-h2" >This business {this.state.reviews[1][1] ? 'is' : 'is not'} currently busy</h3>
        <h3 className="left-h2" >This business {this.state.reviews[1][2] ? 'does' : 'does not'} currently offer pickup options</h3>
        <h2 className="bold">Comments:</h2><h3 className="left-h2" >{this.state.reviews[1][3]}</h3>
        </div>

      </div>

    );
  }
}
