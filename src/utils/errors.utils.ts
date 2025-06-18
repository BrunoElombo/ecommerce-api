type ErrorList = {
  msg:string,
  field: string
}

export const errorMessage = async (errors:ErrorList[]) =>{
  return {
      error: true,
      errors
  }
}

export const apiResponse = async(error:boolean = true, errors:ErrorList[]|undefined, data:any=undefined) =>{
  return {
    error,
    errors,
    data
  }
}