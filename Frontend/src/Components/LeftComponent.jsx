import backgroundImage from "../assets/Background.jpg"
const LeftComponent = () => {

    const leftStyles = {
        backgroundColor: "bisque",
        height: "100vh",
        width: "100vw", 
        backgroundImage: `url(${backgroundImage})`, 
        backgroundSize: "cover", 
        backgroundRepeat: "no-repeat",

        
    };

    return  <div style={leftStyles}></div>
  }

  export default LeftComponent
