import React from "react";
import Avatar from "@mui/material/Avatar";

const Logo: React.FC = () => {
  return (
    <Avatar
      variant={"square"}
      sx={{
        width: 270,
        height: 230,
        p: 2,
        m: 2,
        alignItems: "center",
        justifyContent: "center",
      }}
      src={"https://res.cloudinary.com/linconstore-test/image/upload/f_auto,q_auto/v1/web-asset_2023-11-07_17_35/foezgis9u2avsc1ojjkq"}
      alt={"avatar of bothword-store"}
    />
  );
};

export default Logo;
