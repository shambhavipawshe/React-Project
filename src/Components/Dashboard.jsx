import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import axios from 'axios';
import Barchart from './Barchart';

export default function Dashboard() {

  // length of all componant on Dashboard
  let [totalproduct, setTotalproduct] = React.useState(0)
  let [totalusers, setTotalusers] = React.useState(0)
  let [totalsales, setTotalsales] = React.useState(0)
  let [totalsaledetails, setTotalsaledetails] = React.useState(0)

React.useEffect(()=>{
  loadData()
},[]);


 function loadData(){
  axios.get("http://127.0.0.1:8081/users/")
  .then((res)=>{
    console.log(res.data.data.length);
    setTotalusers(res.data.data.length);
  }).catch((err)=>{
    console.log(err);
  })

  axios.get("http://127.0.0.1:8081/products/")
  .then((res)=>{
    console.log(res.data.data.length);
    setTotalproduct(res.data.data.length);
  }).catch((err)=>{
    console.log(err);
  })

  axios.get("http://127.0.0.1:8081/sales/")
  .then((res)=>{
    console.log(res.data.data.length);
    setTotalsales(res.data.data.length);
  }).catch((err)=>{
    console.log(err);
  })

 }

  return (
    <div className="container" >
      <div className="row"  style={{display:"flex"}}>
        <div className="col-lg-4" >
    <Card sx={{ maxWidth: 500 }} style={{ textAlign:"center",backgroundColor: "#85ddff"}}>
      <CardActionArea>
        <CardContent>
        <i class="fa-solid fa-user" style={{fontSize:"45px"}}></i>
          <Typography gutterBottom variant="h5" component="div">
            <h1 style={{textAlign:"center"}}>{totalusers}</h1>
            <h2 style={{textAlign:"center"}}>Users</h2>
          </Typography>
          {/* <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography> */}
        </CardContent>
      </CardActionArea>
    </Card>
    </div>

    <div className="col-lg-4">
    <Card sx={{ maxWidth: 500 }} style={{ textAlign:"center",backgroundColor: "#85ddff"}}>
      <CardActionArea>
        {/* <CardMedia
          component="img"
          height="180"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        /> */}
        <CardContent>
        <i class="fa-brands fa-product-hunt" style={{fontSize:"45px"}}></i>
          <Typography gutterBottom variant="h5" component="div">
            <h1 style={{textAlign:"center"}}>{totalproduct}</h1>
            <h2 style={{textAlign:"center"}}>Products</h2>
          </Typography>
          {/* <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography> */}
        </CardContent>
      </CardActionArea>
    </Card>
    </div>

   <div className="col-lg-4" >
    <Card sx={{ maxWidth: 500 }} style={{ textAlign:"center", backgroundColor: "#85ddff"}}>
      <CardActionArea>
        {/* <CardMedia
          component="img"
          height="180"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        /> */}
        <CardContent>
        <i class="fa-solid fa-dollar-sign" style={{fontSize:"45px"}}></i>
          <Typography gutterBottom variant="h5" component="div">
          <h1 style={{textAlign:"center"}}>{totalsales}</h1>
            <h2 style={{textAlign:"center"}}>Sales</h2>
          </Typography>
          {/* <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography> */}
        </CardContent>
      </CardActionArea>
    </Card>
    </div>
   <Barchart/>
    <div className="col-lg-3">
    <Card sx={{ maxWidth: 445 }} style={{marginLeft:"5rem", marginTop:"3rem"}}>
      <CardActionArea>
        {/* <CardMedia
          component="img"
          height="180"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        /> */}
        {/* <CardContent> */}
          {/* <Typography gutterBottom variant="h5" component="div"> */}
          {/* <h1>{totalsaledetails}</h1>
            <h1>Sale Details</h1> */}
          {/* </Typography> */}
          {/* <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography> */}
        {/* </CardContent> */}
      </CardActionArea>
    </Card>
    </div>

    </div>

    </div>
    


  );
}