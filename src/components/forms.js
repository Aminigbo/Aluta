import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
      marginTop: theme.spacing(2),
    },
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));



export function text_input(placeholder, value, type, callback) {
  return (
     <TextField
        style={{width:"100%",textAlign:"center"}}
      onChange={(e) => {
        callback(e.target.value);
      }}
      value={value}
      required
      id="input"
      label={placeholder}
      type={type}
      variant="standard"
    />
  );
}
