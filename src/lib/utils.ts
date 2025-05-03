

import { headers } from "next/headers";
import axios from "axios";

export async function getOrigin(): Promise<string> {
    const headersList = await headers();
    const host = headersList.get("x-forwarded-host") || "localhost:3000";
    const protocol = headersList.get("x-forwarded-proto") || "http";
    
    return `${protocol}://${host}`;
}

export async function getConfig(name: string) {
    const origin = await getOrigin();
    const response = await axios.get(`${origin}/api/config?name=${name}`);

    if (!response.data) {
        return null;
    }

    if (response.data.configs) {
        return response.data.configs.value;
    }

    return null;
}