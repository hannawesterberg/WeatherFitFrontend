import { Component,OnInit,inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Recommendation } from "../../../model/recommendation.model";
import { ApiService } from "../../../api.service";
import { SessionService } from "../../../session.service";

@Component({
  selector: 'app-outfit',  
  standalone: true,
  imports:[CommonModule,
    HttpClientModule],
  templateUrl: './outfit.component.html',
  styleUrls: ['./outfit.component.css']
})

export class OutfitComponent implements OnInit {
  data: any = null;  // Initialize to null to check if data is received

  constructor(private apiService: ApiService, private sessionService: SessionService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {

    // Retrieve city and email from session service
    const city = this.sessionService.getCity();
    const userEmail = this.sessionService.getUserEmail();

    console.log('Fetching data for:', city, userEmail); // Debugging output to see if the right email and city is being stored

    if (city && userEmail) {
    this.apiService.getOutfitRecommendation(city, userEmail).subscribe({
      next: (response) => {
        this.data = response;
        console.log('Recommendation received:', response);
      },
      error: (error) => {
        console.error('Error fetching data:', error);
        this.data = null; // Reset or handle error state appropriately
      }
      });
  }
  else{
    console.error('City or User Email is not set');
      // Handle the case where city or email is not available
  }
}

}
