import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import {Link, Outlet, useNavigate } from 'react-router-dom';

const drawerWidth = 240;


const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
    backgroundColor: "#85ddff",
  }),
  ...(open && {
    
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
  
 
}));

export default function Sidebar() {
let [user,setUser] = React.useState({_id:"",name:"",email:""});
let navigate=useNavigate();

  React.useEffect(()=>{
    let usertype=localStorage.getItem("usertype");
    if(usertype==null){
      navigate("/")
    }
    else if(usertype !="admin"){
      navigate("/")
    }
    setUser(JSON.parse(localStorage.getItem(user)));
  },[])

  function logout(e){
    e.preventDefault();
    localStorage.clear();
    navigate("/");
  }

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  

  return (
    <Box sx={{ display: 'flex' }}> 
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar style={{backgroundColor: "#85ddff"}}>
          <IconButton 
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" className='text-dark'>
          SALES & PRODUCTS 
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer 
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
       
      >
        <DrawerHeader style={{backgroundColor: "#85ddff"}}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>

          <ListItem disablePadding>
          <ListItemButton>
          
          <Link to="/sidebar" className='text-dark'>
          <i class="fa-solid fa-chart-line" style={{fontSize:"20px"}}></i>  Dashboard</Link>  
          </ListItemButton>
            </ListItem>

            {/* <ListItem disablePadding>
          <ListItemButton>
          <Link to="/sidebar/users" className='text-dark'>
          <i class="fa-solid fa-user" style={{fontSize:"20px"}}></i>  Users</Link>
          </ListItemButton>
            </ListItem> */}
            <ListItem disablePadding>
          <ListItemButton>
          <Link to="/sidebar/products" className='text-dark'>
          <i class="fa-brands fa-product-hunt" style={{fontSize:"20px"}}></i>  Products</Link>
          </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
          <ListItemButton>
          <Link to="/sidebar/sales" className='text-dark'>
          <i class="fa-solid fa-dollar-sign" style={{fontSize:"20px"}}></i>  Sales</Link>
          </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
          <ListItemButton>
          <Link to="/sidebar/saledetails" className='text-dark'>
          <i class="fa-solid fa-circle-info" style={{fontSize:"20px"}}></i>  Saledetails</Link>  
          </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
          <ListItemButton>
          <Link className='text-dark' onClick={((e)=>logout(e))}>
          <i class="fa-solid fa-right-from-bracket" style={{fontSize:"20px"}}></i> Logout</Link>
        
          </ListItemButton>
            </ListItem>
          
        </List>
        <Divider />
        <List>
          {/* {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))} */}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
       
<Outlet/>
      </Main>
    </Box>
  );
}