import axios from "axios";
import { useEffect, useState } from "react";

export const dynamicTranslate = (text: any) => {
  const [langCode, setLangCode] = useState("en");
  const [translatedText, setTranslatedText] = useState("");

  const apiKey =
    "trnsl.1.1.20240103T121732Z.9c679f3fdcaac0d3.47c4d54aa945b8bae58bb378b9ea75d5b8bb8c56";

  const items =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("currentLanguage")
      : null;

  useEffect(() => {
    if (items) {
      setLangCode(items);
    }
  }, [items]);

  useEffect(() => {
    const translateText = async () => {
      try {
        if (text) {
          const response = await axios.get(
            `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${apiKey}&text=${text}&lang=${langCode}`
          );

          setTranslatedText(response.data.text[0]);
        }
      } catch (error) {
        console.error("Error translating text:", error);
      }
    };

    translateText();
  }, [text, langCode, apiKey]);

  return translatedText;
};
