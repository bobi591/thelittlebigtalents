import axios, { AxiosRequestConfig } from "axios";
import FooterData from "./models/FooterData";
import NavbarData from "./models/NavbarData";
import InformationPageData from "./models/InformationPageData";
import InformationPageGalleryBottomData from "./models/InformationPageGalleryBottomData";
import User from "./security/User";
import { Session } from "inspector";

export default class Backend {

    private static postAxiosConfig(endpoint: string, body: any) {
        return {
            url: process.env.REACT_APP_BACKEND_API_ENDPOINT! + endpoint,
            method: 'POST',
            params: {
                code: process.env.REACT_APP_BACKEND_API_KEY
            },
            data: body
        }
    }

    private static getAxiosConfig(endpoint: string) : AxiosRequestConfig {
        return {
            url: process.env.REACT_APP_BACKEND_API_ENDPOINT! + endpoint,
            method: 'GET',
            params: {
                code: process.env.REACT_APP_BACKEND_API_KEY
            }
        }
    }

    public static async getFooter() : Promise<FooterData | undefined> {
        const response = await axios(this.getAxiosConfig("getFooterData"));
        return response.data;
    }

    public static async getNavbar() : Promise<NavbarData | undefined> {
        const response = await axios(this.getAxiosConfig("getNavbarData"));
        return response.data;
    }

    public static async getInformationPageData(pageName:string) : Promise<InformationPageData | undefined> {
        const axiosConfig = this.getAxiosConfig("getInformationPageData");
        axiosConfig.params = {
            ...axiosConfig.params,
            pageName: pageName
        }
        const response = await axios(axiosConfig);
        return response.data;
    }

    public static async getInformationPageGalleryBottomData(pageName:string) : Promise<InformationPageGalleryBottomData | undefined> {
        const axiosConfig = this.getAxiosConfig("getInformationPageGalleryBottomData");
        axiosConfig.params = {
            ...axiosConfig.params,
            pageName: pageName
        }
        const response = await axios(axiosConfig);
        return response.data;
    }

    public static async sendJsonToValidation(request:any) : Promise<string | undefined> {
        const axiosConfig = this.postAxiosConfig("validateJson", request);
        const response = await axios(axiosConfig);
        return response.data;
    }

    public static async createSession(request: User) : Promise<Session | undefined> {
        const axiosConfig = this.postAxiosConfig("createSession", request);
        const response = await axios(axiosConfig);
        return response.data;
    } 
}