import { DECIMAL_POINT, LOCALE, OPTIONS } from "./config.mjs";

export const formatNumber = (numberAsString = "") => {
    // First we check if the numberAsString ends with DECIMAL
    if (numberAsString.endsWith(DECIMAL_POINT)) {
        return Number(numberAsString.slice(0, -1)).toLocaleString(LOCALE, OPTIONS).concat(".");
    }
    return Number(numberAsString).toLocaleString(LOCALE, OPTIONS);
}