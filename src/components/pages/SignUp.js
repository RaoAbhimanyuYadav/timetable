import * as React from "react";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signup } from "../redux/actionThunk/authThunk";
import { CustomButton } from "../utils/customComponents";
import Copyright from "../common/Copyright";
import { useTheme } from "@mui/material";

export default function SignUp() {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const theme = useTheme();

    const from = location.state?.from?.pathname || "/";

    const redirectHandler = () => {
        navigate(from, { replace: true });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        const body = {
            email: data.get("email"),
            password: data.get("password"),
        };

        dispatch(signup(body.email, body.password, redirectHandler));
    };

    return (
        <Container
            component="main"
            maxWidth="xs"
            sx={{
                border: "2px solid grey",
                boxShadow: "3px 3px 8px 2px grey",
                borderRadius: "10px",
            }}
        >
            <Box
                sx={{
                    marginTop: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{ mt: 3 }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                            />
                        </Grid>
                    </Grid>
                    <CustomButton
                        type="submit"
                        fullWidth
                        variant="outlined"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </CustomButton>
                    <Grid container justifyContent="flex-end">
                        <Grid
                            item
                            sx={{
                                "& > a": {
                                    textDecoration: "none",
                                    color: "blue",
                                },
                            }}
                        >
                            <Link
                                to="/login"
                                style={{ color: theme.palette.text.secondary }}
                            >
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    );
}
