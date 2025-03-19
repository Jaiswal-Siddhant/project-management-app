import { Bounce, toast } from "react-toastify";

export const showToast = (msg: string) => {
    toast(msg, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    });
}