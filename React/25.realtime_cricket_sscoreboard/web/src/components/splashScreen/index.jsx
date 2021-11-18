import img from "./../../img/splash.png"


function Splash() {

    return (
        <>
            <div style={{backgroundColor: "#181415", width: "100%", height: "100vh"}}>

                <img style={{
                    width: "100%",
                    position: "fixed",
                    bottom: "0px"
                }}
                    src={img} alt="" />
            </div>
        </>
    );
}

export default Splash;