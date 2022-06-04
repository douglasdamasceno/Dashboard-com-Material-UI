import { useRef } from "react";
import { VFormHandles } from "./VFormHandles";

export const useVForm = () => {
    const formRef = useRef<VFormHandles>(null);
    return {formRef};
}