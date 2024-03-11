import axios from "axios";
import { IRound } from "./Types";
import { baseUrl } from "../Helpers/baseUrl";

export function numberWithCommas(x: number) {
  if (isNaN(x)) return;
  const newX = Number.isInteger(x) ? x : x.toFixed(2);
  return newX.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export const uploadImage = async (image: File | null) => {
  const data = new FormData();
  data.append("file", image as unknown as string);
  data.append("upload_preset", "products");
  data.append("cloud_name", "linconstore-test");
  try {
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/linconstore-test/image/upload",
      data,
      {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
        },
      }
    );
    const newData = response.data;
    return newData.secure_url;
  } catch (e) {
    console.log(e);
  }
};
export const uploadImages = async (images: FileList[]) => {
  const updatedImages: File[] = [];
  for (const image of images) {
    const data = new FormData();
    data.append("file", image as unknown as string);
    data.append("cloud_name", "linconstore-test");
    data.append("upload_preset", "products");
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/linconstore-test/image/upload",
        data,
        {
          headers: {
            "X-Requested-With": "XMLHttpRequest",
          },
        }
      );
      const newData = response.data;
      updatedImages.push(newData.secure_url);
    } catch (e) {
      console.log(e);
    }
  }
  return updatedImages;
};

export const uploadVideo = async (videos: any) => {
  const updatedVideoUrls: string[] = [];

  const formData = new FormData();

  for (let i = 0; i < videos.length; i++) {
    formData.append("videos", videos[i]);
  }

  formData.append("duration", "30"); // Add the default duration or get it from the user input

  try {
    const response = await axios.post(`${baseUrl}/upload-video`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const newData = response.data;
    if (newData.videoUrls && Array.isArray(newData.videoUrls)) {
      updatedVideoUrls.push(...newData.videoUrls);
    }
  } catch (e) {
    console.log(e);
  }

  return updatedVideoUrls;
};

export const checkIsViewed = async (userId, productId) => {
  const url = `${baseUrl}/chine-next?userId=${userId}&productId=${productId}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
};

export const fetchRecentProducts = async () => {
  try {
    const response = await axios.get(`${baseUrl}/products/recent`);
    return response.data;
  } catch (error) {
    console.error("Error fetching recent products:", error.message);
    throw error;
  }
};

export const getCineNames = async () => {
  const url = `${baseUrl}/cineNames`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching cineNames data:", error.message);
    throw error;
  }
};

export const getTotalLikesForProductId = (productId, data) => {
  const filteredData = data.filter((item) => item.productId === productId);
  const totalLikes = filteredData.reduce((sum, item) => sum + item.likes, 0);
  return totalLikes;
};

export const getTotalSharesForProductId = (productId, data) => {
  const filteredData = data.filter((item) => item.productId === productId);
  const totalShares = filteredData.reduce(
    (sum, item) => sum + item.shareCount,
    0
  );
  return totalShares;
};

export const getLikeAndShareCountsForProductId = (productId, data) => {
  const filteredData = data?.filter((item) => item.productId === productId);
  const result = filteredData?.reduce(
    (accumulator, item) => {
      accumulator.totalLikes += item.likes;
      accumulator.shareCount += item.shareCount;
      return accumulator;
    },
    {
      totalLikes: 0,
      shareCount: 0,
    }
  );

  return result;
};

export const countryList: string[] = [
  "Australia",
  "Austria",
  "Belgium",
  "Bulgaria",
  "Canada",
  "Croatia",
  "Cyprus",
  "Czech",
  "Denmark",
  "Estonia",
  "Finland",
  "France",
  "Germany",
  "Greece",
  "Hungary",
  "Ireland",
  "Italy",
  "Lithuania",
  "Luxembourg",
  "Mexico",
  "Netherland",
  "New Zealand",
  "Norway",
  "Poland",
  "Portugal",
  "Spain",
  "Sweden",
  "Switzerland",
  "United Kingdom",
  "United States",
];

export const round = (N: number): any => {
  const fixed = N.toFixed(0);
  const length = fixed.toString().length;
  if (length === 1) return N;
  const numerHolder: IRound[] = [
    {
      number: 2,
      dec: 10,
    },
    {
      number: 3,
      dec: 100,
    },
    {
      number: 4,
      dec: 1000,
    },
    {
      number: 5,
      dec: 100000,
    },
    {
      number: 6,
      dec: 1000000,
    },
  ];
  const round: IRound = numerHolder.find((num) => num.number === length);
  const ceil = Math.ceil(N / round.dec) * round.dec;
  let str = ceil.toString().slice(0, -3);
  return parseInt(str) + "k";
};

export function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const getHighestNumber = (number1: number, number2: number) => {
  if (number1 > number2) return number1;
  return number2;
};

export const getLowestStock = (number: number[]) => {
  return Math.min(...number);
};

export const formatNumber = (value: number) => {
  return value?.toFixed(1);
};

// concat if it is needed and country code exists
export const getLangPlusCountryCode = (
  {
    code,
    country,
    isConcatNeeded,
  }: { code: string; country?: string; isConcatNeeded?: boolean },
  ch: string = "-"
) => {
  return isConcatNeeded && country ? `${code}${ch}${country}` : code;
};
