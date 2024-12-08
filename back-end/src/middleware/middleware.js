export const successResponse = (data = null) => ({success: true, data});
export const failedResponse =  (error = null) => ({success: false, error});