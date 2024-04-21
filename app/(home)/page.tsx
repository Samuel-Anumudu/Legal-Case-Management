import type { Metadata } from "next";
import Home from "../components/Home";

export default function IndexPage() {
  return <Home />;
}

export const metadata: Metadata = {
  title: "Ligu - Legal Case Management App",
  description: "A simple legal case management system",
};
