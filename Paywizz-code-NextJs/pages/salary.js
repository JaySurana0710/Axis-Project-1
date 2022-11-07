import { useState } from "react"
console.log("Loading Data from Salary API");
export default function Salary(){
    const [salaryId,setSalaryId] = useState();
    const [salaryStatus,setSalaryStatus] = useState("Pending");
    const [branchId,setBranchId] = useState();
    const [employeeId,setEmployeeId] = useState();
    const [ctc, setCtc] = useState();
    
    const setSalaryIds = (e) => {

        setSalaryId(e.target.value);
    };
    const setSalaryStatuss = (e) => {

        setSalaryStatus("Pending");
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

    function addSalary(e)
    {
        e.preventDefault();
        // var employeeName = document.getElementById('employeeName').value;
        // var accountNumber = document.getElementById('accountNumber').value;
        // var accountHolding = document.getElementById('balance').value;
        // var branchId = document.getElementById('branchId').value;
        setSalaryStatuss();
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
        let tab = `<tr>
                    <th> Salary Id </th>
                    <th> Salary Status </th>
                    <th> Branch Id </th>
                    <th> Employee Id </th>
                    <th> CTC </th>
                    </tr>`;

                        tab += `<tr>
                            <td>${salaryId}</td>
                            <td>${salaryStatus}</td>
                            <td>${branchId}</td>
                            <td>${employeeId}</td>
                            <td>${ctc}</td>
                        </tr>`

                    document.getElementById("salary-add").innerHTML = tab;
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
                    document.getElementById("salary").innerHTML = tab;
    }
    async function getSalary(e)
    {
        e.preventDefault();
        var salid =  document.getElementById('salaryId').value;
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

    async function paySalary(e)
    {
        e.preventDefault();
        var salid =  document.getElementById('salaryId').value;
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
        <div className="body">
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Paywizz</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link" aria-current="page" href="/employee">Employee</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link " aria-current="page" href="/bank">Bank</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active " aria-current="page" href="/salary">Salary</a>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className='container'>
                <form className='AddDetails'>
                    <div className='AddSalaryContent'>
                        <h3 className='title'>Salary</h3>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="inputGroup-sizing-default">Salary Id</span>
                            <input type="text" id="salaryId1" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" onChange={(e) => setSalaryIds(e)}/>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="inputGroup-sizing-default">Branch Id</span>
                            <input type="text" id="branchId" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" onChange={(e) => setBranchIds(e)}/>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="inputGroup-sizing-default">Employee Id</span>
                            <input type="text" id="employeeId1" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" onChange={(e) => setEmployeeIds(e)} />
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="inputGroup-sizing-default">CTC</span>
                            <input type="text" id="ctc" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" onChange={(e) => setCtcs(e)} />
                        </div>
                        <div className='addbutton'>
                            <button className="btn btn-primary btn-sm" onClick={(e) => addSalary(e)} id="addbut" >Add</button>
                            <table id="salary-add" className="table table-borderless"></table>
                        </div>
                    </div>
                </form>
                <div className='searchbox'>
                    <div id="get-salary" className='Auth-form-list'>
                        <div className='searchSalary'>
                            <input className="form-control mr-sm-2" id="salaryId" type="search" placeholder="Salary Id" aria-label="Search" aria-required/>
                            <button className="btn btn-primary" id="salbut" type='submit' onClick={(e) => getSalary(e)}>Search</button>
                            <button className="btn btn-primary" id="listal" onClick={(e) => getSalarys(e)}>List All</button>
                            <button className="btn btn-primary" id="paybut"  onClick={(e) => paySalary(e)}>Pay</button>
                        </div>
                    </div>
                    <table className="table table-borderless" id="salary" ></table>
                </div>
            </div>
        </div>
    );
}