import axios from "axios";

// // hosting
// axios.defaults.baseURL = "http://34.170.53.225:5000"

// TODO update env variable in hosting
// testing
axios.defaults.baseURL = baseURL;

export async function postReq(localUrl, headers, data) {

    const fullUrl = "/api/v1" + localUrl;
    try {
        const response = await axios({
            url: fullUrl,
            method: "POST",
            headers: headers,
            data: data,
        });

        return response.data;
    } catch (error) {
        console.log(error);
        // throw error;
    }
}

// For email /passwordReset
// for update /updatePassword