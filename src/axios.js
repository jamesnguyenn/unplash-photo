import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.unsplash.com/",
  headers: {
    Authorization: "Client-ID CcUIBCQCNfuuQH-kpVeBpgOS-UIiuQTOAY52c_DKiEs",
  },
});

export default instance;
