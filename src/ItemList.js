import * as React from "react";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import BrushIcon from "@mui/icons-material/Brush";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import CurrencyYenIcon from "@mui/icons-material/CurrencyYen";
import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";

function ItemList({ items, addHandler, removeHandler, deleteHandler }) {
  const showPrice = (item) => {
    const basePrice = () => (
      <Typography
        display="inline"
        sx={{
          textDecoration: item.discount > 0 ? "line-through" : "none",
          mx: "5px",
        }}
      >
        {`${item.price} 円`}
      </Typography>
    );

    const discountPrice = () => {
      if (item.discount > 0) {
        return (
          <Typography display="inline" color="red" sx={{ mx: "5px" }}>
            {`→ ${(item.price * (100 - item.discount)) / 100} 円 (${
              item.discount
            }%引き)`}
          </Typography>
        );
      }
    };

    return (
      <Box>
        {basePrice()}
        {discountPrice()}
      </Box>
    );
  };

  const sum = (items) => {
    return items.reduce(
      (sum, v) => sum + ((v.price * (100 - v.discount)) / 100) * v.num,
      0
    );
  };

  return (
    <List>
      <ListItem>
        <ListItemAvatar></ListItemAvatar>
        <ListItemText primary="項目" />
      </ListItem>
      <Divider />

      {items.map((item) => {
        return (
          <ListItem
            key={`list-${item.name}`}
            secondaryAction={
              <Box>
                <IconButton
                  edge="start"
                  aria-label="remove"
                  onClick={() => removeHandler({ ...item, num: item.num - 1 })}
                >
                  <RemoveIcon />
                </IconButton>
                <Box
                  component="span"
                  sx={{
                    p: 2,
                    display: "inline-block",
                    width: "16px",
                    textAlign: "right",
                  }}
                >
                  {item.num}
                </Box>
                <IconButton
                  aria-label="add"
                  onClick={() => addHandler({ ...item, num: 1 })}
                >
                  <AddIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => deleteHandler(item)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            }
          >
            <ListItemAvatar>
              <BrushIcon />
            </ListItemAvatar>
            <ListItemText
              primary={item.name}
              secondary={showPrice(item)}
              secondaryTypographyProps={{ component: "div" }}
            />
          </ListItem>
        );
      })}
      <Divider />
      <ListItem secondaryAction={<ListItemText primary={sum(items)} />}>
        <ListItemAvatar>
          <CurrencyYenIcon />
        </ListItemAvatar>
        <ListItemText primary={`合計`} />
      </ListItem>
    </List>
  );
}

export default ItemList;
