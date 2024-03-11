import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  FormControl,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  AddBoxOutlined,
  IndeterminateCheckBoxOutlined,
  InfoOutlined,
} from "@mui/icons-material";
import EuroIcon from "@mui/icons-material/Euro";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { FavoriteBorder, Home, Person, PlayCircle } from "@mui/icons-material";
import { t } from "i18next";
import { useAddToCart } from "../../hooks/useDataFetch";
import { useDispatch } from "react-redux";
import { modalUserOpen } from "../../Store/Modal";

const ShoppingCartDrawer = ({
  open,
  onClose,
  variants,
  productId,
  addToWishlist,
}) => {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [currentQuantity, setCurrentQuantity] = useState(0);
  const [cart, setCart] = useState([]);
  const [selectedVariants, setSelectedVariants] = useState([]);

  const handleVariantChange = (
    variantType,
    optionIndex,
    price,
    option,
    stock
  ) => {
    const newSelectedVariants = selectedVariants.filter(
      (item) => item.variant !== variantType
    );

    newSelectedVariants.push({
      variant: variantType,
      optionIndex,
      price,
      option,
      stock,
    });

    setSelectedVariants(newSelectedVariants);
  };

  const calculateTotalPrice = (selectedVariants) => {
    let totalPrice = 0;

    selectedVariants.forEach((variant) => {
      totalPrice += variant.price;
    });

    totalPrice *= currentQuantity;

    return totalPrice;
  };

  const handleIndex = (variantType, option) => {
    const selectedVariant = selectedVariants.find(
      (item) => item.variant === variantType && item.option === option
    );
    return selectedVariant;
  };
  const onSuccess = () => {
    dispatch(
      modalUserOpen({
        message: "product.modal_data.success_add_cart",
        image: "/assets/img/Shopping-bag.svg",
        modalType: "cart",
      })
    );
  };

  const { isLoading, mutate: addToCart } = useAddToCart(onSuccess);

  const addToCartProduct = () => {
    if (selectedVariants.length === variants.length) {
      const data = {
        productId: productId,
        variants: selectedVariants,
        price: calculateTotalPrice(selectedVariants),
        quantity: currentQuantity,
      };

      addToCart(data);
      setCart([...cart, data]);
      setSelectedVariants([]);
      setCurrentQuantity(0);

      console.log("Added to cart:", [...cart, data]);
    } else {
      alert(
        "Please select one option from each variant type before adding to cart."
      );
    }
  };

  return (
    <Drawer anchor="bottom" open={open} onClose={onClose}>
      <Box
        style={{
          width: "100%",
          background: "black",
          marginBottom: "56px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            width: "95%",
            padding: 2,
            position: "relative",
            background: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #ccc",
          }}
        >
          <Box>
            <Typography>Shopping Cart Content</Typography>
          </Box>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            width: "95%",
            padding: 2,
            position: "relative",
            background: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #ccc",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              p: 1,
            }}
          >
            <Typography>Quantity</Typography>
          </Box>
          <Stack
            direction={"row"}
            alignItems={"center"}
            sx={{ justifyContent: "space-between" }}
          >
            <Box width={100}>
              <FormControl fullWidth>
                <Stack direction={"row"} spacing={2} alignItems={"center"}>
                  <IconButton
                    sx={{ padding: "0" }}
                    onClick={() =>
                      setCurrentQuantity((prevQuantity) =>
                        prevQuantity > 0 ? prevQuantity - 1 : 0
                      )
                    }
                    disabled={currentQuantity === 0}
                  >
                    <IndeterminateCheckBoxOutlined className="icon-green" />
                  </IconButton>
                  <Typography>{currentQuantity}</Typography>
                  <IconButton
                    sx={{ padding: "0" }}
                    onClick={() =>
                      setCurrentQuantity((prevQuantity) =>
                        prevQuantity < 30 ? prevQuantity + 1 : prevQuantity
                      )
                    }
                    disabled={
                      currentQuantity === 30 ||
                      currentQuantity ===
                        Math.min(
                          selectedVariants[0]?.stock,
                          selectedVariants[1]?.stock
                        )
                    }
                  >
                    <AddBoxOutlined className="icon-green" />
                  </IconButton>
                </Stack>
              </FormControl>
            </Box>
          </Stack>
        </Box>
        {variants?.length > 0 && (
          <Box
            sx={{
              width: "95%",
              padding: 2,
              position: "relative",
              background: "white",
              borderBottom: "1px solid #ccc",
            }}
          >
            <Box>
              <Typography>Variant</Typography>
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row", // Render variant options below variant name
                alignItems: "center", // Center the content
                marginTop: 2,
              }}
            >
              {variants?.length > 0 &&
                variants?.map((variant, variantIndex) => {
                  return (
                    <Box
                      key={variantIndex}
                      sx={{ marginBottom: 2, width: "100%" }}
                    >
                      <Box
                        sx={{
                          width: "50%",
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{
                            marginBottom: 1,
                            fontSize: "17px",
                            fontWeight: 500,
                          }}
                        >
                          {variant.variant}
                        </Typography>
                      </Box>
                      <FormControl>
                        <Stack direction="row" spacing={1}>
                          {
                            <Button
                              key={variantIndex}
                              disabled={variant.stock === 0}
                              onClick={() =>
                                handleVariantChange(
                                  variant.variant,
                                  variantIndex,
                                  variant.price,
                                  variant.option,
                                  variant.stock
                                )
                              }
                              className={
                                handleIndex(variant.variant, variant.option)
                                  ? "product__variant__active"
                                  : "product__variant"
                              }
                              variant="outlined"
                              sx={{
                                maxWidth: 140,
                                borderRadius: "25px",
                              }}
                            >
                              {variant.option}
                            </Button>
                          }
                        </Stack>
                      </FormControl>
                    </Box>
                  );
                })}
            </Box>
          </Box>
        )}

        <Box
          sx={{
            width: "95%",
            padding: 2,
            position: "relative",
            background: "white",
            borderBottom: "1px solid #ccc",
          }}
        >
          <Box>
            <Typography color="#00000082">Total amount</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              mt: 1,
            }}
          >
            <EuroIcon color="primary" />
            <Typography
              color="primary"
              sx={{
                mx: 2,
                fontSize: "18px",
              }}
            >
              124.34
            </Typography>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-around",
              marginTop: 2,
            }}
          ></Box>
        </Box>
        <Box
          sx={{
            width: "95%",
            padding: 2,
            position: "relative",
            background: "white",
            borderBottom: "1px solid #ccc",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            size={isMobile ? "small" : "large"}
            className={"product__action__btn"}
            endIcon={<ShoppingBagIcon />}
            variant="outlined"
            sx={{ fontWeight: 500, padding: 2, maxWidth: "48%" }}
            onClick={() => addToCartProduct()}
          >
            {t("product.btn_add_to_cart")}
          </Button>
          <Button
            size={isMobile ? "small" : "large"}
            variant="outlined"
            className={"product__action__btn"}
            endIcon={<FavoriteBorder />}
            sx={{ fontWeight: 500, padding: 2, maxWidth: "48%" }}
            onClick={() => addToWishlist()}
          >
            {t("product.btn_add_wishlist")}
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default ShoppingCartDrawer;
