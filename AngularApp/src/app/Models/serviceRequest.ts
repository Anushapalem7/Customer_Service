export class serviceRequest {
    id: number = 0;
    title : string = "";
    reuestDetails : string ="";
    reqType : string = "";
    assignedTo : number = 0;
    status : string="";
    requestedBy : number = 0;
    requestedByName : string | undefined = "";
    assignedToName : string | undefined = "";
    requestDate:Date = new Date;
}