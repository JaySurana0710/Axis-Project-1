import { useState } from 'react';
console.log("Loading Data from Bank API");
export default function Bank()
{
    const [branchId, setBranchId] = useState();
    const [bankName,setBankName] = useState();
    const [branchName,setBranchName] = useState();
    const [branchHolding,setBranchHolding] = useState();

    const setBankNames = (e) => {

        setBankName(e.target.value);
    };
    const setBranchNames = (e) => {
        setBranchName(e.target.value);
    };
    const setBranchIds = (e) => {
        setBranchId(e.target.value);
    };
    const setBranchHoldings = (e) => {
        setBranchHolding(e.target.value);
    };
    
    function addBank(e)
    {
        e.preventDefault();
        // var bankName = document.getElementById('bankName').value;
        // var accountNumber = document.getElementById('accountNumber').value;
        // var accountHolding = document.getElementById('balance').value;
        // var branchId = document.getElementById('branchId').value;

        let data = {
            branchId:branchId,
            bankName:bankName,
            branchName:branchName,
            branchHolding:branchHolding
        }
        console.log(data)
        fetch('http://localhost:3001/bank/add',{
        method:"POST",
        body: JSON.stringify(data),
        headers : {
            "Content-Type":"application/json",
            "Access-Control-Allow-Origin":"*"
        }
        }).then(response => response.json())
        .then(json => console.log(json));
        console.log("Bank added!");
        let tab = `<tr>
        <th> Branch Id </th>
        <th> Bank Name </th>
        <th> Branch Name </th>
        <th> Branch Holding </th>
                    </tr>`;
                        tab += `<tr>
                        <td>${data.branchId}</td>
                        <td>${data.bankName}</td>
                        <td>${data.branchName}</td>
                        <td>${data.branchHolding}</td>
                        </tr>`
                    document.getElementById("bank-add").innerHTML = tab;
    }

    async function getBanks(e){
        e.preventDefault();
        const resp = await fetch('http://localhost:3001/bank/findBranch',{method:"GET"});
        var data = await resp.json();
        console.log(data);
        let tab = `<tr>
                    <th> Branch Id </th>
                    <th> Bank Name </th>
                    <th> Branch Name </th>
                    <th> Branch Holding </th>
                    </tr>`;
                    for( let p of data){
                        tab += `<tr>
                            <td>${p.branchId}</td>
                            <td>${p.bankName}</td>
                            <td>${p.branchName}</td>
                            <td>${p.branchHolding}</td>
                        </tr>`
                    }
                    document.getElementById("bank").innerHTML = tab;
    }
    async function getBank(){
        var bankid =  document.getElementById('bankId').value;
        const resp = await fetch('http://localhost:3001/bank/findBranch/'+bankid,{method:"GET"});
        var data = await resp.json();
        console.log(data);
        let tab = `<tr>
        <th> Branch Id </th>
        <th> Bank Name </th>
        <th> Branch Name </th>
        <th> Branch Holding </th>
                    </tr>`;

                        tab += `<tr>
                        <td>${data.branchId}</td>
                        <td>${data.bankName}</td>
                        <td>${data.branchName}</td>
                        <td>${data.branchHolding}</td>
                        </tr>`

                    document.getElementById("bank").innerHTML = tab;
    }
    return (
        <div className='body'>
            <nav class="navbar navbar-expand-lg bg-light">
                <div class="container-fluid">
                    <a class="navbar-brand" href="/">Paywizz</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link " aria-current="page" href="/employee">Employee</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="/bank">Bank</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link " aria-current="page" href="/salary">Salary</a>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className='container'>
                <form className="AddDetails">
                    <div className='AddBankContent'>
                        <h3 className='title'>Bank</h3>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="inputGroup-sizing-default">Branch Id</span>
                            <input type="text" id="branchId" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" onChange={(e) => setBranchIds(e)}/>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="inputGroup-sizing-default">Bank Name</span>
                            <input type="text" id="bankName" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" onChange={(e) =>setBankNames(e)}/>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="inputGroup-sizing-default">Branch Name</span>
                            <input type="text" id="branchName" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" onChange={(e) => setBranchNames(e)}/>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="inputGroup-sizing-default">Branch Holding</span>
                            <input type="number" id="branchHolding" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" onChange={(e) => setBranchHoldings(e)} />
                        </div>
                        <button className="btn btn-primary btn-sm" onClick={(e) => addBank(e)} id="addbut" >Add</button>
                        <table id="bank-add" className="table table-borderless"></table>
                    </div>
                </form>
                <div className='searchbox'>
                    <div id="get-bank" className='Auth-form-list'>
                        <div className='searchBank'>
                            <input className="form-control mr-sm-2" id="bankId" type="search" placeholder="Bank Id" aria-label="Search" aria-required required/>
                            <button className="btn btn-primary" id="salbut" type='submit' onClick={(e) => getBank(e)}>Search</button>
                            <button className="btn btn-primary" id="listal" type='submit' onClick={(e) => getBanks(e)}>List All</button>
                        </div>
                    </div>
                    <table className="table table-borderless" id="bank" ></table>
                </div>
            </div>
        </div>
        );
}