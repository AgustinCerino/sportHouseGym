import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { RoutineService } from '../../../services/rutine.service';

@Component({
  selector: 'app-routine-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './routine-details.component.html',
  styleUrl: './routine-details.component.css'
})
export class RoutineDetailsComponent implements OnInit {
rutina: any;
private rutinaService = inject(RoutineService);

constructor (private route:ActivatedRoute,public sanitizer: DomSanitizer ){}
ngOnInit() {
  const id=this.route.snapshot.paramMap.get('id');
  if(id)
  {
    this.rutinaService.getRutinaById(id).subscribe(data =>{
      this.rutina= data;
    });
  }
}
}
