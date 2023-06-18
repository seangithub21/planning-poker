import { Box, Typography } from "@mui/material";
import { toast } from "react-toastify";

import Button from "common/Button";
import Input from "common/Input";
import Modal from "common/Modal";
import { toastSuccess } from "common/Toastify";

const InvitePlayersModal = ({
  handleCloseModal,
  inviteLink,
  onChange,
  ...props
}) => {
  const handleCopyLink = async (inviteLink) => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      toastSuccess(
        <>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Typography>Invitation link copied to a clipboard!</Typography>
            <Typography sx={{ color: "#8490a3" }}>
              Share it to your teammates and start playing!
            </Typography>
          </Box>
        </>
      );
    } catch (e) {
      toast.error("Something went wrong!");
    } finally {
      handleCloseModal();
    }
  };

  return (
    <Modal onClose={handleCloseModal} withCloseIcon {...props}>
      <Box sx={{ minWidth: "50rem" }}>
        <Typography variant="h6" sx={{ mb: "4rem" }}>
          Invite players
        </Typography>
        <Box>
          <Input
            onChange={onChange}
            value={inviteLink}
            label="Game's url"
            sx={{ mb: "4rem" }}
            fullWidth
            onFocus={(event) => {
              event.target.select();
            }}
          />
        </Box>
        <Button fullWidth onClick={() => handleCopyLink(inviteLink)}>
          Copy invitation link
        </Button>
      </Box>
    </Modal>
  );
};

export default InvitePlayersModal;
