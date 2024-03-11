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

interface IStoreFrontRecentOrder {
    order: IOrder;
    currency: string;
}
const StoreFrontRecentOrder: React.FC<IStoreFrontRecentOrder> = ({ order, currency }) => {
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
                    src={order.productId?.photo[0]}
                    alt={"image of review"}
                    onLoad={() => setIsImgLoaded(true)}
                />
                <Box display={"flex"} justifyContent={"space-between"} width={"100%"}>
                    <Box display={"flex"} flexDirection={"column"} width={!isMobile ? "100px" : "50px"}>
                        <Typography
                            sx={{
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                width: isMobile ? "50px" : "150px",
                                fontSize: 14,
                            }}
                        >
                            {order.name}
                        </Typography>
                        <Typography color={"primary"}>
                            {currency} {order.price}
                        </Typography>
                    </Box>

                    <Box>
                        <Typography
                            sx={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                width: isMobile ? "100px" : "150px",
                                fontSize: 14
                            }}
                        >
                            {order.productId.subcategory}
                        </Typography>
                    </Box>

                    <Box>
                        <Typography fontSize={14}>{order.quantity}</Typography>
                    </Box>
                </Box>
            </Box>
        </>
    );
};
export default StoreFrontRecentOrder;
