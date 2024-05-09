import { Component,OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
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
    this.fetchData(); //Display message directly 
  }

  fetchData(): void {
    //SET VARIABLES: 
    const city = this.sessionService.getCity();
    const ctx = this.sessionService.getContext() as { userId: number }
    console.log('Fetching data for:', city, ctx.userId); // Debugging output to see if the right id and city is being stored

    if (city && ctx.userId) {
    this.apiService.getOutfitRecommendation(city, ctx.userId).subscribe({
      next: (response) => {
        this.data = response;
        console.log('Recommendation received:', response);
      },
      error: (error) => {
        console.error('Error fetching data:', error);
        this.data = null; 
      }
      });
  }
  else{
    console.error('City or User Email is not set');
  }
}
}
