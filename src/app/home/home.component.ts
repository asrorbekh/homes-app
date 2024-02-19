import {Component, inject} from '@angular/core';
import {HousingLocationComponent} from "../housing-location/housing-location.component";
import {HousingLocation} from "../housing-location/housing-location";
import {HousingService} from "../housing.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HousingLocationComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  housingLocationList: HousingLocation[] = [];
  filteredLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);

  constructor() {
    this.housingService.getAllHousingLocation().subscribe({
      next: (response: any) => {
        if (response.length){
          this.housingLocationList = response as HousingLocation[];
          this.filteredLocationList = response as HousingLocation[];
        }
      },
      error: (error) => {
        console.log('Error: ' + error);
      }
    });
  }

  filterResults(value: string) {
    if (!value) this.filteredLocationList = this.housingLocationList;

    this.filteredLocationList = this.housingLocationList.filter(housingLocation => housingLocation.name.toLowerCase().includes(value.toLowerCase()));
  }

  onSubmit(event: SubmitEvent) {
    event.preventDefault();

    this.filterResults((event.target as any).filter.value);
  }
}
