import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Button } from '@mui/joy';
import { useUser } from './UserContext';
import { Link } from 'react-router-dom';
import './HeaderCom.css'; // הוספת קובץ ה-CSS

function HeaderCom() {
  const { user } = useUser();
  const { setUser } = useUser();

  

  function logout() {
  setUser({
    name: '',
    id:null, // הנח שיש לך id מהשרת
    isLoggedIn: false,
});
    
  }

  return (
    <AppBar position="static" sx={{ backgroundColor: 'rgb(137, 113, 100)' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'center' }}>
          <img
            src="https://www.realfood.co.il/wp-content/uploads/2022/11/LOGO-180.png"
            alt="Logo"
            style={{ width: 40, height: 40, marginRight: '8px' }}
          />
          <Typography variant="h6" noWrap component="a" href="#app-bar-with-responsive-menu" sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem' }}>
          </Typography>
          {user.isLoggedIn && <Typography>hi {user.name}!!</Typography>}
          <Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
            {user.isLoggedIn ? (
              <>
                <Button className="header-button" component={Link} to="/home" onClick={logout}>home</Button>
                <Button className="header-button" component={Link} to="/recipes">to our recipes</Button>
                <Button className="header-button" component={Link} to="/addrecipe">add recipe</Button>
              </>
            ) : (
              <>
                <Button className="header-button" component={Link} to="/login">login</Button>
                <Button className="header-button" component={Link} to="/signin">register</Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default HeaderCom;
