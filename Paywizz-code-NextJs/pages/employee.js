import { useState } from 'react';

console.log("Loading Data from Employee API");
export default function Employee()
{
    const [employeeName,setEmployeeName] = useState();
    const [accountNumber,setAccountNumber] = useState();
    const [branchId,setBranchId] = useState();
    const [accountHolding, setAccountHolding] = useState();
    const [employeeId, setEmployeeId] = useState();

    const setEmpId = (e) =>
    {
        setEmployeeId(e.target.value);
    }
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

    function addEmployee(e){
        e.preventDefault();
        // var employeeName = document.getElementById('employeeName').value;
        // var accountNumber = document.getElementById('accountNumber').value;
        // var accountHolding = document.getElementById('balance').value;
        // var branchId = document.getElementById('branchId').value;
        
        let data = {
            employeeId:employeeId,
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
        document.getElementById("employee-add").innerHTML = tab;
        
    }
    async function getEmployees(e){
        e.preventDefault();
        const resp = await fetch('http://localhost:3002/employee/findEmployees',{method:"GET"});
        var data = await resp.json();
        console.log(data);
        let tab = `<tr>
                    <th scope="col"> Employee Id </th>
                    <th scope="col"> Employee Name </th>
                    <th scope="col"> Account Number </th>
                    <th scope="col"> Branch Id </th>
                    <th scope="col"> Balance </th>
                    </tr>`;
                    for( let p of data){
                        tab += `<tr>
                            <td scope="row">${p.employeeId}</td>
                            <td>${p.employeeName}</td>
                            <td>${p.accountNumber}</td>
                            <td>${p.branchId}</td>
                            <td>${p.accountHolding}</td>
                        </tr>`
                    }
                    document.getElementById("employee").innerHTML = tab;
    }
    async function getEmployee(e)
    {
        e.preventDefault();
        
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
        <div className='body'>
            <nav className="navbar navbar-expand-lg bg-light" id='navigation'>
                <div class="container-fluid">
                    <a className="navbar-brand " href="/">Paywizz</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/employee">Employee</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link " aria-current="page" href="/bank">Bank</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link " aria-current="page" href="/salary">Salary</a>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className='container'>
                <form className="AddDetails">
                    <div className='AddEmployeeContent'>
                        <h3 className='title'>Employee</h3>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="inputGroup-sizing-default">Employee Id</span>
                            <input type="text" id="empId" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" onChange={(e) =>setEmpId(e)}/>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="inputGroup-sizing-default">Employee Name</span>
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
                        <button className="btn btn-primary btn-sm" onClick={(e) => addEmployee(e)} id="addbut" >Add</button>
                        <table id="employee-add" className="table table-borderless"></table>
                    </div>
                </form>
                <div className='searchbox'>
                    <div id="get-employee" className='Auth-form-list'>
                        <div className='searchEmp'>
                            <input className="form-control mr-sm-2" id="employeeId" type="search" placeholder="Emp Id" aria-label="Search" aria-required required/>
                            <button className="btn btn-primary" id="salbut" type='submit' onClick={(e) => getEmployee(e)}>Search</button>
                            <button className="btn btn-primary" id="listal" onClick={(e) => getEmployees(e)}>List All</button>
                        </div>
                    </div>
                    <table className="table table-borderless" id="employee" ></table>
                </div>
            </div>
        </div>
        );
}