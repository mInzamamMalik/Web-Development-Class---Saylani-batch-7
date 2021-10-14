import axios from 'axios';
import { useState, useEffect } from "react"
import { useFormik } from "formik";
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const dev = "http://localhost:5000"
const baseUrl = window.location.hostname.split(":")[0] === "localhost" ? dev : "";


function App() {

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      address: '',
    },
    onSubmit: onSubmitFunction
  });

  function onSubmitFunction(values) {
    console.log("values: ", values)
    axios.post(`${baseUrl}/api/v1/profile`, {
      name: values.name,
      email: values.email,
      address: values.address
    })
      .then(res => {
        console.log(res.data);
        setToggleGetUser(!toggleGetUser)
      });
  }

  const [users, setUsers] = useState([]);
  const [toggleGetUser, setToggleGetUser] = useState(false);

  useEffect(() => {

    axios.get(`${baseUrl}/api/v1/profile`)
      .then(res => {
        console.log(res.data);
        setUsers(res.data)
      });

    return () => {
      console.log("cleanup");
    };
  }, [toggleGetUser]);


  return (
    <div>


      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={2}>
          <TextField
            fullWidth
            color="primary"
            id="outlined-basic"
            label="name"
            variant="outlined"

            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}

            error={formik.touched.website && Boolean(formik.errors.website)}
            helperText={formik.touched.website && formik.errors.website}
          />

          <TextField
            fullWidth
            color="primary"
            id="outlined-basic"
            label="email"
            variant="outlined"

            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}

            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          <TextField
            fullWidth
            color="primary"
            id="filled-basic"
            label="Address"
            variant="outlined"
            type="address"

            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}

            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          <Button fullWidth variant="contained" color="primary" type="submit">Add</Button>
        </Stack>
      </form>



      {users.map(eachUser => {
        return <>
          <h1>{eachUser.name}</h1>
          <h3>{eachUser.email}</h3>
          <h3>{eachUser.address}</h3>
        </>
      })}

    </div>
  );
}

export default App;
