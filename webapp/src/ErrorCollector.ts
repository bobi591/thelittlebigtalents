import App from "./App";


export class ErrorCollectionPair {
    public instance!: App;
    public function!: (error: any) => void;
}

export default class ErrorCollector {
    private static errors: any[] = [];
    private static errorNotificationFunc: ErrorCollectionPair;

    public static setErrorNotificationFunc(errorCollector: ErrorCollectionPair) {
        if(this.errorNotificationFunc === undefined) {
            this.errorNotificationFunc = errorCollector;
        }
    }

    public static addError(error:string) {
        console.log('An error has been collected: ' + error);
        ErrorCollector.errors.push(error);
        if(this.errorNotificationFunc !== undefined) {
            this.errorNotificationFunc.function.call(this.errorNotificationFunc.instance, error);
        }
    }
    
    public static getLatestError() {
        console.log(ErrorCollector.errors);
        if(ErrorCollector.errors.length > 0) {
            return ErrorCollector.errors.at(ErrorCollector.errors.length-1);
        }
    }
}