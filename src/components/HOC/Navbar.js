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

function Navbar() {
  const navigate = useNavigate();

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
                    className={({ isActive }) =>
                      isActive ? "activeRoute" : ""
                    }
                    to={page.href}
                    key={page.href}
                    style={{
                      textDecoration: "none",
                      color: "#fff",
                      fontFamily: "monospace",
                      fontWeight: 700,
                      letterSpacing: ".05rem",
                      fontSize: "16px",
                      padding: "10px",
                    }}
                  >
                    {page.name}
                  </NavLink>
                ))}
              </Box>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
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
                {(true ? verifiedSettings : unverifiedSettings).map(
                  (setting) => (
                    <MenuItem
                      sx={{ minHeight: "auto" }}
                      key={setting.name}
                      onClick={() => {
                        handleCloseUserMenu();
                        if (setting.href === "profile") {
                          navigate("/profile");
                        }
                        // if (authCntxt.isLoggedIn) authCntxt.logout();
                        // else {
                        //   navigate("/login");
                        // }
                      }}
                    >
                      <Typography
                        sx={{
                          textAlign: "center",
                          textDecoration: "none",
                          color: "#000",
                          fontFamily: "monospace",
                          fontSize: { xs: "12px", md: "16px" },
                        }}
                      >
                        {/* {authCntxt.isLoggedIn ? setting : "Login"} */}
                        {setting.name}
                      </Typography>
                    </MenuItem>
                  )
                )}
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
