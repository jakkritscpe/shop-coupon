import { headers } from "next/headers";
import axios from "axios";

export async function getOrigin(): Promise<string> {
  const headersList = await headers();
  const host =
    headersList.get("x-forwarded-host") ||
    headersList.get("host") ||
    "localhost:3000";
  const protocol = headersList.get("x-forwarded-proto") || "http";
  return `${protocol}://${host}`;
}

export async function getConfig(name: string): Promise<string | null> {
  const origin = await getOrigin();
  try {
    const response = await axios.get(`${origin}/api/config?name=${name}`);
    return response.data?.configs?.value || null;
  } catch (error: any) {

    if (axios.isAxiosError(error)) {
      console.log(`Error fetching config '${name}':`, error.response?.status, error.response?.data);
    } else {
      console.error(`Unexpected error fetching config '${name}':`, error);
    }
    
    return null;
  }
}
