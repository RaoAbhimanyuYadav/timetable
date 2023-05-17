import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
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
import Notification from "../common/Notification";
import { FormControlLabel, Switch, useTheme } from "@mui/material";
import { toggleThemeReducer } from "../redux/reducers/profileReducer";

function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const theme = useTheme();

    const NAVLINK_STYLE = {
        textDecoration: "none",
        color: theme.palette.text.secondary,
        fontFamily: "monospace",
        fontWeight: 700,
        letterSpacing: ".05rem",
        fontSize: "1.6rem",
    };

    const accessToken = useSelector((state) => state.auth.accessToken);
    const mode = useSelector((state) => state.profile.theme);

    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <>
            <Notification />
            <AppBar
                position="sticky"
                sx={{
                    backgroundColor: theme.palette.background.default,
                }}
            >
                <Toolbar disableGutters sx={{ padding: "0 2rem" }}>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: "flex",
                                justifyContent: "flex-start",
                                alignItems: "center",
                            }}
                        >
                            <NavLink
                                to="/"
                                style={{
                                    textDecoration: "none",
                                    fontFamily: "monospace",
                                    fontWeight: 700,
                                    color: theme.palette.text.secondary,
                                    letterSpacing: ".05rem",
                                    fontSize: "2.4rem",
                                }}
                            >
                                TimeTable
                            </NavLink>
                        </Box>
                        <Box
                            sx={{
                                display: { xs: "none", md: "flex" },
                                flexGrow: 1,
                                justifyContent: "space-around",
                                alignItems: "center",
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
                                                  color: "#ffa03a",
                                                  textShadow: "0 0 2rem #fff",
                                              }
                                            : NAVLINK_STYLE
                                    }
                                >
                                    {page.name}
                                </NavLink>
                            ))}
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                        }}
                    >
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={mode === "dark"}
                                    onChange={() =>
                                        dispatch(toggleThemeReducer())
                                    }
                                    name="Theme"
                                    color="primary"
                                    size="small"
                                />
                            }
                            label={mode.toUpperCase()}
                            labelPlacement="bottom"
                            sx={{
                                "& .MuiFormControlLabel-label": {
                                    ...NAVLINK_STYLE,
                                    fontSize: "1.2rem",
                                },
                            }}
                        />
                        <Tooltip title="Open settings">
                            <IconButton
                                onClick={handleOpenUserMenu}
                                sx={{ p: 0 }}
                            >
                                <Avatar alt="NITH Logo" src={NITHLogo} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{
                                mt: "45px",
                            }}
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
                            {verifiedPages.map((page) => (
                                <MenuItem
                                    sx={{
                                        minHeight: "auto",
                                        display: { xs: "auto", md: "none" },
                                    }}
                                    key={page.name}
                                >
                                    <NavLink
                                        to={page.href}
                                        key={page.href}
                                        style={{
                                            textAlign: "center",
                                            textDecoration: "none",
                                            fontFamily: "monospace",
                                            fontSize: {
                                                xs: "1.2rem",
                                                md: "1.6rem",
                                            },
                                            color: theme.palette.text.secondary,
                                        }}
                                    >
                                        {page.name}
                                    </NavLink>
                                </MenuItem>
                            ))}

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
                                        color={"text.secondary"}
                                        sx={{
                                            textAlign: "center",
                                            textDecoration: "none",
                                            fontFamily: "monospace",
                                            fontSize: {
                                                xs: "1.2rem",
                                                md: "1.6rem",
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
            </AppBar>
            <main style={{ padding: "2rem 2rem 0 2rem " }}>
                <Outlet />
            </main>
        </>
    );
}
export default Navbar;
