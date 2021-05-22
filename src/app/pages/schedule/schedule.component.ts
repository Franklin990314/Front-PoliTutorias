import { Component, OnInit } from '@angular/core';
import { Parameter } from 'src/app/models/parameter';
import { Tutorial } from 'src/app/models/tutorial';
import { User } from 'src/app/models/user';
import { ParameterService } from 'src/app/services/parameter.service';
import { TutorialService } from 'src/app/services/tutorial.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from 'src/app/app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  public tutorial: Tutorial = new Tutorial();
  public tutorialResponse: Tutorial = new Tutorial();
  public courses: Parameter = new Parameter();
  public instructors: Parameter = new Parameter();
  public days = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado'];
  private userSession: User;
  public closeModal: string;
  public registeredId: string;
  
  constructor(
    private router: Router,
    private parameterService: ParameterService,
    private tutorialService: TutorialService,
    private modalService: NgbModal,
    private appComponent: AppComponent
  ) { }

  ngOnInit(): void {
    this.userSession = JSON.parse(sessionStorage.getItem("userData"));
    this.tutorial.collegeCareer = sessionStorage.getItem("program");
    this.appComponent.setIsHome(false);

    this.parameterService.getCourses().subscribe(
      reponse => {
        this.courses = Object.assign(new Parameter(), reponse.body);
      }
    );
  }

  submit(content: any): void {
    console.log(this.tutorial)
    this.tutorialService.post(this.tutorial).subscribe(
      reponse => {
        this.tutorialResponse = Object.assign(new Tutorial(), reponse.body);
        this.registeredId = this.tutorialResponse.idString;
        this.openModal(content);
      }
    );
  }

  openModal(content: any){
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
      this.tutorial = new Tutorial();
      this.ngOnInit();
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }

  onChange(): void {
    this.parameterService.getInstructors(this.tutorial.course).subscribe(
      reponse => {
        this.instructors = Object.assign(new Parameter(), reponse.body);
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  routerHome() {
    this.router.navigateByUrl("/home")
  }

}