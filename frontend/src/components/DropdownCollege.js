import React from 'react';
import Dropdown from "react-bootstrap/Dropdown";
import {collegeList} from "../data/collegeList";
// import {bootStyle} from '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

// /bootstrap/dist/css/bootstrap.min.css

class DropdownCollege extends React.Component
{
    constructor(){
        super();
       
       };

    state = {
        display: false,
        selected: "Enter College"
      };

    componentDidMount = () =>{
        this.setState({selected: this.props.college});
    }

    // componentWillReceiveProps = () => {
    //     this.setState({selected: this.props.college});
    // }
       
    showDropdownMenu = (event) => {
        event.preventDefault();
        this.setState({ display: true }, () => {
        document.addEventListener('click', this.hideDropdownMenu);
        });
        }
       
    hideDropdownMenu = () => {
        this.setState({ display: false }, () => {
            document.removeEventListener('click', this.hideDropdownMenu);
    });

    }

    selectCollege = (key) => {
        
        this.setState({selected: key.college})
    }

    render() {
        return (
            <div  className="dropdown" style = {{background:"black",width:"200px", cursor: "pointer"} } >
             <div className="button" onClick={this.showDropdownMenu}> {this.state.selected} </div>
    
              { this.state.display ? (
              <ul>
                  {collegeList.map((i,key)=> {
                      
                    return(
                    <div key onClick ={() => {
                        this.props.clickComp({
                        college: collegeList[key]
                        })
                        this.selectCollege({college: collegeList[key]});
                        }}>
                        
                        {collegeList[key]}</div>
                    )
                  })}
              </ul>
            ):
            (
              null
            )
            }
           </div>);

        // return(<Dropdown>
        //     <Dropdown.Toggle variant="success" id="dropdown-basic">
        //         {this.state.selected}
        //     </Dropdown.Toggle>

        //     <Dropdown.Menu>
        //         {collegeList.map((i,key) => {
        //             return(
        //             <Dropdown.Item key onClick ={
        //                 () => {
        //                     this.props.clickComp({college: collegeList[key]})
        //                     this.selectCollege({college: collegeList[key]});  
        //                 }
        //             }>{collegeList[key]}
        //             </Dropdown.Item>
        //             )
        //         })}
        //     </Dropdown.Menu>
        // </Dropdown>);
    }
}

export default DropdownCollege;