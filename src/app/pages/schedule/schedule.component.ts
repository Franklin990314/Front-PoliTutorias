import { Component, OnInit } from '@angular/core';
import { Tutorial } from 'src/app/models/tutorial';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  public tutorial: Tutorial = new Tutorial;
  public courses = ['Seleccione','Desarrollo Web', 'Ingles Basico 1', 'Paradigmas', 'Pensamiento Algoritmico'];
  public instructors = ['Seleccione', 'Wilson Soto', 'Victor Pedraza', 'Gabriel Avila', 'Francisco Gonzalez','Juan Carlos Vargas'];
  days = [
    {id: 1, day: 'Lunes'},
    {id: 2, day: 'Martes'},
    {id: 3, day: 'Miercoles'},
    {id: 4, day: 'Jueves'},
    {id: 5, day: 'Viernes'},
    {id: 6, day: 'Sábado'}
  ];
  private userSession: User;
  
  constructor() { }

  ngOnInit(): void {
    this.userSession = JSON.parse(sessionStorage.getItem("userData"));
  }

  submit(): void {

  }

}