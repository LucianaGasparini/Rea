import{ useContext } from "react";
import { TemaContext } from "../context/index";

const MaxContainer = (props) => {
  const { tema, setTema } = useContext(TemaContext);

  return (
    <div sx={{ backgroundColor: tema == "dark" ? "#121212" : "#f6f6f6" }}>
      {props.children}
      <div
        style={{
          width: "100%",
          height: "50px",
          backgroundColor: "#c2c2c2",
          color: "#fff",
          display: "flex",
          position: "fixed",
          bottom: 0,
        }}
      ></div>
    </div>
  );
};

export default MaxContainer;
