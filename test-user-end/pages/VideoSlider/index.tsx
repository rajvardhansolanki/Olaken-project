import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCineNames } from "../../Store/CineNames";
import { getRecentProduct } from "../../Store/RecentProduct";
import {
  useGetUser,
  useGetUserWishlist,
} from "../../hooks/useDataFetch";
import { useTokenRefetch } from "../../hooks/useRefresh";
import Video from "./Video";
import styles from "./videoSlider.module.css";

const VideoSlider = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [wishlist, setWishlist] = useState([]);
  const [wishListToggle, setWishListToggle] = useState();
  const cineNamesData = useSelector((state: any) => state.cineNames?.cineNames);
  const {
    data: userData,
    isLoading: userIsLoading,
    refetch: userRefetch,
  } = useGetUser();

  useTokenRefetch(userRefetch);
  const recentProductData = useSelector(
    (state: any) => state?.recentProduct?.recentProduct
  );
  const cineLikeData = useSelector(
    (state: any) => state?.cineLikeSlice?.cineLike
  );
  const cineShares = useSelector(
    (state: any) => state?.cineShareSlice?.cineShare
  );

  const onSuccess = (data: any) => {
    const initial: any = [];
    data.forEach((myData) => {
      initial.push({ ...myData, check: false } as any);
    });
    setWishlist(initial);
  };

  const { isLoading, data, isFetched, refetch } = useGetUserWishlist(onSuccess);
  
  useEffect(() => {
    const handleRefetch = () => refetch();
    handleRefetch();
  }, [wishListToggle]);

  useEffect(() => {
    dispatch(getRecentProduct());
  }, []);

  useEffect(() => {
    dispatch(getCineNames());
  }, [dispatch, cineLikeData, cineShares]);

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <div className={styles.crossIcon}>
          <ChevronLeftIcon
            fontSize="large"
            sx={{
              color: "white",
            }}
            onClick={() => router.back()}
          />
        </div>
        {userData?._id &&
          recentProductData.map((item) => {
            return (
              <Video
                url={item?.videos[0]}
                userId={userData?._id}
                productId={item?._id}
                cineNamesdata={cineNamesData}
                owner={item?.owner}
                variants={item?.variants}
                price={item?.price}
                quantity={item?.quantity}
                wishlist={wishlist}
                setWishListToggle={setWishListToggle}
                productName={item?.title}
                productDescription={item?.description}
              />
            );
          })}
      </div>
    </div>
  );
};

export default VideoSlider;
