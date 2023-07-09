// import * as React from "react";
// import Box from "@mui/material/Box";
// import Rating from "@mui/material/Rating";
// import Typography from "@mui/material/Typography";

// export default function BasicRating() {
//   const [value, setValue] = React.useState(0);
//   console.log(value);
//   return (
//     <Box
//       sx={{
//         "& > legend": { mt: 2 },
//       }}
//     >
//       <Typography component="legend">Controlled</Typography>
//       <Rating
//         name="simple-controlled"
//         value={value}
//         onChange={(event, newValue) => {
//           setValue(newValue);
//         }}
//       />
//       <Typography component="legend">Read only</Typography>
//       <Rating name="read-only" value={value} readOnly />
//       <Typography component="legend">Disabled</Typography>
//       <Rating name="disabled" value={value} disabled />
//       <Typography component="legend">No rating given</Typography>
//       <Rating name="no-value" value={null} />

//     </Box>

//   );
// }
import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

export default function TextRating() {
  const [value, setValue] = React.useState(3.5);
  // console.log(value);
  return (
    <Box
      sx={{
        width: 200,
        display: "flex",
        alignItems: "right",
        justifyContent: "center",
      }}
    >
      <Rating
        name="read-only"
        readOnly
        value={value}
        precision={0.5}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {/* <Box sx={{ ml: 2 }}>{labels[value]}</Box> */}
    </Box>
  );
}