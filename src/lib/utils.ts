import { iso1A3Code } from "@rapideditor/country-coder";

export const getCountryFromCoordinates = (
  longitude: number,
  latitude: number,
): string | null => {
  try {
    const country: string | null = iso1A3Code([longitude, latitude], {
      level: "territory",
    });
    return country;
  } catch (error) {
    console.error("Error converting coordinates:", error);
    throw error;
  }
};
