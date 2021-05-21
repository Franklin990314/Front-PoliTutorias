import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Tutorial } from 'src/app/models/tutorial';
import { Tutorials } from 'src/app/models/tutorials';
import { User } from 'src/app/models/user';
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-petition',
  templateUrl: './petition.component.html',
  styleUrls: ['./petition.component.css']
})
export class PetitionComponent implements OnInit {

  public currentTutorial: Tutorial = new Tutorial();
  public updateTutorial: Tutorial = new Tutorial();
  public tutorialSet: Tutorial[];
  public tutorials: Tutorials = new Tutorials();
  private userSession: User;
  public closeModal: string;
  public days = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado'];
  public statusSet = ['Devuelta por Alumno', 'Agendada', 'Finalizada'];

  constructor(
    private router: Router,
    private tutorialService: TutorialService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.userSession = JSON.parse(sessionStorage.getItem("userData"));
    this.tutorialService.getAll().subscribe(
      reponse => {
        this.tutorials = Object.assign(new Tutorials(), reponse.body);
        this.tutorialSet = this.tutorials.tutorialList;
      }
    );

  }

  onClick() {
    this.router.navigateByUrl("/home")
  }

  infoModal(content: any, val: number) {
    this.tutorialService.getbyId(val).subscribe(
      reponse => {
        this.currentTutorial = Object.assign(new Tutorial(), reponse.body);
        this.openModal(content);
      }
    );
  }

  updateModal(content: any, val: Tutorial) {
    this.updateTutorial = val;
    this.openModal(content);
  }

  submit(): void {
    console.log(this.updateTutorial);
    this.tutorialService.put(this.updateTutorial.id, this.updateTutorial).subscribe(
      reponse => {
        this.updateTutorial = Object.assign(new Tutorial(), reponse.body);
        this.ngOnInit();
      }
    );
  }

  deleteTutorial(val: number): void {
    this.tutorialService.delete(val).subscribe(
      reponse => {
        this.ngOnInit();
        console.log(reponse);
      }
    );
  }

  openModal(content: any){
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', windowClass : "modal-Poli" }).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
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

}
