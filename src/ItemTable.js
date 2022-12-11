import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import BrushIcon from "@mui/icons-material/Brush";

export default function ItemTable({ items, uploadHandler }) {
  const uploadFileHandler = async (event) => {
    if (event.target.files.length !== 1) {
      return;
    }

    const data = await readCsvFile(event.target.files[0]);
    const list = data
      .filter((row) => row.length === 3)
      .map((row) => {
        return {
          category: row[0],
          name: row[1],
          price: row[2],
        };
      });

    uploadHandler(list);
  };

  const readCsvFile = async (file) => {
    const csv = await file.text();
    return csv.split(/\r\n|\n/).map((row) => row.split(","));
  };

  return (
    <Box sx={{ textAlign: "center" }}>
      <List>
        <ListItem secondaryAction={<ListItemText primary="単価" />}>
          <ListItemAvatar></ListItemAvatar>
          <ListItemText primary="商品名" />
        </ListItem>
        <Divider />
        {items.map((item, i) => {
          return (
            <ListItem
              key={`itemtable-${i}`}
              secondaryAction={<ListItemText primary={`${item.price} 円`} />}
            >
              <ListItemAvatar>
                <BrushIcon />
              </ListItemAvatar>
              <ListItemText primary={item.name} />
            </ListItem>
          );
        })}
      </List>
      <Button
        variant="contained"
        component="label"
        onChange={uploadFileHandler}
      >
        商品一覧をアップロード
        <input hidden accept="text/csv" type="file" />
      </Button>
    </Box>
  );
}
