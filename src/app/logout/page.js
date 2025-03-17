import { logUserOut } from "@/lib/loginAPI";

export default async function Logout() {
  const logout = await logUserOut();
}
