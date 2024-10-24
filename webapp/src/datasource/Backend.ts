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
    private static postAxiosConfig(endpoint: string, body: string) {
        if (process.env.REACT_APP_BACKEND_API_KEY) {
            return {
                url: process.env.REACT_APP_BACKEND_API_ENDPOINT! + endpoint,
                method: 'POST',
                params: {
                    code: process.env.REACT_APP_BACKEND_API_KEY,
                },
                data: body,
            }
        } else {
            return {
                url: process.env.REACT_APP_BACKEND_API_ENDPOINT! + endpoint,
                method: 'POST',
                data: body,
            }
        }
    }

    private static getAxiosConfig(endpoint: string): AxiosRequestConfig {
        if (process.env.REACT_APP_BACKEND_API_KEY) {
            return {
                url: process.env.REACT_APP_BACKEND_API_ENDPOINT! + endpoint,
                method: 'GET',
                params: {
                    code: process.env.REACT_APP_BACKEND_API_KEY,
                },
            }
        } else {
            return {
                url: process.env.REACT_APP_BACKEND_API_ENDPOINT! + endpoint,
                method: 'GET',
            }
        }
    }

    public static async getPagesMetadata(): Promise<[PageMetadata]> {
        const response = await axios(this.getAxiosConfig('getPagesMetadata'))
        return response.data
    }

    public static async getFooter(): Promise<FooterData> {
        const response = await axios(this.getAxiosConfig('getFooterData'))
        return response.data
    }

    public static async getNavbar(): Promise<NavbarData> {
        const response = await axios(this.getAxiosConfig('getNavbarData'))
        return response.data
    }

    public static async getInformationPageData(
        pageName: string
    ): Promise<InformationPageData> {
        const axiosConfig = this.getAxiosConfig('getInformationPageData')
        axiosConfig.params = {
            ...axiosConfig.params,
            pageName: pageName,
        }
        const response = await axios(axiosConfig)
        return response.data
    }

    public static async getInformationPageGalleryBottomData(
        pageName: string
    ): Promise<InformationPageGalleryBottomData> {
        const axiosConfig = this.getAxiosConfig(
            'getInformationPageGalleryBottomData'
        )
        axiosConfig.params = {
            ...axiosConfig.params,
            pageName: pageName,
        }
        const response = await axios(axiosConfig)
        return response.data
    }

    public static async sendJsonToValidation(
        request: unknown
    ): Promise<string> {
        const axiosConfig = this.postAxiosConfig(
            'validateJson',
            JSON.stringify(request)
        )
        const response = await axios(axiosConfig)
        return response.data
    }

    public static async updateJson(request: unknown): Promise<string> {
        const axiosConfig = this.postAxiosConfig(
            'updateJson',
            JSON.stringify(request)
        )
        const response = await axios(axiosConfig)
        return response.data
    }

    public static async createJson(request: unknown): Promise<string> {
        const axiosConfig = this.postAxiosConfig(
            'createJson',
            JSON.stringify(request)
        )
        const response = await axios(axiosConfig)
        return response.data
    }

    public static async createSession(request: User): Promise<Session> {
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
                encryptedData
            )
            const response = await axios(axiosConfig)
            return response.data
        }
    }

    public static async refreshSession(session: Session): Promise<Session> {
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
            )
            const response = await axios(axiosConfig)
            return response.data
        }
    }

    public static async getBookings(): Promise<[Booking]> {
        const response = await axios(this.getAxiosConfig('getBookings'))
        return response.data
    }
}
