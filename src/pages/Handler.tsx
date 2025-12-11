import { StackHandler } from "@stackframe/react";
import { stack } from "../stack";

export default function Handler() {
    return <StackHandler app={stack} fullPage={true} />;
}
