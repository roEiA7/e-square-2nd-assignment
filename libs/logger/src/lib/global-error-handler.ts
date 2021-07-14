import { ErrorHandler, Injectable } from "@angular/core";
import { LoggerService } from "./services/logger.service";

@Injectable()
export class GlobalErrorhandler implements ErrorHandler {
    constructor(private loggerSerive: LoggerService) { }

    handleError(error: Error): void {
        this.loggerSerive.handleError(error);
    }
}