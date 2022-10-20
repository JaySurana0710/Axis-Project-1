import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {useState} from 'react';
import {Table} from 'react-bootstrap'


function Bank() {
    const [branchId,setBranchId] = useState();
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
    console.log("Loading Data from Bank Get API");  
    function addBank(){
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
                    document.getElementById("bank-table").innerHTML = tab;
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
        <div className="Bank">
        <Navbar bg="light" variant="light">
            <Container>
                {/* Add logo to navbar <img src="D:\Axis\Internal Project\PAYWIZ\paywiz\src\image.jpg" className="d-inline-block align-top" ></img> */}
                <Navbar.Brand id="brand" href="/home">PayWiz</Navbar.Brand>
                    <Nav className="me-auto">
                    <Nav.Link id="navbut" href="/Employee">Employee</Nav.Link>
                    <Nav.Link id="navbut"  href="/bank">Bank</Nav.Link>
                    <Nav.Link id="navbut"  href="/salary">Salary</Nav.Link>
                    <Nav.Link id="navbut" className='logout'  href="/login">Logout</Nav.Link>
                </Nav>
            </Container>
        </Navbar>                        
        <div className='container'>
            <form className='AddBank'>
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
                
                <button className="btn btn-primary btn-sm" onClick={(e) => addBank(e)} id="addbut" >Add Bank</button>
                </div>
                
            </form>
            
        </div>
        
        <div className='searchbox'>
        <div id="get-bank" className='Auth-form-list'>
                <button className="btn btn-primary" id="listal" onClick={(e) => getBanks(e)}>List All</button>
                <Table id="bank-table" striped bordered hover variant="dark"></Table>
        </div>  
        

        <div className="form-inline">
            <input className="form-control mr-sm-2" id="bankId" type="search" placeholder="Bank Id" aria-label="Search"/>
            <button className="btn btn-success my-2 my-sm-0" id="salbut"  onClick={(e) => getBank(e)}>Search</button>
            <Table striped bordered hover variant="dark" id="bank"></Table>    
            </div>
            </div>
        </div>
    );
}
export default Bank;