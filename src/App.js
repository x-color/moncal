import * as React from "react";
import AppBar from "./AppBar";
import ItemList from "./ItemList";
import AddItem from "./AddItem";
import ItemTable from "./ItemTable";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [items, setItems] = React.useState(
    JSON.parse(localStorage.getItem("items")) || []
  );
  const [cart, setCart] = React.useState([]);

  const AddItemHandler = (item) => {
    let newCart;
    if (cart.find((v) => v.name === item.name)) {
      newCart = cart.map((v) => {
        if (v.name === item.name) {
          return {
            ...v,
            num: v.num + item.num,
          };
        }
        return v;
      });
    } else {
      newCart = [...cart, item];
    }
    setCart(newCart);
  };

  const RemoveItemHandler = (item) => {
    const newCart = cart.map((v) => {
      if (v.name === item.name && item.num > 0) {
        return {
          ...v,
          num: v.num - 1,
        };
      }
      return v;
    });
    setCart(newCart);
  };

  const DeleteItemHandler = (item) => {
    setCart(cart.filter((v) => v.name !== item.name));
  };

  const uploadHandler = (list) => {
    setItems(list);
    localStorage.setItem("items", JSON.stringify(list));
  };

  return (
    <BrowserRouter>
      <AppBar></AppBar>
      <Routes>
        <Route
          path="/"
          element={
            <Container maxwidth="m">
              <ItemList
                items={cart}
                addHandler={AddItemHandler}
                removeHandler={RemoveItemHandler}
                deleteHandler={DeleteItemHandler}
              ></ItemList>
              <Box sx={{ textAlign: "center" }}>
                <AddItem items={items} handler={AddItemHandler}></AddItem>
              </Box>
            </Container>
          }
        ></Route>
        <Route
          path="/items"
          element={
            <Container maxwidth="m">
              <ItemTable
                items={items}
                uploadHandler={uploadHandler}
              ></ItemTable>
            </Container>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
