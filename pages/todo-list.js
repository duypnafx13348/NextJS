import React from "react";
import { Button, List, ListItemText } from "@mui/material";

const api = "https://6329b9024c626ff832c89dc9.mockapi.io/todolist/";

export default function TodoList({
  jobs,
  setRender,
  setShowPopupEdit,
  setId,
  setName,
  setJob,
}) {
  function handleClickEdit(job) {
    setShowPopupEdit((prev) => !prev);
    setId(job.id);
    setName(job.name);
    setJob(job.job);
  }
  function handleClickDelete(id) {
    fetch(api + id, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        setRender((prev) => !prev);
      });
  }
  return (
    <List>
      {jobs?.map((job) => (
        <ListItemText key={job.id}>
          {job.name} - {job.job}
          <Button onClick={() => handleClickEdit(job)}>Edit</Button>
          <Button onClick={() => handleClickDelete(job.id)}>Delete</Button>
        </ListItemText>
      ))}
    </List>
  );
}
