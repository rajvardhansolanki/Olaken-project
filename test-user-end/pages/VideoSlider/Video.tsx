import { Alert, Snackbar } from "@mui/material";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { checkIsViewed } from "../../Helpers/utils";
import { cineLikeProduct } from "../../Store/CineNameLike";
import { cineShareProduct } from "../../Store/CineNameShare";
import { modalUserOpen } from "../../Store/Modal";
import { snackBarOpen } from "../../Store/Utils";
import ContextApi from "../../Store/context/ContextApi";
import {
  useAddUserWishlist,
  useDeleteWish
} from "../../hooks/useDataFetch";
import Footer from "./FooterLeft";
import FooterRight from "./FooterRight";
import styles from "./videoSlider.module.css";

const Video = ({
  url,
  productId,
  cineNamesdata,
  owner,
  variants,
  price,
  quantity,
  wishlist,
  setWishListToggle,
  userId,
  productName,
  productDescription,
}) => {
  const dispatch = useDispatch();
  const videoRef = useRef(null);
  const router = useRouter();
  const isLoggined = useContext(ContextApi).isLoggedIn;
  const [userInfo, setUserInfo] = useState(null);
  const [isObserverAttached, setObserverAttached] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const onVideoPress = () => {
    const video = videoRef.current;

    if (video.paused) {
      video.play();
      if (!isObserverAttached) {
        observer.observe(video.parentElement);
        setObserverAttached(true);
      }
    } else {
      video.pause();
    }
  };

  const intersectionCallback = (entries) => {
    entries.forEach((entry) => {
      const videoElement = entry.target.childNodes[0];

      if (entry.isIntersecting) {
        videoElement.play();
      } else {
        videoElement.pause();
      }
    });
  };

  const observer = new IntersectionObserver(intersectionCallback, {
    threshold: 0.6,
  });

  const isCineViewed = async (userId, productId) => {
    try {
      const data = await checkIsViewed(userId, productId);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    const videoElements = document.querySelectorAll(".videos");
    videoElements.forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, [observer]);

  const handleLike = () => {
    dispatch(cineLikeProduct({ userId: userId, productId: productId }));
  };

  const handleShare = (videoUrl) => {
    dispatch(cineShareProduct({ userId: userId, productId: productId }));

    navigator.clipboard
      .writeText(videoUrl)
      .then(() => {
        setSnackbarOpen(true);
      })
      .catch((error) => {
        console.error("Error copying to clipboard:", error);
      });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    const userString = Cookies.get("userInfo");
    if (userString) {
      const user = JSON.parse(userString);
      setUserInfo(user);
    }
  }, []);

  const addToWishlist = () => {
    if (!isLoggined) return router.push("/login");
    if (owner?.owner?._id !== userInfo?.sellerId) {
      if (variants.length > 0) {
        dispatch(
          snackBarOpen({
            message: "product.modal_data.warning",
            snackbarOpen: true,
            severity: "warning",
            rate: 0,
            sellerRate: 0,
          })
        );
        return;
      }
      const data = {
        productId: productId,
        price,
        quantity,
        variants,
      };
      console.log("productIdproductIdproductId", productId);
      addToWish(data);
    } else {
      alert("You can't wishlist your own product");
    }
  };

  const onWishSuccess = () => {
    dispatch(
      modalUserOpen({
        message: "product.modal_data.success_add_wishlist",
        image: "/assets/img/Shopping-bag.svg",
        modalType: "wishlist",
      })
    );
    setWishListToggle(true);
  };

  const { isLoading: isWishing, mutate: addToWish } =
    useAddUserWishlist(onWishSuccess);

  const onDeleteSuccess = (data: any) => {
    dispatch(
      modalUserOpen({
        message: "Remove from wishlist",
        image: "/assets/img/Shopping-bag.svg",
        modalType: "wishlist",
      })
    );
    setWishListToggle(false);
  };

  const { isLoading: isDeleting, mutate: deleteWishlist } =
    useDeleteWish(onDeleteSuccess);

  return (
    <div className={`${styles.video} videos`}>
      <video
        className={`${styles.player}`}
        onClick={onVideoPress}
        onPlay={() => isCineViewed(userId, productId)}
        ref={videoRef}
        loop
        src={url}
        autoPlay
      ></video>
      <div className={styles.bottomControls}>
        <Footer
          owner={owner}
          productName={productName}
          productDescription={productDescription}
        />
        <FooterRight
          productId={productId}
          cineNamesdata={cineNamesdata}
          handleLike={handleLike}
          handleShare={handleShare}
          url={url}
          addToWishlist={addToWishlist}
          deleteWishlist={deleteWishlist}
          wishlist={wishlist}
          variants={variants}
          userId={userId}
        />

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Link copied to clipboard!
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default Video;
