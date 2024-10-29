import { Component ,OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoutineService } from '../services/rutine.service';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-routine-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './routine-details.component.html',
  styleUrl: './routine-details.component.css'
})
export class RoutineDetailsComponent implements OnInit {
rutina: any;
constructor (private route:ActivatedRoute,private rutinaService: RoutineService,public sanitizer: DomSanitizer ){}
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
