import { auth } from "@/auth";

export async function getUserSession() {
  const session = await auth();
  return session;
}
