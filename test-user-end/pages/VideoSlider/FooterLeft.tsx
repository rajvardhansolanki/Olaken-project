import StorefrontIcon from "@mui/icons-material/Storefront";
import { Box } from "@mui/system";
import styles from "./videoSlider.module.css";

export default function VideoFooter({
  owner,
  productName,
  productDescription,
}: any) {
  return (
    <Box className={styles.footerLeft}>
      <Box
        sx={{
          width: "100%",
          height: "60px",
          display: "flex",
        }}
      >
        <Box
          sx={{
            width: "10%",
            height: "82%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mr:'8px'
          }}
        >
          <StorefrontIcon fontSize="large" />
        </Box>
        <Box
          sx={{
            width: "85%",
            height: "54%",
            display: "flex",
            flexDirection: "column",
            padding: "7px",
          }}
        >
          <div>{owner?.name}</div>
          <div>{productName}</div>
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "58px",
          marginLeft: "4px",
        }}
      >
        {productDescription}
      </Box>
    </Box>
  );
}
