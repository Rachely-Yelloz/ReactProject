import React, { useContext, useState } from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import { useUser } from './UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useUser();

  const handleLogin = async () => {

    const url = ' http://localhost:8080/api/user/login'; // שנה לכתובת ה-API שלך
        const requestData = {
            UserName: email,
            Password: password,
          
        };

        try {
            const response = await axios.post(url, requestData);
            console.log('User signed up successfully:', response.data);
         //  debugger;
            setUser({
                name: response.data.Name,
                id: response.data.Id, // הנח שיש לך id מהשרת
                isLoggedIn: true,
            });
            
            navigate('/home');
            // כאן תוכל להוסיף קוד נוסף לאחר ההצלחה, כמו ריענון הטופס או מעבר לדף אחר
        } catch (error:any) {
            if (error.response) {
                // הבקשה בוצעה אך השרת החזיר תשובה עם סטטוס שגיאה
                console.error('Error:', error.response.data);
            } else {
                // שגיאה אחרת (למשל בעיה ברשת)
                console.error('Error:', error.message);
            }
        }

  };

  return (
    <CssVarsProvider>
      <Sheet
        sx={{
          width: 300,
          mx: 'auto', // margin left & right
          my: 4, // margin top & bottom
          py: 3, // padding top & bottom
          px: 2, // padding left & right
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          borderRadius: 'sm',
          boxShadow: 'md',
        }}
        variant="outlined"
      >
        <Typography level="h4" component="h1">
          Welcome!
        </Typography>
        <Typography level="body-sm">Sign in to continue.</Typography>

        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            name="email"
            type="email"
            placeholder="example@gmail.com"
            onChange={(e) => setEmail(e.target.value)}

          />
        </FormControl>

        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            name="password"
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}

          />
        </FormControl>

        <Button sx={{ mt: 1 /* margin top */ }} onClick={handleLogin}>
          Log in
        </Button>

        <Typography
          endDecorator={<Link href="/signin">Sign up</Link>}
          fontSize="sm"
          sx={{ alignSelf: 'center' }}
        >
          Don't have an account?
        </Typography>
      </Sheet>
    </CssVarsProvider>
  );
}
