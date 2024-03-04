import localFont from 'next/font/local';

export const whitney = localFont({
  src: [
    {
      path: "WhitneyHTF-Light.otf",
      weight: "400",
      style: "normal"
    },
    {
      path: "WhitneyHTF-Medium.otf",
      weight: "500",
      style: "normal"
    },
    {
      path: "WhitneyHTF-Bold.otf",
      weight: "700",
      style: "normal"
    },
  ],
  variable: "--font-whitney"
});

export const ginto = localFont({
  src: "Ginto-Bold.ttf",
  weight: "700",
  variable: "--font-ginto"
});
