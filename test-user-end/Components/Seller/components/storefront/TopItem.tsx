import React, { useState } from "react";
import { useRouter } from "next/router";
import slug from "slug";
import Image from "next/image";
import { Grid, Typography, useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { useTranslation } from "react-i18next";
import Star from "@mui/icons-material/Star";
import { formatNumber } from "../../../../Helpers/utils";
import { TStoreId, TRating } from "../../../../Helpers/Types";

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

interface IStoreFrontTopItem {
    product: TProducts;
    currency: string;
}
const StoreFrontTopItem: React.FC<IStoreFrontTopItem> = ({ product, currency }) => {
    const isMobile = useMediaQuery("(max-width: 600px)");
    const [isImgLoaded, setIsImgLoaded] = useState<boolean>(false);
    // const [isTextLoaded, setIsTextLoaded] = useState<boolean>(false);

    const router = useRouter();
    const { t } = useTranslation();

    return (
        <>
            <Box
                display={"flex"}
                p={1}
                gap={2}
                alignItems={"center"}
                sx={{
                    cursor: "pointer",
                }}
                onClick={() =>
                    router.push(
                        "/product/[slug]",
                        `/product/${slug(product.title)}-${product._id}`
                    )
                }
            >
                <Skeleton
                    variant="circular"
                    width={55}
                    height={55}
                    sx={{ bgcolor: 'grey.300', zIndex: 1 }}
                    animation="wave"
                    {...(isImgLoaded && { style: { display: 'none' } })}
                />
                <Image
                    width={55}
                    height={55}
                    style={{
                        width: "100%",
                        height: "100%",
                        display: isImgLoaded ? 'block' : 'none',
                        zIndex: 2,
                    }}
                    placeholder="empty"
                    src={product?.photo[0]}
                    alt={"image of review"}
                    onLoad={() => setIsImgLoaded(true)}
                />

                <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    width={"100%"}
                >
                    <Box display={"flex"} flexDirection={"column"}>
                        <Typography
                            sx={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                width: isMobile ? "100px" : "200px",
                                fontSize: 14,
                            }}
                        >
                            {product.title}
                        </Typography>
                        <Typography color={"primary"}>
                            {currency} {product.price}
                        </Typography>
                    </Box>

                    {product?.ratingId?.ratings.length > 0 && (
                        <Box display={"flex"} alignItems={"center"} gap={1}>
                            <Star
                                fontSize={"small"}
                                sx={{ color: "#FFD700" }}
                            />{" "}
                            <Typography variant={"body1"}>
                                {formatNumber(product?.ratingId?.averageRating)} (
                                {product?.ratingId?.ratings.length}{" "}
                                {product?.ratingId?.ratings.length > 1
                                    ? t("product.reviews")
                                    : t("product.review")}
                                )
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Box>
        </>
    );
};
export default StoreFrontTopItem;
