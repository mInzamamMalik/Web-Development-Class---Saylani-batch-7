import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

function About() {
    return (
        <>
            <h1> About page </h1>
            <Box sx={{ flexGrow: 1, padding:"2rem" }}>

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Paper elevation={3} >sx=8</Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Paper elevation={3}>xs=4</Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Paper elevation={3} >xs=4</Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Paper elevation={3} >xs=8</Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Paper elevation={3} >xs=8</Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Paper elevation={3} >xs=8</Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Paper elevation={3} >xs=8</Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Paper elevation={3} >xs=8</Paper>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default About;