import "bootstrap/dist/css/bootstrap.min.css";
import { Box, Button, FormControl, FormGroup, TextField } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Loading from "../../component/Loading";

const api = "https://6329b9024c626ff832c89dc9.mockapi.io/todolist/";

function AddTodo() {
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [jobs, setJobs] = useState([]);
  const [render, setRender] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const queryId = router.query.id;
  console.log("router", queryId);

  useEffect(() => {
    // console.log("effect", id);
    const fetchData = async function () {
      const res = await fetch(api);
      const data = await res.json();
      console.log("dada", data);
      setData(data);
    };
    fetchData();
  }, [render, queryId]);

  function handleSubmit(event) {
    setIsLoading(!isLoading);
    console.log("id", queryId);
    event.preventDefault();
    const form = { name, job };
    fetch(api + `${queryId ? queryId : ""}`, {
      method: queryId ? "PUT" : "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
    }).then((res) => {
      setJobs((prev) => {
        const newJobs = [...prev];
        newJobs.push(form);
        return newJobs;
      });
      setName("");
      setJob("");
      setIsLoading(false);
      setRender(!render);
      router.push("/addtodo");
    });
  }

  function handleDelete(id) {
    const fetchData = async function () {
      const res = await fetch(api + id, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log("dataDelete", data);
      setRender(!render);
    };
    fetchData();
  }

  function handleEdit(job) {
    console.log("edit", job);
    router.push(`/addtodo?id=${job.id}`);
    setName(job.name);
    setJob(job.job);
  }

  if (isLoading) {
    return (
      <main>
        <Loading />
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
                <Button onClick={() => handleDelete(job.id)}>Delete</Button>
              </li>
            );
          })}
        </ul>
      </main>
    );
}

export default AddTodo;
