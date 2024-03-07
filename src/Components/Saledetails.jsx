import React, { useEffect, useState,useRef } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link, useNavigate, useNavigation } from 'react-router-dom';
import { Breadcrumbs, Button } from '@mui/material';
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 17,
    },
  }));
  

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export default function Saledetails() {
    const [getdata, setgetData] = React.useState([]);

    let[saledetails,setSaleDetails]=useState([]);
    const componentPDF=useRef();

let navigate=useNavigate();


    useEffect(()=>{
   
    
        onload();
      },[])
      
      
      
      //getting product data
      function onload(){
     
      
      
        axios.get("http://127.0.0.1:8081/sales/")
        
            .then((resp)=>{
              console.log(resp.data.data);
          
              setSaleDetails(resp.data.data);
      
            })
            .catch((error)=>{
              console.log(error);
      
            });
      
       
          }

let generatePDF=useReactToPrint({
  content:()=>componentPDF.current,
  documentTitle:"userData",
  onAfterPrint:()=>alert("data is save in PDF")
})

function getloadData(){
    axios.get("http://127.0.0.1:8081/sales")
    .then((res)=>{
     console.log(res.data.data);
     setgetData(res.data.data)
 
    })
   }
   React.useEffect(()=>{
     getloadData();
   }, []);

function handleDelete(e,id){
    e.preventDefault();
    axios.delete("http://127.0.0.1:8081/sales/"+id)
    .then((res)=> {
      console.log(res.data.data);
      getloadData()
    })
    console.log(id);
   }

function handlePrint(_id){
   navigate(`/invoice/${_id}`);
   
}


  return (
    <>

      {/* //breadcrumb */}
<div role="presentation" >
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Dashboard
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href="/material-ui/getting-started/installation/"
        >
          SalesDetails
        </Link>
  
      </Breadcrumbs>
       
     
    </div>
    {/* end breadcrumb */}


    {/* table start */}
    
    <TableContainer component={Paper}>
    <div ref={componentPDF} style={{width:"100%"}}>
      <Table sx={{ minWidth: 700, mt:9 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Sr.No.</StyledTableCell>
            <StyledTableCell align="right">Date</StyledTableCell>
            <StyledTableCell align="right">Name</StyledTableCell>
            <StyledTableCell align="right">Mobile no</StyledTableCell>
         
            <StyledTableCell align="right">GrandTotal</StyledTableCell>
            <StyledTableCell align="right">Actions</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {saledetails.map((item,i) => (
            <StyledTableRow key={i}>
              <StyledTableCell component="th" scope="row">
                {i+1}
              </StyledTableCell>
              <StyledTableCell align="right">{new Date(item.cdate).toLocaleDateString()}</StyledTableCell>
              <StyledTableCell align="right">{item.cname}</StyledTableCell>
              <StyledTableCell align="right">{item.cmobileno}</StyledTableCell>
          
              <StyledTableCell align="right">{item.grandTotal}</StyledTableCell>
              <StyledTableCell align="right">
           <button className='btn btn-danger me-3' onClick={((e)=>handleDelete(e,item._id))} style={{fontSize:"18px",marginLeft:"5rem"}} ><i class="fa-solid fa-trash"></i></button>
              <button className='btn btn-primary me-3' onClick={((e)=>handlePrint(item._id))} ><i class="fa-solid fa-print" style={{fontSize:"18px"}}></i></button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      </div>

    </TableContainer>
    {/* <Button onClick={generatePDF}>Print</Button> */}
 
    </>
  )
}