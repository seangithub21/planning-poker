import { useState } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import Button from "common/Button";
import Switch from "common/Switch";

const DropDownMenu = ({
  title,
  menuItems,
  isUserSettings,
  noArrowDownIcon,
  isIconButton,
  icon,
  handleClickMenuItem,
  listItemId,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { auth } = useSelector((state) => state);
  const open = Boolean(anchorEl);
  const theme = useTheme();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (value) => {
    value !== "spectatorMode" && setAnchorEl(null);
    handleClickMenuItem && value && handleClickMenuItem(value, listItemId);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      {title && isUserSettings && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50%",
            color: theme.palette.primary.main,
            bgcolor: "#d7e9ff",
            width: "3.2rem",
            height: "3.2rem",
            fontWeight: 700,
          }}
        >
          {title[0].toUpperCase()}
        </Box>
      )}
      {title && !isIconButton ? (
        <Box>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            variant="text"
            endIcon={!noArrowDownIcon && <KeyboardArrowDownIcon />}
            sx={{ color: theme.palette.grey[900] }}
          >
            {title}
          </Button>
        </Box>
      ) : (
        <IconButton onClick={handleClick}>{icon && icon}</IconButton>
      )}

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        onClose={() => handleClose()}
      >
        {isUserSettings && (
          <Box sx={{ width: "30rem" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "1.8rem",
                p: "2rem 0 2.2rem 2.4rem",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  color: theme.palette.primary.main,
                  bgcolor: "#d7e9ff",
                  fontWeight: 700,
                  width: "6.2rem",
                  height: "6.2rem",
                  m: "0",
                }}
              >
                {(auth.user?.displayName || auth.email)?.[0].toUpperCase()}
              </Box>
              <Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    sx={{ fontSize: "1.8rem", fontFamily: "UbuntuBold" }}
                  >
                    {auth.user?.displayName || auth.email}
                  </Typography>
                  <Button icon disableRipple>
                    <EditOutlinedIcon
                      sx={{
                        fontSize: "2.4rem",
                        color: theme.palette.text.primary,
                      }}
                    />
                  </Button>
                </Box>
                <Box>
                  <Typography
                    sx={{ fontSize: "1.8rem", fontFamily: "UbuntuRegular" }}
                  >
                    {!auth.email && "Guest user"}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Divider sx={{ mb: ".8rem" }} />
          </Box>
        )}
        {menuItems.map((menuItem) => {
          return (
            <MenuItem
              disableRipple
              onClick={() => handleClose(menuItem.value)}
              key={menuItem.label}
              sx={{
                minWidth: "24rem",
                fontSize: "1.8rem",
                fontFamily: "UbuntuRegular",
              }}
            >
              {menuItem.icon && <ListItemIcon>{menuItem.icon}</ListItemIcon>}
              {menuItem.label}
              {menuItem.value === "spectatorMode" && (
                <Switch
                  sx={{ m: "0 0 0 auto" }}
                  checked={auth.user?.spectatorMode || false}
                />
              )}
            </MenuItem>
          );
        })}
      </Menu>
    </Box>
  );
};

export default DropDownMenu;
