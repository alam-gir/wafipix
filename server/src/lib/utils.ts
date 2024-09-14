import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const originsStr = process.env.ORIGIN as string;

export const origins: string[] = originsStr?.split(",").filter(Boolean) || ["*"];

// get slug from string, if any . or ? or ! or , or any icon or space replace with -

export const getSlug =  (str: string) => {
  return str?.trim()
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+/g, "-") // replace any non alpha numeric with -
    .replace(/-+/g, "-")  // if - is more then one replace with one -
    .replace(/^-/, "")  // if - at the start remove it
    .replace(/-$/, "");   // if - at the end remove it
};


export const bgWorker = (fn: any, interval: number) => {
  try {
    setTimeout(async () => {
      await fn();
    }, interval);
  } catch (error) {
    console.log("background work error", error);
  }
};
