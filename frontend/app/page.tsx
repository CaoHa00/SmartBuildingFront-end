import { redirect } from "next/navigation";

export default function Page() {
  redirect("/block/1");
  return null;
}
