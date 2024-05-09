export interface Preferences 
{
   preference_id: number; 
   user_id: number;
   activity: string;
   thermal_preference: string;
}

export interface CreatePreferences 
{
   activity: string;

}

export interface UserContext {
  userId: number; 
}