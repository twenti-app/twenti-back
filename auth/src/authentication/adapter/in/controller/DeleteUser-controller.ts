import {CODE_OK} from "../../../../shared/enums/Errors";
import {ErrResponseService} from "../../../../shared/errors/ErrorService";
import {isOwner} from "../../../../shared/middleware/IsOwner";
import {DefaultController} from "../../../../shared/objectUtils/DefaultController";
import {DeleteUserService} from "../../../application/service/DeleteUser-service";

export class DeleteUserController extends DefaultController {
    private deleteUserService: DeleteUserService;

    constructor() {
        super();
        this.deleteUserService = new DeleteUserService();
    }

    public deleteUser() {
        return this.router.delete('/:uid', isOwner, async (req, res) => {
            this.defaultErrData();
            const data: any = await this.deleteUserService.deleteUser(req.params.uid);

            if (data.err) this.setErrData(data.err);
            const resp = this.err.statusCode === CODE_OK ? data : ErrResponseService(this.err);
            return res.status(this.err.statusCode).send(resp);
        });
    }
}