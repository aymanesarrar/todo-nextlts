"use client";
import { MdLogout } from "react-icons/md";
import { logout } from "../signup/actions";
export const Logout = () => {
    return (
      <div onClick={() => logout()}>
        <MdLogout className="font-bold text-xl cursor-pointer" />
      </div>
    );
}