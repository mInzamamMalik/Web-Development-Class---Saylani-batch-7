
import { useState, useEffect, useRef } from "react"
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";

import { Formik, Field, Form, useFormik } from "formik";
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import * as yup from 'yup';
import { baseUrl } from "./../../core"

import { GlobalContext } from '../../context/Context';
import { useContext } from "react";


const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
});
const validationSchema_step2 = yup.object({
  otp: yup
    .string('Enter your email')
    .required('Email is required'),
  new_password: yup
    .string('Enter your email')
    .required('Email is required'),
  confirm_password: yup
    .string('Enter your email')
    .required('Email is required'),
});

function ForgetPassword() {
  let history = useHistory();

  let { state, dispatch } = useContext(GlobalContext);

  const [email, setEmail] = useState("")
  const [step, setStep] = useState(1)

  const formik = useFormik({
    validationSchema: validationSchema,
    initialValues: {
      email: '',
    },
    onSubmit: function (values) {

      setEmail(values.email)
      axios.post(`${baseUrl}/api/v1/otp`, {
        email: values.email
      })
        .then((res) => {
          console.log("res: ", res.data);

          if (res.data.otpSent) {
            setStep(2)
          }
        })
    }
  });
  const formik_step2 = useFormik({
    initialValues: {
      otp: "",
      newPassword: "",
      confirmPassword: ""
    },
    onSubmit: function (values) {
      console.log(values)

      axios.post(`${baseUrl}/api/v1/forget`, {
        email: email,
        otp: values.otp,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      })
        .then((res) => {
          console.log("res: ", res.data);
          alert("password updated");
        })
        .catch((error) => {
          if (error.response.status === 401) {
            alert("otp not valid");
          }
        })
    }
  });

  return (
    <div style={{ margin: "2rem" }}>
      <h1>Forget Password</h1>

      {(step === 1) ?
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={2}>

            <TextField
              fullWidth
              color="primary"
              id="outlined-basic"
              label="Email"
              variant="outlined"

              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}

              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />

            <Button fullWidth variant="contained" color="primary" type="submit">Send Email</Button>
          </Stack>

        </form> :

        <form onSubmit={formik_step2.handleSubmit}>
          <Stack spacing={2}>

            <TextField
              fullWidth
              color="primary"
              id="outlined-basic"
              label="Otp"
              variant="outlined"

              name="otp"
              value={formik_step2.values.otp}
              onChange={formik_step2.handleChange}

              error={formik_step2.touched.email && Boolean(formik_step2.errors.email)}
              helperText={formik_step2.touched.email && formik_step2.errors.email}
            />
            <TextField
              fullWidth
              color="primary"
              id="outlined-basic"
              label="New Password"
              variant="outlined"
              type="password"

              name="newPassword"
              value={formik_step2.values.newPassword}
              onChange={formik_step2.handleChange}

              error={formik_step2.touched.email && Boolean(formik_step2.errors.email)}
              helperText={formik_step2.touched.email && formik_step2.errors.email}
            />
            <TextField
              fullWidth
              color="primary"
              id="outlined-basic"
              label="Confirm Password"
              variant="outlined"
              type="password"

              name="confirmPassword"
              value={formik_step2.values.confirmPassword}
              onChange={formik_step2.handleChange}

              error={formik_step2.touched.email && Boolean(formik_step2.errors.email)}
              helperText={formik_step2.touched.email && formik_step2.errors.email}
            />

            <Button fullWidth variant="contained" color="primary" type="submit">Update Password</Button>
          </Stack>
        </form>
      }
    </div>
  );
}
export default ForgetPassword;
