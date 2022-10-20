import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {useState} from 'react';
import {Table} from 'react-bootstrap'

console.log("Loading Data from Employee Get API");    



function Employee() {
    const [employeeName,setEmployeeName] = useState();
    const [accountNumber,setAccountNumber] = useState();
    const [branchId,setBranchId] = useState();
    const [accountHolding,setAccountHolding] = useState();
    
    const setAccNumber = (e) => {
        
        setAccountNumber(e.target.value);
    };
    const setEmpName = (e) => {
        setEmployeeName(e.target.value);
    };
    const setBranch = (e) => {
        setBranchId(e.target.value);
    };
    const setHolding = (e) => {
        setAccountHolding(e.target.value);
    };

    function addEmployee(){
        // var employeeName = document.getElementById('employeeName').value;
        // var accountNumber = document.getElementById('accountNumber').value;
        // var accountHolding = document.getElementById('balance').value;
        // var branchId = document.getElementById('branchId').value;
    
        let data = {
            accountHolding:accountHolding,
            accountNumber:accountNumber,
            branchId:branchId,
            employeeName:employeeName
        }
        console.log(data)
        fetch('http://localhost:3002/employee/add',{
        method:"POST",
        body: JSON.stringify(data),
        headers : {
            "Content-Type":"application/json",
            "Access-Control-Allow-Origin":"*"
        }
        }).then(response => response.json())
        .then(json => console.log(json));
        console.log("Employee added!");
    }
    
    
    async function getEmployees(e){
        e.preventDefault();
        const resp = await fetch('http://localhost:3002/employee/findEmployees',{method:"GET"});
        var data = await resp.json();
        console.log(data);
        let tab = `<tr> 
                    <th> Employee Id </th>
                    <th> Employee Name </th>
                    <th> Account Number </th>
                    <th> Branch Id </th>
                    <th> Balance </th>
                    </tr>`;
                    for( let p of data){
                        tab += `<tr> 
                            <td>${p.employeeId}</td>
                            <td>${p.employeeName}</td>
                            <td>${p.accountNumber}</td>
                            <td>${p.branchId}</td>
                            <td>${p.accountHolding}</td>                            
                        </tr>`
                    }
                    document.getElementById("employee-table").innerHTML = tab;
    }
    async function getEmployee(){
        var empid =  document.getElementById('employeeId').value;
        const resp = await fetch('http://localhost:3002/employee/findEmployee/'+empid,{method:"GET"});
        var data = await resp.json();
        console.log(data);
        let tab = `<tr> 
                    <th> Employee Id </th>
                    <th> Employee Name </th>
                    <th> Account Number </th>
                    <th> Branch Id </th>
                    <th> Balance </th>
                    </tr>`;
                    
                        tab += `<tr> 
                            <td>${data.employeeId}</td>
                            <td>${data.employeeName}</td>
                            <td>${data.accountNumber}</td>
                            <td>${data.branchId}</td>
                            <td>${data.accountHolding}</td>                            
                        </tr>`
                    
                    document.getElementById("employee").innerHTML = tab;
    }
    
    return (
        <div className="Employee">
        <Navbar bg="light" variant="light">
            <Container>
            {/* Add logo to navbar <img src="D:\Axis\Internal Project\PAYWIZ\paywiz\src\image.jpg" className="d-inline-block align-top" ></img> */}
                <Navbar.Brand id="brand" href="/home">PayWiz</Navbar.Brand>
                    <Nav className="me-auto">
                    <Nav.Link id="navbut"  href="/Employee">Employee</Nav.Link>
                    <Nav.Link id="navbut"  href="/bank">Bank</Nav.Link>
                    <Nav.Link id="navbut"  href="/salary">Salary</Nav.Link>
                    <Nav.Link id="navbut" className='logout'  href="/login">Logout</Nav.Link>
                </Nav>
            </Container>
        </Navbar>                        
        <div className='container'>
            <form className='AddEmployee'>
                <div className='AddEmployeeContent'>
                    <h3 className='title'>Employee</h3>
                <div className="input-group mb-3">
                <span className="input-group-text" id="inputGroup-sizing-default">Name</span>
                <input type="text" id="employeeName" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" onChange={(e) => setEmpName(e)}/>
                </div>
                <div className="input-group mb-3">
                <span className="input-group-text" id="inputGroup-sizing-default">Account Number</span>
                <input type="text" id="accountNumber" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" onChange={(e) =>setAccNumber(e)}/>
                </div>
                <div className="input-group mb-3">
                <span className="input-group-text" id="inputGroup-sizing-default">Balance</span>
                <input type="text" id="balance" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" onChange={(e) => setHolding(e)}/>
                </div>
                <div className="input-group mb-3">
                <span className="input-group-text" id="inputGroup-sizing-default">Branch Id</span>
                <input type="text" id="branchId" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" onChange={(e) => setBranch(e)} />
                </div>
                
                <button className="btn btn-primary btn-sm" onClick={(e) => addEmployee(e)} id="addbut" >Add Employee</button>
                </div>
                
            </form>
            
        </div>
        
        <div className='searchbox'>
        <div id="get-employee" className='Auth-form-list'>
                <button className="btn btn-primary" id="listal" onClick={(e) => getEmployees(e)}>List All</button>
                <Table id="employee-table" striped bordered hover variant="dark"></Table>        
        </div>

        <div className="form-inline">
            <input className="form-control mr-sm-2" id="employeeId" type="search"  placeholder="Emp Id" aria-label="Search" aria-required/>
            <button className="btn btn-success my-2 my-sm-0" id="salbut" onClick={(e) => getEmployee(e)}>Search</button>
            <Table id="employee" striped bordered hover variant="dark"></Table>
        </div>
        </div>
        </div>
    );
}
export default Employee;