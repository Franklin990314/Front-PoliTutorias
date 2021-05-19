import { Component, OnInit } from '@angular/core';
import { Tutorial } from 'src/app/models/tutorial';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  public tutorial: Tutorial;
  public courses: string[] = ['Desarrollo Web', 'Ingles Basico 1', 'Paradigmas', 'Pensamiento Algortimico'];
  private userSession: User;
  
  constructor() { }

  ngOnInit(): void {
    this.userSession = JSON.parse(sessionStorage.getItem("userData"));
  }

  submit(): void {

  }

}