import React, { useState, useEffect } from 'react';
import EmployeeService from '../services/EmployeeService';
import { useParams, useNavigate } from "react-router-dom";


function CreateEmployeeComponent ()  {

    const navigate = useNavigate();
    let { id } = useParams();
   
    const [employee, setEmployee] = useState({firstName: '', lastName: '', emailId: ''});
 
    useEffect(()=> {
         if(id === '_add'){
            return
        }else{
            EmployeeService.getEmployeeById(id).then( (res) =>{
                let employee = res.data;
                setEmployee({firstName: employee.firstName,
                    lastName: employee.lastName,
                    emailId : employee.emailId
                });
            });
        }    
    }, [id]);
        

   const saveOrUpdateEmployee = (e) => {
        e.preventDefault();
        let newEmployeeDetails = {firstName: employee.firstName, lastName: employee.lastName, emailId: employee.emailId};
        console.log('employee => ' + JSON.stringify(newEmployeeDetails));

        if(id === '_add'){
            EmployeeService.createEmployee(newEmployeeDetails).then(res =>{
                console.log('response: ', res);
                navigate('/employees');
            });
        }else{
            EmployeeService.updateEmployee(newEmployeeDetails, id).then( res => {
                navigate('/employees');
            });
        }
    }
    
    const changeFirstNameHandler= (event) => {
        setEmployee({...employee, firstName: event.target.value});
    }

    const changeLastNameHandler= (event) => {
        setEmployee({...employee, lastName: event.target.value});
    }

    const changeEmailHandler= (event) => {
        setEmployee({...employee, emailId: event.target.value});
    }

    const cancel = () => {
        navigate('/employees');
    }

    const getTitle = () =>{
        if(id === '_add'){
            return <h3 className="text-center">Add Employee</h3>
        }else{
            return <h3 className="text-center">Update Employee</h3>
        }
    }
    
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> First Name: </label>
                                            <input placeholder="First Name" name="firstName" className="form-control" 
                                                value={employee.firstName} onChange={changeFirstNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Last Name: </label>
                                            <input placeholder="Last Name" name="lastName" className="form-control" 
                                                value={employee.lastName} onChange={changeLastNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Email Id: </label>
                                            <input placeholder="Email Address" name="emailId" className="form-control" 
                                                value={employee.emailId} onChange={changeEmailHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={saveOrUpdateEmployee}>Save</button>
                                        
                                        <button className="btn btn-danger" onClick={cancel} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    
}


export default CreateEmployeeComponent;