import { createContext } from "react";
import { LeadsState } from "../types";

const AuthContext = createContext<LeadsState | undefined>(undefined);
export default AuthContext;
