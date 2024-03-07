import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Paper,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Button,
  TextField,
} from "@mui/material";
import axios from "axios";

import { useReactToPrint } from "react-to-print";
import { useParams } from "react-router-dom";

// Import the CSS file

const Invoice = () => {
  let { id } = useParams();
  console.log(id);

  const [bill, setBill] = useState({
    data:{
      cname:"",
      cmobileno:"",
      sdate:"",
    },
    products:[
      
    ]
  });
  // const [print, setPrint] = useState([])

useEffect(()=>{
  axios.get("http://127.0.0.1:8081/sales/" +id)
  .then((res)=>{
    console.log(res.data);
    setBill(res.data.data);
  })
  .catch((err)=>{
    console.log(err);
  });
},[id])

  console.log(bill,"invoice");

  // const getTotal = () => {
  //   return bill.reduce((total, item) => total + item.quantity * item.Price, 0);
  // };

  // crete variable for storing customer name and currentdate
  
  let customerName = localStorage.getItem("name");
  let currentDate = new Date().toJSON().slice(0, 10);

  const componentPDF = useRef();

  const generatePdf = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "bill",
    onafterprint: () => alert("Data saved in pdf"),
  });

  return (
    // <Container style={{padding:"15px"}}>
      <div className='container m-auto p-4 d-block'>
      <Paper elevation={5} className="bill-container" style={{marginLeft:"5rem", marginRight:"5rem", marginTop:"4rem", fontSize:"35px",justifyContent:"center"}}>
        <h2 className='text-center text-decoration-underline mt-2' style={{textAlign:"center"}}>Invoice Form </h2>
        <div ref={componentPDF} style={{ width: "100%" }}>
          <Typography>
            <Box style={{fontSize:"22px", marginLeft:"7px"}}>
              <b className="text-decoration-underline fs-5 ms-3 mt-3">Customer Name:{bill.cname} </b>
               <br />
              
              <b className="text-decoration-underline fs-5 ms-3">Date:{currentDate}</b>
             <br />
              <b className="text-decoration-underline fs-5 ms-3 mt-3">Mobile No:{bill.cmobileno} </b>
               <br />
               <br/>
            </Box>
          </Typography>

          <TableContainer className='mt-2' component={Paper} style={{backgroundColor:"", border:"5px black"}}>
            <Table>
              <TableHead style={{backgroundColor:"#b1eafb",}}>
                <TableRow style={{fontSize:"25px"}}>
                <TableCell>Sr.No.</TableCell>
                  <TableCell>Product Id</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Total</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
   {bill.products.map((item,index)=>(
    <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.productid}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.price}</TableCell>
                    <TableCell>{item.subtotal}</TableCell>
                    
                  </TableRow>
   ))}

   {/* <TextField value={bill.grandtotal} /> */}
   
              </TableBody>
            </Table>
          </TableContainer>

          <div className="total pb-4 m-4" style={{marginTop:"3rem",}}>
   <strong>Total:</strong>
   <TextField id="outlined-basic" variant="outlined" value={bill.grandTotal}/>

   <Button className="m-2 text-dark" variant="contained" onClick={generatePdf} style={{fontSize:"18px", float:"right",backgroundColor: "#85ddff"}}>
          Print
        </Button>
   </div>
          {/* <Typography
            variant="h6"
            style={{ marginTop: "20px" }}
            className="d-flex justify-content-between ms-3">
            
          </Typography> */}
        </div>
       
      </Paper>
      </div>
    // </Container>
  );
};

export default Invoice;