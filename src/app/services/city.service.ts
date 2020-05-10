import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { City } from "../models/city";
import { Photo } from "../models/photo";
import { AlertifyService } from "./alertify.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class CityService {
  constructor(private httpClient: HttpClient,
    private alertifyService: AlertifyService,
    private router: Router) { }

  path = "https://localhost:44366/api/cities/";

  getCities(): Observable<City[]> {
    return this.httpClient.get<City[]>(this.path + "getcities");
  }
  getCityById(cityId): Observable<City> {
    return this.httpClient.get<City>(this.path + "detail/?id=" + cityId)
  }

  getPhotosByCity(cityId): Observable<Photo[]> {
    return this.httpClient.get<Photo[]>(this.path + "photos/?cityId=" + cityId);
  }

  add(city) {
    this.httpClient.post(this.path + 'add', city).subscribe(data => {
      this.alertifyService.success("City added successfully.")
      this.router.navigateByUrl('/cityDetail/' + data["id"])
    });
  }
}