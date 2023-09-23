export default class FooterData {
    contacts: Contacts;
    workingHours: WorkingHours;
    facebookUrl: string;
    instagramUrl: string;
    tiktokUrl: string;
    youtubeUrl: string;
    constructor(contacts: Contacts, workingHours: WorkingHours, facebookUrl:string, instagramUrl:string, tiktokUrl:string, youtubeUrl:string){
        this.contacts = contacts;
        this.workingHours = workingHours;
        this.facebookUrl = facebookUrl;
        this.instagramUrl = instagramUrl;
        this.tiktokUrl = tiktokUrl;
        this.youtubeUrl = youtubeUrl;
    }
}

class Contacts {
    phone: string;
    email: string;
    constructor(phone:string, email:string){
        this.phone = phone;
        this.email = email;
    }
}

class WorkingHours {
    hours: [string];
    constructor(hours:[string]){
        this.hours = hours;
    }
}