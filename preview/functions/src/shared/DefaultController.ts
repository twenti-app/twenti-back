export class DefaultController {
  protected err: { status: string; statusCode: number; message: string; } | undefined;

  protected setErrData(dataErr: any, status = "Failure Request") {
    this.err = {
      status: status,
      statusCode: dataErr.statusCode,
      message: dataErr.message,
    };
  }

  protected defaultErrData() {
    this.err = {
      status: "Success Request",
      statusCode: 200,
      message: "",
    };
  }
}
