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
      selected:[],
      // selected: {},
      // selectAll: 0,
      data:[]
    }

  }

  toggleRow(id) {
      const newSelected = [...this.state.selected];

        var arrEl = newSelected.indexOf(id);
        if(arrEl == -1){
          newSelected.push(id);
          console.log(newSelected);
        }else{
          newSelected.splice(arrEl, 1);
          console.log(newSelected);
        }

      this.setState({
        selected: newSelected
      });
    }

    // countSelection(index, id){
    //   const newSelected = Object.assign({}, this.state.selected);
    //   newSelected[id] = !this.state.selected[id];
    //   console.log(Object.keys(newSelected));
    //   if(newSelected[id] === true){
    //     console.log("yeah");
    //     this.state.selectedCountArr.push(index);
    //     console.log(this.state.selectedCountArr);
    //   } else {
    //     var removeEl = this.state.selectedCountArr.indexOf(index);
    //     this.state.selectedCountArr.splice(removeEl, 1);
    //     console.log(this.state.selectedCountArr);
    //     console.log(Object.keys(newSelected));
    //     console.log(Object.keys(newSelected).splice(removeEl, 1));
    //   }
    // }


    toggleSelectAll() {
      const newSelected = [...this.state.selected];
      const emptyArr = [];
      // console.log(this.state.selected.length);

      if((this.state.data.length == this.state.selected.length) || (this.state.selected.length > 0)){
        this.setState({
          selected: emptyArr
        });

        // console.log(this.state.selected.length);
        // console.log(this.state.data.length);
      } else {
        for (var i = 0; i < this.state.data.length; i++) {
          newSelected.push(i);
        }
        // console.log(newSelected.length);
        // console.log(this.state.data.length);

        this.setState({
          selected: newSelected
        });
      }

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
      var removeEl = this.state.selected.indexOf(index);
      // console.log(data.splice(index, 1));
      data.splice(index, 1);
      this.state.selected.splice(removeEl, 1);
      this.setState({data});
  }

  deleteRowsSelected() {
      var data = [...this.state.data];
      var newSelected = [...this.state.selected];
      const emptySelected = [];



      // console.log(this.state.selected);

      // data = data.filter(function(item) {
      //   console.log(!newSelected.includes(item) ? true : newSelected.splice(newSelected.indexOf(item),1) && false);
      //   return !newSelected.includes(item) ? true : newSelected.splice(newSelected.indexOf(item),1) && false;
      // });

      data = data.filter( ( el, index ) => !newSelected.includes( index ) );
      // console.log(data);
      // data = data.filter(function(el){
            // console.log(newSelected.indexOf(el) !== -1);
        //     return newSelected.indexOf(el) !== -1;
        //
        // });
       // console.log(data.indexOf(el)));
        // console.log(newSelected.includes( el ));

      // newSelected.sort(function(a,b){
      //  return (b - a)
      // });
      //
      //
      //
      //   var c;
      //   for(var j = 0; j < newSelected.length; j++ ){
      //     c = newSelected[j];
      //     // console.log((data.splice(c, 1)))
      //     data.splice(c, 1)
      //
      //   }
      //
      //
      // newSelected.splice(1, newSelected.length);

      this.setState({
        data,
        selected: emptySelected
      });

  }



  render() {

    let lastCell = 'last-cell-style';
    let iconStyles = 'menu';
    let iconTrash = 'iconTrash';



  return (
    <Table responsive striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>

          <label className="container-check">
          <input
                type="checkbox"
                className="checkbox"
                checked={this.state.selected.length === this.state.data.length}

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
          <th className={(Object.keys(this.state.selected).length > 1 ? "deleteAllSelected" : "notAllSelected" )}>
            <a className={iconTrash} title="Delete all selected" onClick={() => this.deleteRowsSelected()}>
              <FaTrash />
            </a>
          </th>
        </tr>
      </thead>
      <tbody>
        {this.state.data.map((x, i) => <tr key={i}  className={[(this.state.selected.indexOf(i) !== -1 ? "tableSelected" : "" ), lastCell].join(' ')}>
            <td>
            <label className="container-check">
            <input
                type="checkbox"
                className="checkbox"
                checked={this.state.selected.indexOf(i) !== -1}
                onChange={(() => this.toggleRow(i))}
                // onClick={() => this.countSelection(i, x.id)}

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
