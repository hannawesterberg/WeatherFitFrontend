export interface Credentials
{
   email: string;
   password: string;

 }

 export interface LoginResponse {

  userId: number;  // Assuming the response contains a userId field
  // Add other response properties if there are any
}