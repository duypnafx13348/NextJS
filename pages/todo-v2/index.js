// import "bootstrap/dist/css/bootstrap.min.css";
import { Box, Button, FormControl, FormGroup, TextField } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

const api = "https://6329b9024c626ff832c89dc9.mockapi.io/todolist/";

function Todo() {
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [render, setRender] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const queryId = router.query.id;

  useEffect(() => {
    const fetchData = async function () {
      const res = await fetch(api);
      const data = await res.json();
      setData(data);
    };
    fetchData();
  }, [render]);

  function handleSubmit(event) {
    setIsLoading(!isLoading);
    event.preventDefault();
    const form = { name, job };
    if (queryId) {
      setData((prev) => {
        const newData = [...prev];
        const findData = newData.find((data) => data.id == queryId);
        findData.name = name;
        findData.job = job;
        return newData;
      });
    } else {
      setData((prev) => {
        const newData = [...prev];
        newData.push(form);
        console.log("check");
        return newData;
      });
    }
    setName("");
    setJob("");
    fetch(api + `${queryId ? queryId : ""}`, {
      method: queryId ? "PUT" : "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        setRender(!render);
        router.push("/todo-v2");
      })
      .catch((err) => console.log(err));
  }

  function handleDelete(job) {
    console.log("api", api + job.id);
    setData((prev) => {
      const newData = [...prev];
      const filData = newData.filter((data) => data.id != job.id);
      return filData;
    });
    const fetchData = async function () {
      const res = await fetch(api + job.id, {
        method: "DELETE",
      });
      try {
        const data = await res.json();
        console.log("delete success", data);
        // setRender(!render);
      } catch (err) {
        console.log("err");
      }
    };
    fetchData();
  }

  function handleEdit(job) {
    router.push(`/todo-v2?id=${job.id}`);
    setName(job.name);
    setJob(job.job);
  }
  if (isLoading) {
    return (
      <main>
        <CircularProgress disableShrink />
      </main>
    );
  } else
    return (
      <main>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="job"
            label="Job"
            variant="outlined"
            value={job}
            onChange={(e) => setJob(e.target.value)}
          />
          <FormGroup
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
          >
            <Button variant="contained" type="submit">
              {queryId ? "Edit" : "Add"}
            </Button>
          </FormGroup>
        </Box>
        <ul>
          {data.map((job) => {
            return (
              <li key={job.id}>
                {job.name} - {job.job}
                <Button onClick={() => handleEdit(job)}>Edit</Button>
                <Button onClick={() => handleDelete(job)}>Delete</Button>
              </li>
            );
          })}
        </ul>
      </main>
    );
}

export default Todo;
