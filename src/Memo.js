import * as React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { Container } from "@mui/system";

function Memo({ url, txt }) {
  const breakedText = txt.split("\n").map((line, key) => (
    <span key={key}>
      {line}
      <br />
    </span>
  ));

  return (
    <Container>
      <Container>
        {url !== "" && <img src={url} alt="user-custom" width="100%" />}
      </Container>
      {txt !== "" && (
        <Box textAlign={"left"}>
          <Typography variant="subtitle1">Memo</Typography>
          <Typography>{breakedText}</Typography>
        </Box>
      )}
    </Container>
  );
}

export default Memo;
