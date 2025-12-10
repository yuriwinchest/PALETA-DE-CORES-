import { Stack } from "@stackframe/react";

export const stack = new Stack({
    projectId: import.meta.env.VITE_STACK_PROJECT_ID || process.env.NEXT_PUBLIC_STACK_PROJECT_ID || "",
    apiKey: import.meta.env.VITE_STACK_PUBLISHABLE_CLIENT_KEY || process.env.NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY || "",
    tokenStore: "localStorage",
});
