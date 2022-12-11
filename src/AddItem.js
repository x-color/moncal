import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";

const nullItem = {
  category: "",
  name: "",
  price: 0,
  num: 0,
};

export default function AddItem({ items, handler }) {
  const [open, setOpen] = React.useState(false);
  const [num, setNum] = React.useState(1);
  const [item, setItem] = React.useState(nullItem);
  const discounts = [...Array(11).keys()].map((v) => v * 10);
  const [discount, setDiscount] = React.useState(0);
  const categories = [
    "すべて",
    ...new Set(items.map((item) => item.category)),
    "その他",
  ];
  const [category, setCategory] = React.useState(categories[0]);

  const categoryFilter = (item) => {
    if (category === "すべて") {
      return true;
    }
    return item.category === category;
  };

  const handleClickOpen = () => {
    setNum(0);
    setItem(nullItem);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    if (item.name !== "" && num > 0) {
      handler({ ...item, num: num, discount: discount });
    }
    setOpen(false);
  };

  const handleNumChange = (event) => {
    setNum(event.target.value);
  };

  const handleItemChange = (event) => {
    setItem(items.find((v) => v.name === event.target.value));
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    if (isEditMode()) {
      setItem({ ...nullItem, category: category });
    }
  };

  const handleDiscountChange = (event) => {
    setDiscount(event.target.value);
  };

  const handleEditItemNameChange = (event) => {
    setItem({ ...item, name: event.target.value });
  };

  const handleEditItemPriceChange = (event) => {
    setItem({ ...item, price: event.target.value });
  };

  const isEditMode = () => {
    return category === "その他";
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        メニュー追加
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>メニュー追加</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
            <FormControl fullWidth sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="dialog-category-select-label">
                カテゴリ
              </InputLabel>
              <Select
                labelId="dialog-category-select-label"
                value={category}
                label="カテゴリ"
                onChange={handleCategoryChange}
              >
                {categories.map((v, i) => (
                  <MenuItem key={`category-${i}`} value={v}>
                    {v}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              {isEditMode() && (
                <TextField
                  id="dialog-item-name-input"
                  label="商品名"
                  variant="outlined"
                  onChange={handleEditItemNameChange}
                />
              )}
              {!isEditMode() && (
                <>
                  <InputLabel id="dialog-item-select-label">商品</InputLabel>
                  <Select
                    labelId="dialog-item-select-label"
                    value={item.name || ""}
                    label="商品"
                    onChange={handleItemChange}
                  >
                    {items
                      .filter((item) => categoryFilter(item))
                      .map((item, i) => (
                        <MenuItem key={`item-${i}`} value={item.name}>
                          {item.name}
                        </MenuItem>
                      ))}
                  </Select>
                </>
              )}
            </FormControl>
            {isEditMode() && (
              <FormControl sx={{ m: 1, minWidth: 80 }}>
                <TextField
                  id="dialog-price-input"
                  label="料金"
                  variant="outlined"
                  type="number"
                  onChange={handleEditItemPriceChange}
                />
              </FormControl>
            )}
            <FormControl sx={{ m: 1, minWidth: 80 }}>
              <InputLabel id="dialog-num-select-label">数量</InputLabel>
              <Select
                labelId="dialog-num-select-label"
                value={num}
                label="数量"
                onChange={handleNumChange}
              >
                {[...Array(11).keys()].map((v, i) => (
                  <MenuItem key={`num-${i}`} value={v}>
                    {v}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="dialog-discount-select-label">割引</InputLabel>
              <Select
                labelId="dialog-discount-select-label"
                value={discount}
                label="割引"
                onChange={handleDiscountChange}
              >
                {discounts.map((v, i) => (
                  <MenuItem key={`discount-${i}`} value={v}>
                    {`${v} %`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>キャンセル</Button>
          <Button onClick={handleAdd}>追加</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
