import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";

export default function AddItem({ handler }) {
  const [open, setOpen] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState({});
  const [memoTxt, setMemoTxt] = React.useState("");
  const [fileURL, setFileURL] = React.useState("");

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleFileInputChange(event) {
    if (selectedFile) {
      URL.revokeObjectURL(selectedFile);
    }
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFileURL(URL.createObjectURL(file));
    }
  }

  function handleAdd() {
    handler({ url: fileURL, txt: memoTxt });
    setOpen(false);
  }

  function handleDelete() {
    if (selectedFile) {
      URL.revokeObjectURL(selectedFile);
    }
    setSelectedFile(null);
    setFileURL("");
    setMemoTxt("");
    handler({ url: "", txt: "" });
    setOpen(false);
  }

  function handleTextChange(event) {
    setMemoTxt(event.target.value);
  }

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        メモを追加
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>メモを追加</DialogTitle>
        <DialogContent>
          <Box component="form">
            <Container sx={{ textAlign: "center", mb: "8px" }}>
              <Container sx={{ textAlign: "center", mb: "8px" }}>
                {fileURL !== "" && (
                  <img src={fileURL} alt="user-custom" width="100%" />
                )}
              </Container>
              <Button variant="contained" component="label">
                画像を追加
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={handleFileInputChange}
                />
              </Button>
            </Container>
            <TextField
              id="standard-multiline-flexible"
              label="ここにメモをしてください"
              multiline
              fullWidth
              minRows={4}
              variant="outlined"
              value={memoTxt}
              onChange={handleTextChange}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>キャンセル</Button>
          <Button onClick={handleDelete}>削除</Button>
          <Button onClick={handleAdd}>追加</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
