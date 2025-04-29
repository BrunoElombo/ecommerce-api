export const success = (data: any) => ({
    success: true,
    data,
  });
  
  export const error = (message = "") => ({
    success: false,
    message,
  });

  

  interface apiResponse{
    error:boolean,
    errors?:{
      message:string,
      field:string
    }[]
    data?:any
  }

  export const apiResponse=(error:apiResponse['error'], errors:apiResponse["errors"], data:apiResponse['data']=undefined)=>{
    return{
      error, errors, data
    }
  }