import { styled } from '@mui/material/styles';


const Div = styled('div')(({ theme }) => ({

    padding: theme.spacing(1),
    height: "200px",

    [theme.breakpoints.down('xs')]: {
        backgroundColor: "red",
        width: "300px",
    },
    [theme.breakpoints.down('md')]: {
        backgroundColor: "red",
        width: "300px",
    },
    [theme.breakpoints.up('md')]: {
        backgroundColor: "yellow",
        width: "500px",
    },
    [theme.breakpoints.up('lg')]: {
        backgroundColor: "green",
        width: "1000px",
    },
    [theme.breakpoints.up('xl')]: {
        backgroundColor: "green",
        width: "1000px",
    },
}));


function Contact() {

    return (
        <>
            <h1> Contact page </h1>
            <Div>I am a Div</Div>
        </>

    );
}

export default Contact;