import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import ShoppingCartDrawer from "../../Components/BottomDrawer";
import { getLikeAndShareCountsForProductId } from "../../Helpers/utils";
import styles from "./videoSlider.module.css";

function VideoSidebar({
  productId,
  cineNamesdata,
  handleLike,
  handleShare,
  url,
  addToWishlist,
  deleteWishlist,
  wishlist,
  variants,
  userId,
}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const countResult = getLikeAndShareCountsForProductId(
    productId,
    cineNamesdata
  );
  const isliked = cineNamesdata.find(
    (item) => item.userId === userId && item.productId === productId
  );
  const [wishlistId, setWishlistId] = useState("");
  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };
  const isProductIdExist = (data, productId) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].productId?._id === productId) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    wishlist.map((item) => setWishlistId(item._id));
  }, [wishlist]);

  return (
    <Box className={styles.footerRight}>
      <Box
        sx={{ display: "flex", alignItems: "center" }}
        className={styles.sidebarIcon}
      >
        {isliked && isliked?.hasUserLiked ? (
          <ThumbUpIcon
            sx={{ width: 40, height: 40, color: "red" }}
            onClick={() => handleLike()}
            color="primary"
          />
        ) : (
          <ThumbUpOffAltIcon
            sx={{ width: 40, height: 40 }}
            onClick={() => handleLike()}
          />
        )}
        <Box sx={{ marginTop: 1 }}>{countResult.totalLikes}</Box>
      </Box>
      <Box
        sx={{ display: "flex", alignItems: "center" }}
        className={styles.sidebarIcon}
      >
        {!isProductIdExist(wishlist, productId) ? (
          <FavoriteBorderIcon
            sx={{ width: 40, height: 40 }}
            onClick={() => addToWishlist()}
          />
        ) : (
          <FavoriteIcon
            sx={{ width: 40, height: 40, color: "red" }}
            onClick={() => deleteWishlist([wishlistId])}
          />
        )}
      </Box>
      <Box
        sx={{ display: "flex", alignItems: "center" }}
        className={`${styles.sidebarIcon} ${styles.recordBelow}`}
      >
        <ShareIcon
          sx={{ width: 40, height: 40 }}
          onClick={() => handleShare(url)}
        />
        <Box sx={{ marginTop: 1 }}>{countResult.shareCount}</Box>
      </Box>
      <Box
        sx={{ display: "flex", alignItems: "center" }}
        className={`${styles.sidebarIcon} ${styles.recordBelow}`}
      >
        <ShoppingCartIcon
          sx={{ width: 40, height: 40 }}
          onClick={toggleDrawer(true)}
        />
      </Box>

      <ShoppingCartDrawer
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        variants={variants}
        productId={productId}
        addToWishlist={addToWishlist}
      />
    </Box>
  );
}

export default VideoSidebar;
