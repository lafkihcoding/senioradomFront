import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {PositionServiceService} from "../service/position-service.service";
import {Observable} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {Position} from "../service/position";

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit {

  position: any = {};
  position1: any;
  position2: any;
  counterSelection: number = 0;
  distance: number = 0;
  public displayedColumns = ['checked', 'id', 'latitude', 'longitude', 'action'];
  public dataSource = new MatTableDataSource<Position>();

  constructor(private positionservice: PositionServiceService, private formBuilder: FormBuilder) {
  }

  myForm = this.formBuilder.group({
    latitude: ['', [
      Validators.required, // Validators
      Validators.max(1000000)
    ]],
    longitude: ['', [
      Validators.required, // Validators
      Validators.max(1000000)
    ]],
  });

  ngOnInit(): void {
    this.getAllpositions();

  }

  calculateDistance() {
    this.positionservice.calculate(this.position1.latitude, this.position1.longitude, this.position2.latitude, this.position2.longitude).subscribe(
      (data) => {
        this.distance = data;
      });
  }

  calculate(element: any) {
    this.counterSelection += 1;
    if (this.counterSelection <= 2) {
      if (this.counterSelection === 1 && !element.checked) {
        this.position2 = element;
      }
      if (this.counterSelection === 2 && !element.checked) {
        this.position1 = element;
      }
    } else {

      alert("You have to selection 2 positions only");
      this.counterSelection = 0;
      this.ngOnInit();
    }

  }

  addingPosition() {
    this.position.latitude = this.myForm.get('latitude')?.value;
    this.position.longitude = this.myForm.get('longitude')?.value;
    this.positionservice.createPosition(this.position).subscribe(
      () => {
        this.getAllpositions();
      }
    );
  }

  deletePosition(e: any) {
    this.positionservice.deletePosition(e.latitude, e.longitude).subscribe(
      (data) => {
        this.getAllpositions();
      });
  }

  getAllpositions() {
    this.positionservice.getAllPositions().subscribe(
      (data) => {
        this.dataSource.data = data;
      });

  }
}
