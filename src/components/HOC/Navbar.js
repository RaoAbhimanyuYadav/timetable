import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

import NITHLogo from "../../assests/nith-logo.png";

import {
    verifiedPages,
    verifiedSettings,
    unverifiedSettings,
} from "../constants/navbarConstants";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actionThunk/authThunk";

const NAVLINK_STYLE = {
    textDecoration: "none",
    color: "#fff",
    fontFamily: "monospace",
    fontWeight: 700,
    letterSpacing: ".05rem",
    fontSize: "16px",
    padding: "10px",
    boxShadow: "20px 20px 50px 10px #164b9f inset",
    borderRadius: "10px",
    margin: "auto 15px",
};

function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const accessToken = useSelector((state) => state.auth.accessToken);

    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: {
                                    md: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                },
                            }}
                        >
                            <NavLink
                                to="/"
                                style={{
                                    textDecoration: "none",
                                    color: "#fff",
                                    fontFamily: "monospace",
                                    fontWeight: 700,
                                    letterSpacing: ".05rem",
                                    fontSize: "24px",
                                }}
                            >
                                TimeTable Generator
                            </NavLink>
                            <Box
                                sx={{
                                    display: { xs: "none", md: "flex" },
                                    flexGrow: 1,
                                    justifyContent: "center",
                                }}
                            >
                                {verifiedPages.map((page) => (
                                    <NavLink
                                        to={page.href}
                                        key={page.href}
                                        style={({ isActive }) =>
                                            isActive
                                                ? {
                                                      ...NAVLINK_STYLE,
                                                      color: "#1b2184",
                                                      boxShadow:
                                                          "rgb(176, 207, 255) 20px 20px 50px 10px inset",
                                                  }
                                                : NAVLINK_STYLE
                                        }
                                    >
                                        {page.name}
                                    </NavLink>
                                ))}
                            </Box>
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton
                                    onClick={handleOpenUserMenu}
                                    sx={{ p: 0 }}
                                >
                                    <Avatar alt="NITH Logo" src={NITHLogo} />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: "45px" }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {(accessToken
                                    ? verifiedSettings
                                    : unverifiedSettings
                                ).map((setting) => (
                                    <MenuItem
                                        sx={{ minHeight: "auto" }}
                                        key={setting.name}
                                        onClick={() => {
                                            handleCloseUserMenu();
                                            setting.href === "logout"
                                                ? dispatch(logout())
                                                : navigate(`/${setting.href}`);
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                textAlign: "center",
                                                textDecoration: "none",
                                                color: "#000",
                                                fontFamily: "monospace",
                                                fontSize: {
                                                    xs: "12px",
                                                    md: "16px",
                                                },
                                            }}
                                        >
                                            {setting.name}
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <main>
                <Outlet />
            </main>
        </>
    );
}
export default Navbar;
