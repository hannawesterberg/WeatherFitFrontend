export interface Preferences //Interface used to GET the latest preference 
{
  //We want to fetch the following from the DB 
   preference_id: number; 
   user_id: number;
   activity: string;
   thermal_preference: string;


}
export interface CreatePreferences //Interface used to create a new preference 
{
  //We want to fetch the following from the DB 
   activity: string;
   thermal_preference: string;


}

export interface UserContext {
  userId: number;  // Adjust the type according to your actual usage
}