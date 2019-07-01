import React, {Component} from 'react';
import Table from 'react-bootstrap/Table'
// import axios from 'axios';
// import logo from './logo.svg';
// import './App.css';

// var jsonData = require('./jsonData/MOCK_DATA.json');
// var myObject = JSON.parse(jsonFile);
//
// function reqListener(e) {
//     data = JSON.parse(this.responseText);
//     console.log(data);
// }

// var data;
//
// var oReq = new XMLHttpRequest();
// oReq.onload = reqListener;
// oReq.open("get", "jsonData/MOCK_DATA.json", true);
// oReq.send();
//
// function reqListener(e) {
//     data = JSON.parse(this.responseText);
//     console.log(data);
// }
// console.log(data);

// function getAddress (id) {
//  return this.http.get("data/address.json")
//  .map(res => res.json());
//  }

// var data;
//
// function loadJSON(jsonfile, callback) {
//
//         var jsonObj = new XMLHttpRequest();
//         jsonObj.overrideMimeType("application/json");
//         jsonObj.open('GET', "./jsonData/MOCK_DATA.json", true);
//         jsonObj.onreadystatechange = function () {
//               if (jsonObj.readyState == 4 && jsonObj.status == "200") {
//                 callback(jsonObj.responseText);
//               }
//         };
//         jsonObj.send(null);
//      }
//
//     function load() {
//
//         loadJSON(jsonData, function(response) {
//             data = JSON.parse(response);
//             console.log(data);
//         });
//     }

    // load();

    // constructor (props) {
    //    this.state = {
    //          items: [],
    //    }
    //    axios.get('http://localhost:3000/my-app/src/jsonData/MOCK_DATA.json')
    //     .then(res => {
    //         this.setState({ items: res.data });
    //    });
    // }

class TableCustom extends Component{
// function TableCustom() {
  // console.log(jsonFile);
  // load();
  constructor(props){
    super(props);
    this.state = {
      data:[]
    }
  }

  componentDidMount() {
      //here my function that store the response from my api
      // GetData('./jsonData/MOCK_DATA.json',
          // this.setState({data: JSON.parse('./jsonData/MOCK_DATA.json')});
          fetch('./MOCK_DATA.json', {
            headers : {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
             }
          })
          .then((response) => response.json())
          .then((findresponse)=> {
            this.setState({
              data:findresponse
            })
          })


  }

  // {this.state.data.map((x, i) => <td key={i}>x.first_name</td>)}
  // {this.state.data.map((x, i) => <td key={i}>x.last_name</td>)}
  // {this.state.data.map((x, i) => <td key={i}>x.email</td>)}
  // {this.state.data.map((x, i) => <td key={i}>x.gender</td>)}
  // {this.state.data.map((x, i) => <td key={i}>x.ip_address</td>)}
  // {this.state.data.map((x, i) => <td key={i}>x.country</td>)}
  // {this.state.data.map((x, i) => <td key={i}>x.last_activity</td>)}
  // {this.state.data.map((x, i) => <td key={i}>x.frequency</td>)}
  // <td>{this.state.first_name}</td>
  // <td>{this.state.last_name}</td>
  //

  render() {
  return (
    <Table responsive striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Gender</th>
          <th>IP Address</th>
          <th>Country</th>
          <th>Last activity</th>
          <th>Frequency</th>
        </tr>
      </thead>
      <tbody>
        {this.state.data.map((x, i) => <tr key={i}>
            <td>{x.first_name}</td>
            <td>{x.last_name}</td>
            <td>{x.email}</td>
            <td>{x.gender}</td>
            <td>{x.ip_address}</td>
            <td>{x.country}</td>
            <td>{x.last_activity}</td>
            <td>{x.frequency}</td>
          </tr>)}

      </tbody>
    </Table>
  );
}
}

export default TableCustom;
