"use client";
import dynamic from "next/dynamic";
​
// This component is now safe to use in Next
// It wraps "BrowserComponent" to turn it into a Client Component
export const ClientComponent = dynamic(
  () => import("./helpers/screenSize")
    // this part is needed if your use a named export
    // you can replace by ".default" when using a default export
    .then((mod) => mod.default),
  {
    // This prevents server-side rendering of BrowserComponent
    ssr: false,
  }
);