import { Link } from "react-router-dom";
import { useState } from "react";
import { Box, Toolbar, IconButton, Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";

const TopBar = ({ user }) => {
  const menu = {
    padding: 5,
    color: "white",
  };

  const hiddenMenu = {
    color: "#366169",
    fontFamily: ["Futura", "sans-serif"],
  };

  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Toolbar>
      <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
        <IconButton
          size="large"
          aria-label="menu-appbar"
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
          sx={{ display: { xs: "block", md: "none" } }}
        >
          <MenuItem key="menu" onClick={handleCloseNavMenu}>
            <Link style={hiddenMenu} to="/">
              home
            </Link>
          </MenuItem>
          {user ? (
            <>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link style={hiddenMenu} to="/user">
                  my page
                </Link>
              </MenuItem>
            </>
          ) : (
            <></>
          )}
          <MenuItem key="books" onClick={handleCloseNavMenu}>
            <Link style={hiddenMenu} to="/books">
              books
            </Link>
          </MenuItem>
          {user && user.admin ? (
            <>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link style={hiddenMenu} to="/loans">
                  loans
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link style={hiddenMenu} to="/reservations">
                  reservations
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link style={hiddenMenu} to="/ratings">
                  ratings
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link style={hiddenMenu} to="/users">
                  users
                </Link>
              </MenuItem>
            </>
          ) : (
            <></>
          )}
          {user ? (
            <>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link style={hiddenMenu} to="/logout">
                  log out
                </Link>
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link style={hiddenMenu} to="/login">
                  log in
                </Link>
              </MenuItem>
            </>
          )}
        </Menu>
      </Box>
      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        <Button
          onClick={handleCloseNavMenu}
          sx={{ my: 2, color: "white", display: "block" }}
        >
          <Link style={menu} to="/">
            home
          </Link>
        </Button>
        {user ? (
          <>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              <Link style={menu} to="/user">
                my page
              </Link>
            </Button>
          </>
        ) : (
          <></>
        )}
        <Button
          onClick={handleCloseNavMenu}
          sx={{ my: 2, color: "white", display: "block" }}
        >
          <Link style={menu} to="/books">
            books
          </Link>
        </Button>
        {user && user.admin ? (
          <>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              <Link style={menu} to="/loans">
                loans
              </Link>
            </Button>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              <Link style={menu} to="/reservations">
                reservations
              </Link>
            </Button>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              <Link style={menu} to="/ratings">
                ratings
              </Link>
            </Button>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              <Link style={menu} to="/users">
                users
              </Link>
            </Button>
          </>
        ) : (
          <></>
        )}
        {user ? (
          <>
            <Button
              onClick={handleCloseNavMenu}
              sx={{
                my: 2,
                color: "white",
                display: "block",
              }}
            >
              <Link style={menu} to="/logout">
                log out
              </Link>
            </Button>
          </>
        ) : (
          <Button
            onClick={handleCloseNavMenu}
            sx={{ my: 2, color: "white", display: "block" }}
          >
            <Link style={menu} to="/login">
              log in
            </Link>
          </Button>
        )}
      </Box>
    </Toolbar>
  );
};

export default TopBar;
