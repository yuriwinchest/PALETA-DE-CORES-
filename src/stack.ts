import { StackClientApp } from "@stackframe/react";

export const stack = new StackClientApp({
    projectId: import.meta.env.VITE_STACK_PROJECT_ID || process.env.NEXT_PUBLIC_STACK_PROJECT_ID || "",
    publishableClientKey: import.meta.env.VITE_STACK_PUBLISHABLE_CLIENT_KEY || process.env.NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY || "",
    tokenStore: "cookie",
});
