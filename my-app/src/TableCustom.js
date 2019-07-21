import React, {Component} from 'react';
import Table from 'react-bootstrap/Table'
import FaTrash from 'react-icons/lib/fa/trash';
import FaEdit from 'react-icons/lib/fa/edit';
// import axios from 'axios';
// import logo from './logo.svg';
import './TableCustom.css';

class TableCustom extends Component{
  constructor(props){
    super(props);
    this.state = {
      selectedCountArr:[],
      selected: {},
      selectAll: 0,
      data:[]
    }

  }


  toggleRow(id) {
      const newSelected = Object.assign({}, this.state.selected);
      newSelected[id] = !this.state.selected[id];
      this.setState({
        selected: newSelected,
        selectAll: 2,
      });
    }

    countSelection(index, id){
      const newSelected = Object.assign({}, this.state.selected);
      newSelected[id] = !this.state.selected[id];
      console.log(Object.keys(newSelected));
      if(newSelected[id] === true){
        console.log("yeah");
        this.state.selectedCountArr.push(index);
        console.log(this.state.selectedCountArr);
      } else {
        var removeEl = this.state.selectedCountArr.indexOf(index);
        this.state.selectedCountArr.splice(removeEl, 1);
        console.log(this.state.selectedCountArr);
        console.log(Object.keys(newSelected));
        console.log(Object.keys(newSelected).splice(removeEl, 1));
      }
    }



    toggleSelectAll() {
      let newSelected = {};

      if (this.state.selectAll === 0) {
        this.state.data.forEach(x => {
          newSelected[x.id] = true;
        });
      }

      this.setState({
        selected: newSelected,
        selectAll: this.state.selectAll === 0 ? 1 : 0
      });
    }

  componentDidMount() {

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

  deleteRow(index) {

      var data = [...this.state.data];
      var removeEl = this.state.selectedCountArr.indexOf(index);
      console.log(data.splice(index, 1));
      console.log(data);
      data.splice(index, 1);
      this.state.selectedCountArr.splice(removeEl, 1);
      this.setState({data});
  }

  deleteRowsSelected() {
      var data = [...this.state.data];
      // var removeEl = this.state.selectedCountArr.indexOf(index);
      // console.log(data.splice(index, 1));
      // if(this.state.selectedCountArr >  0)  {

      this.state.selectedCountArr.sort(function(a,b){
      return (a - b)
      })
      console.log(this.state.selectedCountArr);
        var c = 0;
        var d = 1;
        for(var j = 0; j < this.state.selectedCountArr.length; j++ ){
          if(j > 0) {
          console.log(this.state.selectedCountArr[j]);
          c = this.state.selectedCountArr[j] - d;
          console.log(c);
          // data.splice((this.state.selectedCountArr[j]), 1);
          // this.state.selectedCountArr.splice(this.state.selectedCountArr[j], 1);
          console.log((data.splice(c, 1)))
          data.splice(c, 1)
          // console.log(this.state.selectedCountArr.splice(this.state.selectedCountArr[j], 1));
        } else {
          console.log(this.state.selectedCountArr[j]);
          c = this.state.selectedCountArr[j];
          console.log(c);
          // data.splice((this.state.selectedCountArr[j]), 1);
          // this.state.selectedCountArr.splice(this.state.selectedCountArr[j], 1);
          console.log((data.splice(c, 1)))
          data.splice(c, 1)
        }
        // console.log(data);
          d = d + 1;
          this.setState({
            data
          });
        // }
      }
      //
      //
      // this.setState({
      //   data
      // });



      // data.splice(index, 1);
      // this.state.selectedCountArr.splice(removeEl, 1);
      this.state.selectedCountArr = [];
  }

  render() {

    let lastCell = 'last-cell-style';
    let iconStyles = 'menu';
    let iconTrash = 'iconTrash';
      // if (this.props.mouseOver) {
      //   iconStyles += ' menu-active';
      // }



  return (
    <Table responsive striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>

          <label className="container-check">
          <input
                type="checkbox"
                className="checkbox"
                checked={this.state.selectAll === 1}
                ref={input => {
                  if (input) {
                    input.indeterminate = this.state.selectAll === 2;
                  }
                }}
                onChange={() => this.toggleSelectAll()}
              />
           <span className="checkmark"></span>
           </label>
           </th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Gender</th>
          <th>IP Address</th>
          <th>Country</th>
          <th>Last activity</th>
          <th>Frequency</th>
          <th className={(this.state.selectedCountArr.length > 1 ? "deleteAllSelected" : "notAllSelected" )}>
            <a className={iconTrash} title="Delete all selected" onClick={() => this.deleteRowsSelected()}>
              <FaTrash />
            </a>
          </th>
        </tr>
      </thead>
      <tbody>
        {this.state.data.map((x, i) => <tr key={i}  className={[(this.state.selected[x.id] === true ? "tableSelected" : "" ), lastCell].join(' ')}>
            <td>
            <label className="container-check">
            <input
                type="checkbox"
                className="checkbox"
                checked={this.state.selected[x.id] === true}
                onChange={(() => this.toggleRow(x.id))}
                onClick={() => this.countSelection(i, x.id)}

              />
            <span className="checkmark"></span>
            </label>
            </td>
            <td>{x.first_name}</td>
            <td>{x.last_name}</td>
            <td>{x.email}</td>
            <td>{x.gender}</td>
            <td>{x.ip_address}</td>
            <td>{x.country}</td>
            <td>{x.last_activity}</td>
            <td>{x.frequency}</td>
            <td>
              <a className={iconStyles} onClick ={index => this.deleteRow(i)}><FaTrash /></a>
              <a className={iconStyles}><FaEdit /></a>
            </td>
          </tr>)}

      </tbody>
    </Table>
  );
}
}

export default TableCustom;
