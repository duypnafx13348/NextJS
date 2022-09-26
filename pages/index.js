import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Button, IconButton } from "@mui/material";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import PopupForm from "./popupform";
import TodoList from "./todo-list";

const api = "https://6329b9024c626ff832c89dc9.mockapi.io/todolist/";

export default function Add() {
  const [jobs, setJobs] = useState([]);
  const [render, setRender] = useState(false);
  const [showPopupAdd, setShowPopupAdd] = useState(false);
  const [showPopupEdit, setShowPopupEdit] = useState(false);
  const [id, setId] = useState();

  useEffect(() => {
    fetch(api)
      .then((res) => res.json())
      .then((data) => setJobs(data));
  }, [render]);

  return (
    <>
      <Head>
        <title>Add Todo</title>
      </Head>
      <main>
        <IconButton onClick={() => setShowPopupAdd((prev) => !prev)}>
          <AddCircleOutlinedIcon />
        </IconButton>
        {showPopupAdd && (
          <PopupForm
            title="Add"
            buttonName="Add Todo"
            setRender={setRender}
            setShowPopupAdd={setShowPopupAdd}
          />
        )}
        {showPopupEdit && (
          <PopupForm
            title="Edit"
            buttonName="Edit Todo"
            setRender={setRender}
            id={id}
            setShowPopupEdit={setShowPopupEdit}
          />
        )}
        <TodoList
          jobs={jobs}
          setRender={setRender}
          setShowPopupEdit={setShowPopupEdit}
          setId={setId}
        />
      </main>
    </>
  );
}
