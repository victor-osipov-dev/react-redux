import { QueryClient } from "@tanstack/react-query";

const baseUrl = "http://localhost:3000";

export const queryClient = new QueryClient();
export const baseFetch = (url: string, init?: RequestInit) => {
    return fetch(baseUrl + "/" + url, init).then((response) => response.json());
};
