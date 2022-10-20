import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {useState} from 'react';
import {Table} from 'react-bootstrap'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

console.log("Loading Data from Salary Get API");    



function Salary() {
    const [salaryId,setSalaryId] = useState();
    const [salaryStatus,setSalaryStatus] = useState();
    const [branchId,setBranchId] = useState();
    const [employeeId,setEmployeeId] = useState();
    const [ctc,setCtc] = useState();
    
    const setSalaryIds = (e) => {
        
        setSalaryId(e.target.value);
    };
    const setSalaryStatuss = (e) => {
        
        setSalaryStatus(e.target.value);
    };
    const setBranchIds = (e) => {
        
        setBranchId(e.target.value);
    };
    const setEmployeeIds = (e) => {
        
        setEmployeeId(e.target.value);
    };
    const setCtcs = (e) => {
        
        setCtc(e.target.value);
    };

    function addSalary(){
        // var employeeName = document.getElementById('employeeName').value;
        // var accountNumber = document.getElementById('accountNumber').value;
        // var accountHolding = document.getElementById('balance').value;
        // var branchId = document.getElementById('branchId').value;
    
        let data = {
            salaryId:salaryId,
            salaryStatus:salaryStatus,
            branchId:branchId,
            employeeId:employeeId,
            ctc:ctc
        }
        console.log(data)
        fetch('http://localhost:3003/salary/save',{
        method:"POST",
        body: JSON.stringify(data),
        headers : {
            "Content-Type":"application/json",
            "Access-Control-Allow-Origin":"*"
        }
        }).then(response => response.json())
        .then(json => console.log(json));
        console.log("Salary added!");
    }
    
    
    async function getSalarys(e){
        e.preventDefault();
        const resp = await fetch('http://localhost:3003/salary/getallsalary',{method:"GET"});
        var data = await resp.json();
        console.log(data);
        let tab = `<tr> 
                    <th> Salary Id </th>
                    <th> Salary Amount </th>
                    <th> Salary Status </th>
                    <th> Branch Id </th>
                    <th> Employee Id </th>
                    <th> CTC </th>
                    </tr>`;
                    for( let p of data){
                        tab += `<tr> 
                            <td>${p.salaryId}</td>
                            <td>${p.salaryAmount}</td>
                            <td>${p.salaryStatus}</td>
                            <td>${p.branchId}</td>
                            <td>${p.employeeId}</td> 
                            <td>${p.ctc}</td>                     
                        </tr>`
                    }
                    document.getElementById("salary-table").innerHTML = tab;
    }
    async function getSalary(){
        var salid =  document.getElementById('salId').value;
        console.log('salary '+salid);
        const resp = await fetch('http://localhost:3003/salary/getsalaryby/'+salid,{method:"GET"});
        var data = await resp.json();
        console.log(data);
        let tab = `<tr> 
        <th> Salary Id </th>
        <th> Salary Amount </th>
        <th> Salary Status </th>
        <th> Branch Id </th>
        <th> Employee Id </th>
        <th> CTC </th>
                    </tr>`;
                    
                        tab += `<tr> 
                        <td>${data.salaryId}</td>
                        <td>${data.salaryAmount}</td>
                        <td>${data.salaryStatus}</td>
                        <td>${data.branchId}</td>
                        <td>${data.employeeId}</td> 
                        <td>${data.ctc}</td>                              
                        </tr>`
                    
                    document.getElementById("salary").innerHTML = tab;
    }

    async function paySalary(){
        var salid =  document.getElementById('salId').value;
        console.log('salary '+salid);
        const resp = await fetch('http://localhost:3003/salary/pay/'+salid,{method:"PUT"});
        var data = await resp.json();
        console.log(data);
        let tab = `<tr> 
        <th> Salary Id </th>
        <th> Salary Amount </th>
        <th> Salary Status </th>
        <th> Branch Id </th>
        <th> Employee Id </th>
        <th> CTC </th>
                    </tr>`;
                    
                        tab += `<tr> 
                        <td>${data.salaryId}</td>
                        <td>${data.salaryAmount}</td>
                        <td>${data.salaryStatus}</td>
                        <td>${data.branchId}</td>
                        <td>${data.employeeId}</td> 
                        <td>${data.ctc}</td>                              
                        </tr>`
                    
                    document.getElementById("salary").innerHTML = tab;
                }
    
    
    return (
        <div className="Salary">
        <Navbar bg="light" variant="light">
            <Container>
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
            <form className='AddSalary'>
                <div className='AddSalaryContent'>
                    <h3 className='title'>Salary</h3>
                    <div className="input-group mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-default">Salary Id</span>
                    <input type="text" id="salaryId" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" onChange={(e) => setSalaryIds(e)}/>
                    </div>
                    <div className="input-group mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-default">Branch Id</span>
                    <input type="text" id="branchId" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" onChange={(e) => setBranchIds(e)}/>
                    </div>
                    <div className="input-group mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-default">Employee Id</span>
                    <input type="text" id="employeeId" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" onChange={(e) => setEmployeeIds(e)} />
                    </div>
                    <div className="input-group mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-default">CTC</span>
                    <input type="text" id="ctc" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" onChange={(e) => setCtcs(e)} />
                    </div>
                    <div className="input-group mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-default">Status</span>
                    <DropdownButton id="Status" className="form-control" onSelect={(e) => setSalaryStatuss(e)} title="Status">
                    <Dropdown.Item eventKey='1' value="Paid">Paid</Dropdown.Item>
                    <Dropdown.Item eventKey='2' value = "Pending">Pending</Dropdown.Item>
                    </DropdownButton>
                    </div>
                
                <button className="btn btn-primary btn-sm" onClick={(e) => addSalary(e)} id="addbut" >Add Salary</button>
                </div>
                
            </form>
            
        </div>

        <div className='searchbox'>
        <div id="get-salary" className='Auth-form-list'>
                <button className="btn btn-primary" id="listal" onClick={(e) => getSalarys(e)}>List All</button>
                <Table id="salary-table" striped bordered hover variant="dark"></Table>        
        </div>

        <div className="form-inline">
            <input className="form-control mr-sm-2" id="salId" type="search"  placeholder="Salary Id" aria-label="Search"/>
            <button className="btn btn-success my-2 my-sm-0" id="salbut" onClick={(e) => getSalary(e)}>Search</button>
            <button className="btn btn-success my-2 my-sm-0" id="salbut"  onClick={(e) => paySalary(e)}>Pay</button>
            <Table id="salary" striped bordered hover variant="dark"></Table>
        </div>
        </div>
        </div>
    );
}
export default Salary;