import {Get, JsonController} from "routing-controllers";

@JsonController()
export class StatusController {
    @Get("/")
    getStatus() {
        return "Hello"
    }
}