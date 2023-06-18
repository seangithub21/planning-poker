import { toast } from "react-toastify";

import CheckIcon from "@mui/icons-material/Check";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const toastifyConfigs = {
  position: "top-center",
  theme: "dark",
};

export const toastSuccess = (msg) =>
  toast.success(msg, {
    icon: <CheckIcon sx={{ fontSize: "2rem", color: "green" }} />,
  });

export const toastError = (msg) =>
  toast.error(msg, {
    icon: <CloseOutlinedIcon sx={{ fontSize: "2rem", color: "red" }} />,
  });

export default toastifyConfigs;
