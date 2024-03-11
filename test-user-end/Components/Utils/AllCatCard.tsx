import { Card, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Image from "next/image";
import { useRouter } from "next/router";
import slug from "slug";
interface ICatCard {
  link: string;
  category: string;
  id: string;
}
const Catcard: React.JSXElementConstructor<ICatCard> = ({
  category,
  link,
  id,
}) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const router = useRouter();
  return (
    <Card
      onClick={() =>
        router.push("/category/[slug]", `/category/${slug(category)}-${id}`)
      }
      className={"category"}
      variant={"outlined"}
      sx={{ border: "none", minWidth: "130px" }}
    >
      <Box sx={{ display: "row", flexDirection: "row", p: 2 }}>
        <Skeleton
          variant="circular"
          width={100}
          height={100}
          sx={{ bgcolor: 'grey.300', zIndex: 1 }}
          animation="wave"
          {...(loaded && { style: { display: 'none' } })}
        />
        <Image
          className={"category_image"}
          height={100}
          width={100}
          priority={true}
          placeholder={"empty"}
          src={link}
          alt={"image of category"}
          onLoad={() => setLoaded(true)}
          style={{
            display: loaded ? 'block' : 'none',
            zIndex: 2,
          }}
        />
        <Grid container direction={"column"} spacing={2}>
          <Grid item xs={4} />
          <Grid item xs={4}>
            <Typography textAlign={"center"} variant={"body1"} fontSize={14}>
              {category}
            </Typography>
          </Grid>
          <Grid item xs={4} />
        </Grid>
      </Box>
    </Card>
  );
};
export default Catcard;
