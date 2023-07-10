import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";

const partnerPages = [
  { label: "オファー選び", path: "/invitations" },
  { label: "チャット", path: "/chat" },
  { label: "予定管理", path: "/contracts/partner" },
];

const guestPages = [
  { label: "ログイン", path: "/login" },
  { label: "登録", path: "/register" },
];

const userPages = [
  { label: "オファー", path: "/offer" },
  { label: "チャット", path: "/chat" },
  { label: "予定管理", path: "/contracts" },
  { label: "おすすめ選び", path: "/recuit" },
];

const settings = ["プロファイル", "ログアウト"];

function ResponsiveAppBar() {
  const cookies = new Cookies();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const role = cookies.get("role");

  const handleLogout = () => {
    cookies.remove("accessToken");
    cookies.remove("refreshToken");
    cookies.remove("role");
    navigate("/login");
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleNavigation = (path) => {
    navigate(path);
    handleCloseNavMenu();
  };

  if (!role) {
    return null;
  }

  return (
    <AppBar position="static" sx={{ backgroundColor: "#e8894e" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img src="logo.png" width={120} height={60}></img>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {guestPages.map((page) => (
                <MenuItem
                  key={page.label}
                  onClick={() => handleNavigation(page.path)}
                >
                  <Typography textAlign="center">{page.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1 }} />{" "}
          {/* Add this empty box to push the buttons to the right */}
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {role === "user" &&
              userPages.map((page) => (
                <Button
                  key={page.label}
                  onClick={() => handleNavigation(page.path)}
                  sx={{ mx: 1, color: "white" }}
                >
                  <Typography textAlign="lef" variant="h6">
                    {page.label}
                  </Typography>
                </Button>
              ))}
            {role === "partner" &&
              partnerPages.map((page) => (
                <Button
                  key={page.label}
                  onClick={() => handleNavigation(page.path)}
                  sx={{ mx: 1, color: "white" }}
                >
                  <Typography textAlign="lef" variant="h6">
                    {page.label}
                  </Typography>
                </Button>
              ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={
                    setting === "ログアウト"
                      ? handleLogout
                      : handleCloseUserMenu
                  }
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
