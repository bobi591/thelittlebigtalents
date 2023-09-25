import axios, { AxiosRequestConfig } from "axios";
import FooterData from "./models/FooterData";
import NavbarData from "./models/NavbarData";
import InformationPageData from "./models/InformationPageData";
import InformationPageGalleryBottomData from "./models/InformationPageGalleryBottomData";
import ErrorCollector from "../ErrorCollector";

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
        try {
            const response = await axios(this.getAxiosConfig("getFooterData"));
            return response.data;
        }
        catch(error) {
            ErrorCollector.addError(String(error));
        }
    }

    public static async getNavbar() : Promise<NavbarData | undefined> {
        try {
            const response = await axios(this.getAxiosConfig("getNavbarData"));
            return response.data;
        }
        catch(error) {
            ErrorCollector.addError(String(error));
        }
    }

    public static async getInformationPageData(pageName:string) : Promise<InformationPageData | undefined> {
        try {
            const axiosConfig = this.getAxiosConfig("getInformationPageData");
            axiosConfig.params = {
                ...axiosConfig.params,
                pageName: pageName
            }
            const response = await axios(axiosConfig);
            return response.data;
        }
        catch(error) {
            ErrorCollector.addError(String(error));
        }
    }

    public static async getInformationPageGalleryBottomData(pageName:string) : Promise<InformationPageGalleryBottomData | undefined> {
        try {
            const axiosConfig = this.getAxiosConfig("getInformationPageGalleryBottomData");
            axiosConfig.params = {
                ...axiosConfig.params,
                pageName: pageName
            }
            const response = await axios(axiosConfig);
            return response.data;
        }
        catch(error) {
            ErrorCollector.addError(String(error));
        }
    }

    public static async sendJsonToValidation(request:any) : Promise<string | undefined> {
        try {
            const axiosConfig = this.postAxiosConfig("validateJson", request);
            const response = await axios(axiosConfig);
            return response.data;
        }
        catch(error: any) {
            ErrorCollector.addError(String(error.response.data));
        }
    }
}