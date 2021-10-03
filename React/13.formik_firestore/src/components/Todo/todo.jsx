import './todo.css';
import { useFormik } from "formik";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import * as yup from 'yup';
import { collection, addDoc, getDocs } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from './../../firebase'

const userCol = collection(db, "todo")


const validationSchema = yup.object({
    title: yup
        .string('Enter your email')
        .required('Email is required'),
});


function Todo() {
    const [todo, settodo] = useState([])
    useEffect(() => {

        const getData = async () => {
            const querySnapshot = await getDocs(userCol);
            let todo = []
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data()}`);
                todo.push(doc.data())
            });
            settodo(todo)
        }
        getData()

        return () => {
            console.log("cleanup")
        };
    }, []);

    const formik = useFormik({

        initialValues: {
            title: "",
            description: ""
        },
        onSubmit: async (values) => {
            try {
                const docRef = await addDoc(userCol, {
                    title: values.title,
                    description: values.description,
                });
                console.log("Document written with ID: ", docRef.id);
                alert("signup Successful");
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        },
        validationSchema: validationSchema,
    });


    return (
        <Box sx={{ flexGrow: 1, m: 2 }} >

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Todo
            </Typography>


            <form onSubmit={formik.handleSubmit}>
                <Stack spacing={2}>
                    <TextField
                        fullWidth
                        color="primary"
                        id="outlined-basic"
                        label="Title"
                        variant="outlined"

                        name="title"
                        value={formik.values.title}
                        onChange={formik.handleChange}

                        error={formik.touched.title && Boolean(formik.errors.title)}
                        helperText={formik.touched.title && formik.errors.title}
                    />

                    <TextField
                        fullWidth
                        color="primary"
                        id="outlined-basic"
                        label="Description"
                        variant="outlined"

                        name="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}

                        error={formik.touched.description && Boolean(formik.errors.description)}
                        helperText={formik.touched.description && formik.errors.description}
                    />

                    <Button fullWidth variant="contained" color="primary" type="submit">Add Todo</Button>
                </Stack>

            </form>



            <div>
                {todo.map((eachUser, i) => {

                    return (<div key={i}>
                        <div> title: {eachUser.title}</div>
                        <div>description: {eachUser.description}</div>
                        <br />
                    </div>)
                })}

            </div>



        </Box>
    );
}

export default Todo;
