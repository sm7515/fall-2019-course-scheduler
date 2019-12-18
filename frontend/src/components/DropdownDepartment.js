import React from 'react';
import {collegeList} from "../data/collegeList";
import { departmentList } from '../data/departmentList';

class DropdownCollege extends React.Component
{
    constructor(){
        super();
       
       };

    state = {
        display: false,
        college: "",
        selected: "Enter Subject",
        options: []
      };

    componentDidMount = () =>{
        this.setState({selected: this.props.department});
    }

    componentWillReceiveProps = () => {
        // this.setState({selected: this.props.department});
        

        if(this.props.college != this.state.college)
        {
            for(var i = 0; i < departmentList.length; i++)
            {
                if(departmentList[i].college == this.props.college)
                {
                    this.setState({options: departmentList[i].department}, ()=>{
                        // console.log(this.state);
                    });
                }   
            }
        }

        this.setState({college: this.props.college});

    }
       
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

    selectDepartment = (key) => {
        this.setState({selected: key.department})
        // this.props.clickComp({college: key.department});
    }

    render() {
        return (
            <div  className="dropdown department" >
             <div className="button" onClick={this.showDropdownMenu}> {this.state.selected} </div>
    
              {this.state.display ? (<ul>
                  {this.state.options.length != 0 && this.state.options.map((i,key)=> {
                    
                    if(key != 0)
                    {
                        return(
                        <div className="each-department" key onClick ={() => {
                            this.props.clickComp({
                            department: this.state.options[key],
                            })
                            this.selectDepartment({department: this.state.options[key]});
                            }}>
                            
                            {this.state.options[key]}</div>
                        )
                    }
                  })}
              </ul>) 
              : (null)}
    
           </div>);
    }
}

export default DropdownCollege;