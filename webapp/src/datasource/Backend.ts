import axios, { AxiosRequestConfig } from 'axios'
import JSEncrypt from 'jsencrypt'
import Booking from './models/Booking'
import FooterData from './models/FooterData'
import InformationPageData from './models/InformationPageData'
import InformationPageGalleryBottomData from './models/InformationPageGalleryBottomData'
import NavbarData from './models/NavbarData'
import PageMetadata from './models/PageMetadata'
import Session from './security/Session'
import User from './security/User'

export default class Backend {
    private static postAxiosConfig(endpoint: string, body: string, isExpress: boolean) {
        if (process.env.REACT_APP_BACKEND_API_KEY) {
            return {
                baseURL: isExpress ? process.env.REACT_APP_BACKEND_API_ENDPOINT! : `http://localhost:${process.env.REACT_APP_EXPRESS_PORT}`,
                endpoint: endpoint,
                method: 'POST',
                params: {
                    code: isExpress ? process.env.REACT_APP_BACKEND_API_KEY : '',
                },
                data: body,
            }
        } else {
            return {
                baseURL: isExpress ? process.env.REACT_APP_BACKEND_API_ENDPOINT! : `http://localhost:${process.env.REACT_APP_EXPRESS_PORT}`,
                endpoint: endpoint,
                method: 'POST',
                data: body,
            }
        }
    }

    private static getAxiosConfig(endpoint: string, isExpress: boolean): AxiosRequestConfig {
        if (process.env.REACT_APP_BACKEND_API_KEY) {
            return {
                baseURL: isExpress ? process.env.REACT_APP_BACKEND_API_ENDPOINT! : `http://localhost:${process.env.REACT_APP_EXPRESS_PORT}`,
                url: endpoint,
                method: 'GET',
                params: {
                    code: isExpress ? process.env.REACT_APP_BACKEND_API_KEY : '',
                },
            }
        } else {
            return {
                baseURL: isExpress ? process.env.REACT_APP_BACKEND_API_ENDPOINT! : `http://localhost:${process.env.REACT_APP_EXPRESS_PORT}`,
                url: endpoint,
                method: 'GET',
            }
        }
    }

    public static async getPagesMetadata(isExpress: boolean = false): Promise<[PageMetadata]> {
        const response = await axios(this.getAxiosConfig('getPagesMetadata', isExpress))
        return response.data
    }

    public static async getFooter(isExpress: boolean = false): Promise<FooterData> {
        const response = await axios(this.getAxiosConfig('getFooterData', isExpress))
        return response.data
    }

    public static async getNavbar(isExpress: boolean = false): Promise<NavbarData> {
        const response = await axios(this.getAxiosConfig('getNavbarData', isExpress))
        return response.data
    }

    public static async getInformationPageData(
        pageName: string,
        isExpress: boolean = false
    ): Promise<InformationPageData> {
        const axiosConfig = this.getAxiosConfig('getInformationPageData', isExpress)
        axiosConfig.params = {
            ...axiosConfig.params,
            pageName: pageName,
        }
        const response = await axios(axiosConfig)
        return response.data
    }

    public static async getInformationPageGalleryBottomData(
        pageName: string,
        isExpress: boolean = false
    ): Promise<InformationPageGalleryBottomData> {
        const axiosConfig = this.getAxiosConfig(
            'getInformationPageGalleryBottomData'
            , isExpress
        )
        axiosConfig.params = {
            ...axiosConfig.params,
            pageName: pageName,
        }
        const response = await axios(axiosConfig)
        return response.data
    }

    public static async sendJsonToValidation(
        request: unknown,
        isExpress: boolean = false
    ): Promise<string> {
        const axiosConfig = this.postAxiosConfig(
            'validateJson',
            JSON.stringify(request)
            , isExpress
        )
        const response = await axios(axiosConfig)
        return response.data
    }

    public static async updateJson(request: unknown, isExpress: boolean = false): Promise<string> {
        const axiosConfig = this.postAxiosConfig(
            'updateJson',
            JSON.stringify(request), isExpress
        )
        const response = await axios(axiosConfig)
        return response.data
    }

    public static async createJson(request: unknown, isExpress: boolean = false): Promise<string> {
        const axiosConfig = this.postAxiosConfig(
            'createJson',
            JSON.stringify(request), isExpress
        )
        const response = await axios(axiosConfig)
        return response.data
    }

    public static async createSession(request: User, isExpress: boolean = false): Promise<Session> {
        const data = JSON.stringify(request)
        const jsencrypt = new JSEncrypt()
        const publicKey = String(process.env.REACT_APP_SECURITY_PUBLIC_KEY!)
        jsencrypt.setPublicKey(publicKey)
        const encryptedData = jsencrypt.encrypt(data)
        if (typeof encryptedData === 'boolean') {
            throw 'The username and password combination encryption faced internal problem.'
        } else {
            const axiosConfig = this.postAxiosConfig(
                'createSession',
                encryptedData,
                isExpress
            )
            const response = await axios(axiosConfig)
            return response.data
        }
    }

    public static async refreshSession(session: Session, isExpress: boolean = false): Promise<Session> {
        const data = JSON.stringify(session)
        const jsencrypt = new JSEncrypt()
        const publicKey = String(process.env.REACT_APP_SECURITY_PUBLIC_KEY!)
        jsencrypt.setPublicKey(publicKey)
        const encryptedData = jsencrypt.encrypt(data)
        if (typeof encryptedData === 'boolean') {
            throw 'The username and password combination encryption faced internal problem.'
        } else {
            const axiosConfig = this.postAxiosConfig(
                'refreshSession',
                encryptedData
                , isExpress
            )
            const response = await axios(axiosConfig)
            return response.data
        }
    }

    public static async getBookings(isExpress: boolean = false): Promise<[Booking]> {
        const response = await axios(this.getAxiosConfig('getBookings', isExpress))
        return response.data
    }
}
