import React, { useState } from "react";
import { Box, Button, FormGroup, TextField } from "@mui/material";

const api = "https://6329b9024c626ff832c89dc9.mockapi.io/todolist/";

function PopupForm({
  buttonName,
  setRender,
  id,
  setShowPopupEdit,
  setShowPopupAdd,
  name,
  setName,
  job,
  setJob,
}) {
  function handleSubmit(e) {
    e.preventDefault();
    const newForm = { name, job };
    fetch(api + `${id ? id : ""}`, {
      method: id ? "PUT" : "POST",
      body: JSON.stringify(newForm),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
    })
      .then(() => {
        setName("");
        setJob("");
        if (id) {
          setShowPopupEdit((prev) => !prev);
        } else {
          setShowPopupAdd((prev) => !prev);
        }
        setRender((prev) => !prev);
      })
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <FormGroup>
          <TextField
            label="Name"
            variant="standard"
            inputProps={{ name: "name", id: "name" }}
            placeholder="Nguyễn Văn A"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <TextField
            variant="standard"
            label="Job"
            inputProps={{ name: "job", id: "job" }}
            placeholder="Lau Nhà"
            value={job}
            onChange={(e) => setJob(e.target.value)}
          />
        </FormGroup>
        <Button variant="contained" type="submit">
          {buttonName}
        </Button>
      </Box>
    </div>
  );
}

export default PopupForm;
