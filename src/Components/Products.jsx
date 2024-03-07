import * as React from 'react';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import { Breadcrumbs, Container } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import GrainIcon from '@mui/icons-material/Grain';
var getHeaders = require ("../common.js").getHeaders

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
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
  
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    height:450,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

 
export default function Products() {
  const [getdata, setgetData] = React.useState([]);
  const[id, setId] = React.useState();
   const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [file ,setFile] = React.useState()
    let [data, setData] = React.useState({
      name: "",
      mrp: 0,
      price: 0,
      gstpercent: 0,
      imagepath: ""
    });
    // let navigate =useNavigate();
    // const {id}=useParams();
    // console.log(id);

    function handelData(e) {
      setData({ ...data, [e.target.id]: e.target.value });
      console.log(setData);
    }
    function handelSubmit() {
      let formData = new FormData();
    formData.append('name', data.name);
    formData.append('mrp', data.mrp);
    formData.append('price', data.price);
    formData.append('gstpercent', data.gstpercent);
         formData.append('image', file);


      if(id===undefined){
        data ={
          name :data.name,
          price: data.price,
          mrp:data.mrp,
          gstpercent:data.gstpercent,
          imagepath:file
        }
      
      console.log("postdata",data);
        axios.post("http://127.0.0.1:8081/products",formData,getHeaders())
        .then((res) => {
            
          console.log("after data",res.data);
          getloadData()
        })
          
       
      }
  
      else{
        axios.put("http://127.0.0.1:8081/products/"+id,data)
        .then((res) => {
          console.log(res.data);
          getloadData()
        });
        setData({
          name:"",
          price:0,
          mrp:0,
          gstpercent:0,
          imagepath:""
        })
     
      }
    }
  

    function getloadData(){
      axios.get("http://127.0.0.1:8081/products")
      .then((res)=>{
       console.log(res.data.data);
       setgetData(res.data.data)
   
      })
     }
     React.useEffect(()=>{
       getloadData();
     }, []);
   
     function handleUpdate(e,id){
      setId(id)
      e.preventDefault();
      handleOpen();
      axios.get("http://127.0.0.1:8081/products/"+ id)
      .then((res) => {
        console.log(res.data);
        getloadData()
  
        setData({
          name :res.data.data.name,
         mrp:res.data.data.mrp,
           price: res.data.data.price,
          gstpercent:res.data.data.gstpercent,
          imagepath:res.data.data.imagepath
        })
      }).catch((err)=>{
        console.log(err);
       
      })
      // setnewData(newdata);
      // getloadData()
     };
  console.log(data.name);
  
  
     function handleDelete(e,id){
      e.preventDefault();
      axios.delete("http://127.0.0.1:8081/products/"+id)
      .then((res)=> {
        console.log(res.data.data);
        getloadData()
      })
      console.log(id);
     }


return (
<>
<div role="presentation" onClick={handleClick} >
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="inherit"
          href="/"
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="large" />
          products
        </Link>
    
      </Breadcrumbs>
    </div>

<Container>
    <Button onClick={handleOpen} className='text-dark' style={{marginLeft:"auto", display:"block",backgroundColor: "#85ddff"}}><i class="fa-solid fa-plus"></i></Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, width: 500 }}>
        <TextField onChange={handelData}
          required
          id="name"
          label="Name"
          type="text"
          size='medium'
          value={data.name}
          sx={{ width: '100%' }} 
          variant="standard"
        />
        <TextField onChange={handelData}
          
          id="mrp"
          label="MRP"
          type="number"
          value={data.mrp}
          sx={{ width: '100%' }} 
          variant="standard"
        />
        <TextField onChange={handelData}
          id="price"
          label="Price"
          type="number"
          value={data.price}
          autoComplete="current-password"
          variant="standard"
          sx={{ width: '100%' }} 
        />
        <TextField onChange={handelData}
          id="gstpercent"
          label="GST%"
          type="number"
          value={data.gstpercent}
          variant="standard"
          sx={{ width: '100%' }} 
        />
        {/* <TextField onChange={e=>setFile(e.target.files[0])}
          id="imagepath"
          label="Image"
          type="file"
          variant="standard"
          sx={{ width: '100%' }} 
        /> */}
         <TextField
              margin="normal"
              // required
              fullWidth
              name="image"
              label="Image"
              type="file"
              id="image"
              // autoComplete="image"
              // onChange={handleSubmit}
              onChange={e => setFile(e.target.files[0])} 

            />

        <button className='btn bg-primary text-light mt-3' onClick={handelSubmit}>Submit</button>
        </Box>
      </Modal>
      
      </Container>

<Breadcrumbs/>
<Container>
      <TableContainer component={Paper} className='mt-3'>
      <Table sm={{ minWidth: 500 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Sr.No.</StyledTableCell>
            <StyledTableCell align="right">Product Name</StyledTableCell>
            <StyledTableCell align="right">MRP</StyledTableCell>
            <StyledTableCell align="right">Price</StyledTableCell>
            <StyledTableCell align="right">GST %</StyledTableCell>
            <StyledTableCell align="right">Image</StyledTableCell>
            <StyledTableCell align="right">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
        getdata.map((eachdata,i) => {
            return( 
           
            <StyledTableRow key={i}>
              <StyledTableCell component="th" scope="row">
                {i+1}
              </StyledTableCell>
              <StyledTableCell align="right">{eachdata.name}</StyledTableCell>
              <StyledTableCell align="right">{eachdata.mrp}</StyledTableCell>
              <StyledTableCell align="right">{eachdata.price}</StyledTableCell>
              <StyledTableCell align="right">{eachdata.gstpercent}</StyledTableCell>
              <StyledTableCell align="right">
                         <img 
    src={"http://localhost:8081/" + eachdata.imagepath} 
    alt={eachdata.name} 
    style={{ width: '100px', height: '100px' }} 
  />
              </StyledTableCell>
              <StyledTableCell align="right">
              <button className='btn btn-success me-3'onClick={((e)=>handleUpdate(e,eachdata._id))} style={{fontSize:"18px",marginLeft:"5rem"}}><i class="fa-solid fa-pen-to-square"></i></button>

              <button className='btn btn-danger me-3'onClick={((e)=>handleDelete(e,eachdata._id))} style={{fontSize:"18px",marginLeft:"1rem"}} ><i class="fa-solid fa-trash"></i></button>
              </StyledTableCell>
            </StyledTableRow>
          )}
          )}
        </TableBody>
      </Table>
    </TableContainer>
    </Container> 
    </>
  );
}