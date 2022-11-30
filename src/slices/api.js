export const url = "http://https://backend-scanneame-production.up.railway.app/api";

export const setHeaders = () => {
    const headers = {
        headers: {
            "x-auth-token": localStorage.getItem("token"),
        },
    };

    return headers;
};