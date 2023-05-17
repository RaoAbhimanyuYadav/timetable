import * as React from "react";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LoginIcon from "@mui/icons-material/Login";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/actionThunk/authThunk";
import { useTheme } from "@mui/material";
import { CustomButton } from "../utils/customComponents";
import Copyright from "../common/Copyright";

export default function SignIn() {
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
            username: data.get("email"),
            password: data.get("password"),
        };

        dispatch(login(body.username, body.password, redirectHandler));
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
                    marginTop: "4rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{ m: 1, backgroundColor: "secondary.main" }}>
                    <LoginIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <CustomButton
                        type="submit"
                        fullWidth
                        variant="outlined"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </CustomButton>
                    <Grid container>
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
                                to={"/signup"}
                                target="_self"
                                style={{ color: theme.palette.text.secondary }}
                            >
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    );
}
