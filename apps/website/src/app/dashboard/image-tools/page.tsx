import { redirect } from "next/navigation";

// /dashboard/image-tools → /dashboard/image-tools/resize
export default function ImageToolsIndexPage() {
  redirect("/dashboard/image-tools/resize");
}
