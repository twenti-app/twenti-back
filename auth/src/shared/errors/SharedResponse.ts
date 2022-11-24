import {DefaultClass} from "../objectUtils/DefaultClass";

export class SharedResponse<T> extends DefaultClass {
    status: string = '';
    code: number = 200;
    message: any = null;

    constructor(value?: any) {
        super();
        this.setProps(value);
    }
}