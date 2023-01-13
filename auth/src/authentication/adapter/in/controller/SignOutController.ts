import {DefaultController} from "../../../../shared/objectUtils/DefaultController";
import {SignOutService} from "../../../application/service/SignOut-service";
import {isOwner} from "../../../../shared/middleware/IsOwner";
import {CODE_OK} from "../../../../shared/enums/Errors";
import {ErrResponseService} from "../../../../shared/errors/ErrorService";

export class SignOutController extends DefaultController {
    private signOutService: SignOutService;

    constructor() {
        super();
        this.signOutService = new SignOutService();
    }

    signOut() {
        return this.router.get("/:uid", isOwner, async (req, res) => {
            this.defaultErrData();
            const data: any = await this.signOutService.signOut(req.params.uid);
            if (data.err) this.setErrData(data.err);
            const resp = this.err.statusCode === CODE_OK ? data : ErrResponseService(this.err);
            return res.status(this.err.statusCode).send(resp);
        });
    }
}