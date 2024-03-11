import Head from "next/head";
import StoreHolder from "../Wappers/StoreHolder";
import Product_reviews from "./Product_reviews";
import Box from "@mui/material/Box";
import * as React from "react";
import {
  Card,
  CircularProgress,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  ArrowBack,
  ContentCopy,
  Storefront,
  Star,
  AddCircleOutline,
  ThumbsUpDown,
  AllOut,
} from "@mui/icons-material";
import { useRouter } from "next/router";
import {
  useGetSellerProducts,
  useGetSellerRecentOrder,
  useGetStoreReviews,
  useGetUserStore,
} from "../../hooks/useDataFetch";
import { useCallback, useState } from "react";
import { TRating, TStoreId } from "../../Helpers/Types";
import { useTranslation } from "react-i18next";
import { useTokenRefetch } from "../../hooks/useRefresh";
import { useDispatch, useSelector } from "react-redux";
import { snackBarOpen } from "../../Store/Utils";
import Image from "next/image";
import { RootState } from "../../Store/Index";
import { formatNumber } from "../../Helpers/utils";
import StoreFrontTopItem from "./components/storefront/TopItem";
import slug from "slug";
import { useEffect } from "react";
import StoreFrontRecentOrder from "./components/storefront/RecentOrder";

const noStoreStr = "no store yet!";

type TProducts = {
  discount: number;
  title: string;
  photo: string[];
  owner: TStoreId;
  price: number;
  orders: number;
  ratingId: TRating;
  _id: string;
  quantity: number;
};
type IReviews = {
  rate: number;
  name: string;
  description: string;
};

interface IOrder {
  _id: string;
  amount: number;
  quantity: number;
  name: string;
  productId: TProduct;
  price: number;
}

type TProduct = {
  title: string;
  photo: string[];
  subcategory: string;
  category: TCategory;
  view: number;
};

type TCategory = {
  title: string;
};

const Store: React.JSXElementConstructor<any> = () => {
  const isMatches: boolean = useMediaQuery("(max-width:500px)");
  const [search, setSearch] = React.useState("");
  const [showReviews, setShowReviews] = React.useState<boolean>(false);
  const [products, setProducts] = useState<TProducts[]>([]);

  const dispatch = useDispatch();
  const currency = useSelector((state: RootState) => state.currency.currency);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);
      const product = data?.filter((product) =>
        product.title.toLowerCase().includes(event.target.value.toLowerCase())
      );
      setProducts(product);
    },
    [search]
  );
  const router = useRouter();
  const { t } = useTranslation();
  // useEffect(() => {
  //   // Perform any necessary setup or data fetching here
  //   console.log("Component has been mounted");
  //   // Clean up any resources when the component is unmounted
  //   return () => {
  //     console.log("Component will be unmounted");
  //   };
  // }, []);

  const isMobile = useMediaQuery("(max-width: 600px)");
  const [topProducts, setTopProducts] = useState<TProducts[]>([]);

  const onSuccess = (data: TProducts[]) => {
    let length = data.length;
    const topPlaceholder: TProducts[] = [];
    for (let i = 0; i < length; i++) {
      if (data[i]?.quantity >= 1 && topPlaceholder.length < 4) {
        topPlaceholder.push(data[i]);
      }
    }
    setProducts(data);
    setTopProducts(topPlaceholder);
  };

  const { data, isLoading, isFetched, refetch } =
    useGetSellerProducts(onSuccess);

  const { isSuccess, data: storeInfo } = useGetUserStore(() => {});

  const generateStoreLink = () => {
    const storeName = storeInfo?.name.replace(" ", "-");
    return storeName ? `www.linconstore.com/store/${storeName}` : noStoreStr;
  };

  useTokenRefetch(refetch);

  const [reviews, setReviews] = useState<IReviews[]>([]);
  const onReviewSuccess = (data: IReviews[]) => {
    setReviews(data);
  };
  const { isLoading: reviewIsLoading, refetch: refetchReviews } =
    useGetStoreReviews(onReviewSuccess);
  useTokenRefetch(refetchReviews);

  const handleClick = async (data: string) => {
    if (data !== noStoreStr) {
      await navigator.clipboard.writeText(data);
      dispatch(
        snackBarOpen({
          message: "Copied to clipboard",
          severity: "success",
          snackbarOpen: true,
          rate: 0,
          sellerRate: 0,
        })
      );
    }
  };

  const [recentOrders, setRecentOrders] = useState<IOrder[]>([]);
  const onSellerRecentOrderSuccess = (data: IOrder[]) => {
    localStorage.setItem("ssssss", JSON.stringify(data));
    setRecentOrders(data);
  };
  const {
    isLoading: ordersIsLoading,
    isFetched: ordersIsFetched,
    refetch: recentRefetch,
  } = useGetSellerRecentOrder(onSellerRecentOrderSuccess);
  useTokenRefetch(recentRefetch);

  return (
    <>
      <Head>
        <title>{t("pagetitle.Store")}</title>
        <meta name={"Storefront"} content={"These are the Storefront"} />
        <link rel="icon" href="/favicon-store.ico" />
      </Head>
      <StoreHolder>
        <Card elevation={0} sx={{ bgcolor: "transparent", p: 2 }}>
          {isMobile && !showReviews && (
            <ArrowBack
              onClick={() => router.push("/account")}
              className={"pointer"}
            />
          )}
          {showReviews && (
            <ArrowBack
              onClick={() => setShowReviews(false)}
              className={"pointer"}
            />
          )}

          {/* <Search search={search} handleChange={handleChange} /> */}
          {isLoading && <CircularProgress />}
          {!showReviews && (
            <>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
                  mb: 2,
                }}
              >
                <Grid container bgcolor={"white"} p={2}>
                  <Grid item md={2} display={"flex"}>
                    <Box
                      alignItems={"center"}
                      display={"inline-flex"}
                      px={2}
                      py={1}
                      my={1}
                    >
                      <Storefront sx={{ mr: "10px" }} />
                      <Typography fontSize={14}>
                        {storeInfo?.name || ""}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item md={4} display={"flex"}>
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      onClick={() => handleClick(generateStoreLink())}
                      sx={{ cursor: "pointer" }}
                    >
                      <Typography
                        display={"inline-flex"}
                        px={2}
                        py={1}
                        mr={1}
                        sx={{ textDecoration: "underline" }}
                        fontSize={14}
                        color={"#0ba659"}
                      >
                        {generateStoreLink()}
                        {generateStoreLink() !== noStoreStr && (
                          <ContentCopy
                            sx={{
                              color: "#0ba659",
                              width: "30px",
                            }}
                          />
                        )}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item md={6} display={"flex"}>
                    <Typography fontSize={14}>
                      {t("store.Copy_the_link_to_your_store_and_distribute_it")}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>

              <Box>
                <Box
                  display={"flex"}
                  flexDirection={isMobile ? "column" : "row"}
                >
                  <Box
                    bgcolor={"white"}
                    mr={!isMobile && 1}
                    mb={isMobile && 1}
                    width={"100%"}
                    boxShadow={"0 0 10px rgba(0, 0, 0, 0.5)"}
                  >
                    <Box display={"flex"} bgcolor={"#0ba659"} p={1} my={2}>
                      <Typography color={"white"} fontSize={14}>
                        {t("store.Top_Items")}
                      </Typography>
                    </Box>
                    {isFetched && topProducts.length === 0 && (
                      <Box
                        display={"flex"}
                        alignItems={"center"}
                        onClick={() => router.push("/seller/post")}
                        p={2}
                        gap={2}
                        sx={{
                          cursor: "pointer",
                        }}
                      >
                        <AddCircleOutline />
                        <Typography>
                          {t("store.Add_your_first_item")}
                        </Typography>
                      </Box>
                    )}
                    {topProducts.length > 0 &&
                      topProducts.map((product, index) => {
                        return (
                          <>
                            {currency && (
                              <StoreFrontTopItem
                                key={index}
                                product={product}
                                currency={currency}
                              />
                            )}
                          </>
                        );
                      })}
                  </Box>
                  <Box
                    bgcolor={"white"}
                    width={"100%"}
                    ml={!isMobile && 1}
                    mt={isMobile && 1}
                    boxShadow={"0 0 10px rgba(0, 0, 0, 0.5)"}
                  >
                    <Box
                      display={"flex"}
                      bgcolor={"#0ba659"}
                      py={1}
                      px={1}
                      my={2}
                      // pl={"66px"}
                      justifyContent={"space-between"}
                    >
                      <Typography color={"white"} fontSize={14}>
                        {t("store.Recent_Orders")}
                      </Typography>
                      <Typography color={"white"} fontSize={14}>
                        {t("store.Category")}
                      </Typography>
                      <Typography color={"white"} fontSize={14}>
                        {t("store.Unit")}
                      </Typography>
                    </Box>
                    {ordersIsFetched && recentOrders?.length === 0 && (
                      <Typography variant={"body1"} p={2}>
                        {t("store.No_Products_yet")}
                      </Typography>
                    )}
                    {ordersIsFetched &&
                      recentOrders?.length > 0 &&
                      recentOrders.map((order, index) => {
                        if (index >= 4) return;
                        return (
                          <>
                            {currency && (
                              <div>
                                <StoreFrontRecentOrder
                                  key={index}
                                  order={order}
                                  currency={currency}
                                />
                              </div>
                            )}
                          </>
                        );
                      })}
                    {ordersIsFetched && recentOrders?.length > 0 && (
                      <Box
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        my={2}
                        onClick={() => router.push("/seller/orderplaced")}
                        sx={{ cursor: "pointer" }}
                      >
                        <AllOut />
                        <Typography>{t("store.View_All")}</Typography>
                      </Box>
                    )}
                  </Box>
                </Box>
                <br />
                {reviews?.length > 0 ? (
                  <Box
                    boxShadow={"0 0 10px rgba(0, 0, 0, 0.5)"}
                    bgcolor={"white"}
                  >
                    <Product_reviews reviews={reviews.slice(0, 2)} />
                    <Box
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      pb={1}
                      gap={1}
                      onClick={() => setShowReviews(true)}
                      sx={{ cursor: "pointer" }}
                    >
                      <ThumbsUpDown />
                      <Typography>{t("store.View_All")}</Typography>
                    </Box>
                  </Box>
                ) : (
                  <Typography variant={"body2"} textAlign={"center"}>
                    {t("seller.review.no_reviews_yet")}
                  </Typography>
                )}
              </Box>
            </>
          )}
          {showReviews && (
            <Box boxShadow={"0 0 10px rgba(0, 0, 0, 0.5)"} bgcolor={"white"}>
              <Product_reviews reviews={reviews} showReviews />
            </Box>
          )}
        </Card>
      </StoreHolder>
    </>
  );
};
export default Store;
