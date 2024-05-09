export interface User
{
   name: string;
   email: string;
   password: string;
   activity: string;
   thermal_preference: string;

 }
 export interface SignUpResponse {

  userId: number;  
}

 export interface updateUser{

   name: string;
   email: string;
   password: string;

 }
