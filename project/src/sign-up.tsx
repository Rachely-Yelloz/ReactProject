import React from 'react';
import { useForm } from 'react-hook-form';
import { CssVarsProvider } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Alert from '@mui/joy/Alert';
import axios from 'axios';
import { useUser } from './UserContext';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { setUser } = useUser();

    const onSubmit = async (data: any) => {
        const url = 'http://localhost:8080/api/user/sighin'; // שנה לכתובת ה-API שלך
        const requestData = {
            UserName: data.Username,
            Password: data.Password,
            Name: data.Name,
            Phone: data.MobileNumber,
            Email: data.Email,
            Tz: data.Tz
        };

        try {
            const response = await axios.post(url, requestData);
            console.log('User signed up successfully:', response.data);
            setUser({
                name: data.Name,
                id: response.data.id, // הנח שיש לך id מהשרת
                isLoggedIn: true,
            });

            navigate('/home');
            // כאן תוכל להוסיף קוד נוסף לאחר ההצלחה, כמו ריענון הטופס או מעבר לדף אחר
        } catch (error: any) {
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
                    mx: 'auto',
                    my: 4,
                    py: 3,
                    px: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    borderRadius: 'sm',
                    boxShadow: 'md',
                }}
                variant="outlined"
            >
                <Typography level="h4" component="h1">
                    Sign Up
                </Typography>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl>
                        <FormLabel>Username</FormLabel>
                        <Input
                            {...register("Username", { required: true })}
                            placeholder="Enter your username"
                            error={!!errors.Username}
                        />
                        {errors.Username && <Alert component="div">Username is required.</Alert>}
                    </FormControl>

                    <FormControl>
                        <FormLabel>Password</FormLabel>
                        <Input
                            {...register("Password", { required: true, minLength: 5 })}
                            type="password"
                            placeholder="Enter your password"
                            error={!!errors.Password}
                        />
                        {errors.Password && <Alert component="div">Password must be at least 5 characters.</Alert>}
                    </FormControl>

                    <FormControl>
                        <FormLabel>Name</FormLabel>
                        <Input
                            {...register("Name", { required: true })}
                            placeholder="Enter your name"
                            error={!!errors.Name}
                        />
                        {errors.Name && <Alert component="div">Name is required.</Alert>}
                    </FormControl>

                    <FormControl>
                        <FormLabel>Mobile Number</FormLabel>
                        <Input
                            {...register("MobileNumber", { required: true, minLength: 6, maxLength: 12 })}
                            placeholder="Enter your mobile number"
                            error={!!errors.MobileNumber}
                        />
                        {errors.MobileNumber && <Alert component="div">Mobile number is required and must be between 6 and 12 characters.</Alert>}
                    </FormControl>

                    <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input
                            {...register("Email", { required: true, pattern: /^\S+@\S+$/i })}
                            placeholder="example@gmail.com"
                            error={!!errors.Email}
                        />
                        {errors.Email && <Alert component="div">Valid email is required.</Alert>}
                    </FormControl>

                    <FormControl>
                        <FormLabel>Tz</FormLabel>
                        <Input
                            {...register("Tz", { required: true, maxLength: 9, minLength: 9 })}
                            placeholder="Enter your Tz"
                            error={!!errors.Tz}
                        />
                        {errors.Tz && <Alert component="div">Tz must be exactly 9 characters.</Alert>}
                    </FormControl>

                    <Button type="submit" sx={{ mt: 2 }}>
                        Sign Up
                    </Button>
                </form>
            </Sheet>
        </CssVarsProvider>
    );
}
