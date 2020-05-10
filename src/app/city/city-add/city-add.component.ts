import { Component, OnInit } from "@angular/core";
import { CityService } from "../../services/city.service";
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { City } from "../../models/city";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-city-add",
  templateUrl: "./city-add.component.html",
  styleUrls: ["./city-add.component.css"],
  providers: [CityService]
})
export class CityAddComponent implements OnInit {
  constructor(
    private cityService: CityService,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  city: City;
  cityAddForm: FormGroup;

  createCityForm() {
    this.cityAddForm = this.formBuilder.group({
      name: ["", Validators.required],
      description: ["", Validators.required]
    });
  }

  ngOnInit() {
    this.createCityForm();
  }

  add() {
    if (this.cityAddForm.valid) {
      this.city = Object.assign({}, this.cityAddForm.value)
      this.city.userId = this.authService.getCurrentUserId(); //Todo
      this.cityService.add(this.city);
    }
  }
}