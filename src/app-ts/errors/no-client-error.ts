export class NoClientError extends Error{

    constructor(message:any){
        if(message && typeof message === 'object') super(JSON.stringify(message));
        else super(message);
    }

}