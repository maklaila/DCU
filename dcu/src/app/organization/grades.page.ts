import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MockDataService, Grade } from '../services/mock-data.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-grades',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="mb-4">
       <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a routerLink="/home" class="text-decoration-none">Inicio</a></li>
          <li class="breadcrumb-item active" aria-current="page">Mis Notas</li>
        </ol>
      </nav>

      <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
           <h2 class="fw-bold text-primary-custom mb-0">Rendimiento Académico</h2>
           <p class="text-muted">Monitoriza tu progreso en cada asignatura.</p>
        </div>
        <button class="btn btn-primary-custom rounded-pill px-4 shadow-sm" (click)="openModal()">
          <i class="bi bi-plus-lg me-2"></i>Añadir Nota
        </button>
      </div>

      <!-- Overview Cards -->
      <div class="row g-4 mb-5">
        <div class="col-md-12">
           <div class="card shadow-sm border-0 bg-white rounded-4 p-4">
              <h5 class="fw-bold text-primary-custom mb-3">Promedio Global</h5>
              <div class="d-flex align-items-center">
                 <div class="display-3 fw-bold text-primary-custom me-4">{{ averageScore | number:'1.1-1' }}</div>
                 <div class="flex-grow-1">
                    <div class="progress rounded-pill" style="height: 15px;">
                      <div class="progress-bar progress-bar-striped progress-bar-animated bg-gradient-custom" role="progressbar" 
                           [style.width]="(averageScore * 10) + '%'" 
                           aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <small class="text-muted mt-2 d-block">Basado en {{ (filteredGrades$ | async)?.length }} asignaturas del {{ selectedTerm }}.</small>
                 </div>
              </div>
           </div>
        </div>
      </div>

      <h5 class="fw-bold text-primary-custom mb-3">Asignaturas</h5>
      
      <!-- Subject Cards Grid -->
      <div class="row g-4">
         <div *ngFor="let grade of filteredGrades$ | async" class="col-md-6 col-lg-4">
            <div class="card h-100 shadow-sm border-0 rounded-4 card-hover"
                 [routerLink]="grade.subject === 'Matemáticas II' ? '/subject/math' : null"
                 [style.cursor]="grade.subject === 'Matemáticas II' ? 'pointer' : 'default'">
               <div class="card-body p-4 d-flex flex-column justify-content-between">
                  <div>
                     <div class="d-flex justify-content-between align-items-start mb-3">
                        <div class="icon-square rounded-circle"
                             [ngClass]="getIconBgColor(grade.score)">
                           <i class="bi" 
                              [class.bi-journal-check]="grade.score >= 5" 
                              [class.bi-journal-x]="grade.score < 5"
                              [ngClass]="getIconColor(grade.score)"></i>
                        </div>
                        <div class="dropdown">
                           <button class="btn btn-link text-muted p-0" type="button"><i class="bi bi-three-dots-vertical"></i></button>
                        </div>
                     </div>
                     <h5 class="fw-bold mb-1">{{ grade.subject }}</h5>
                     <p class="text-muted small mb-3">{{ grade.teacher }}</p>
                  </div>
                  
                  <div>
                     <div class="d-flex justify-content-between align-items-end mb-2">
                        <span class="text-muted small">Nota Final</span>
                        <span class="fw-bold fs-3" [ngClass]="getScoreColor(grade.score)">{{ grade.score }}</span>
                     </div>
                     <div class="progress rounded-pill" style="height: 8px;">
                        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" 
                             [style.width]="(grade.score * 10) + '%'"
                             [ngClass]="getProgressBarColor(grade.score)"
                             aria-valuemin="0" aria-valuemax="10"></div>
                     </div>
                  </div>

                  <div *ngIf="grade.subject === 'Matemáticas II'" class="mt-3">
                     <button class="btn btn-sm btn-outline-primary rounded-pill w-100 fw-bold">
                        <i class="bi bi-box-arrow-in-right me-1"></i> Ver Aula Virtual
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
      
      <div *ngIf="(filteredGrades$ | async)?.length === 0" class="text-center text-muted py-5">
         <i class="bi bi-clipboard-x fs-1 opacity-50"></i>
         <p class="mt-3">No hay notas registradas para este cuatrimestre.</p>
      </div>

    </div>

    <!-- Add Grade Modal -->
    <div class="modal-backdrop fade show" *ngIf="showModal"></div>
    <div class="modal fade show d-block" *ngIf="showModal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content border-0 shadow-lg rounded-4">
          <div class="modal-header bg-primary-custom text-white">
            <h5 class="modal-title fw-bold">Añadir Nueva Nota</h5>
            <button type="button" class="btn-close btn-close-white" (click)="closeModal()"></button>
          </div>
          <div class="modal-body p-4">
            <form>
              <div class="mb-3">
                <label class="form-label fw-bold">Asignatura</label>
                <input type="text" class="form-control" [(ngModel)]="newSubject" name="subject" placeholder="Ej: Historia">
              </div>
              <div class="row mb-3">
                 <div class="col-6">
                    <label class="form-label fw-bold">Nota (0-10)</label>
                    <input type="number" class="form-control" [(ngModel)]="newScore" name="score" min="0" max="10" step="0.1">
                 </div>
                 <div class="col-6">
                    <label class="form-label fw-bold">Cuatrimestre</label>
                    <select class="form-select" [(ngModel)]="newTerm" name="term">
                      <option value="1º Cuatrimestre">1º Cuatrimestre</option>
                      <option value="2º Cuatrimestre">2º Cuatrimestre</option>
                    </select>
                 </div>
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">Profesor (Opcional)</label>
                <input type="text" class="form-control" [(ngModel)]="newTeacher" name="teacher" placeholder="Ej: Prof. Garcia">
              </div>
            </form>
          </div>
          <div class="modal-footer border-0">
            <button type="button" class="btn btn-link text-muted text-decoration-none" (click)="closeModal()">Cancelar</button>
            <button type="button" class="btn btn-primary-custom rounded-pill px-4" (click)="addGrade()" [disabled]="!newSubject || !newScore || !newTerm">Guardar</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .text-success-custom { color: #198754 !important; }
    .bg-success-custom { background-color: #198754 !important; }
    .text-warning-custom { color: #fd7e14 !important; } /* Orange for mid-range */
    .bg-warning-custom { background-color: #fd7e14 !important; }
    .bg-gradient-custom { background: linear-gradient(90deg, var(--electric-violet) 0%, #a855f7 100%); }
    
    .rounded-4 { border-radius: 1.5rem !important; }
    .card-hover { transition: transform 0.2s; }
    .card-hover:hover { transform: translateY(-5px); }
    
    .bg-success-subtle-custom { background-color: #d1e7dd; }
    .bg-warning-subtle-custom { background-color: #ffe5d0; }
    .bg-danger-subtle-custom { background-color: #f8d7da; }

    .icon-square {
      width: 45px;
      height: 45px;
      aspect-ratio: 1 / 1;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `]

})
export class GradesPage implements OnInit {
  private dataService = inject(MockDataService);

  allGrades$!: Observable<Grade[]>;
  filteredGrades$!: Observable<Grade[]>;

  selectedTerm: string = '1º Cuatrimestre';
  averageScore: number = 0;

  // Modal State
  showModal = false;
  newSubject = '';
  newScore: number | null = null;
  newTeacher = '';
  newTerm = '1º Cuatrimestre';

  ngOnInit() {
    this.allGrades$ = this.dataService.getGrades();
    this.updateFilter();
  }

  setTerm(term: string) {
    this.selectedTerm = term;
    this.updateFilter();
  }

  updateFilter() {
    this.filteredGrades$ = this.allGrades$.pipe(
      map(grades => {
        const filtered = grades.filter(g => g.term === this.selectedTerm);
        this.calculateAverage(filtered);
        return filtered;
      })
    );
  }

  calculateAverage(grades: Grade[]) {
    if (grades.length === 0) {
      this.averageScore = 0;
      return;
    }
    const sum = grades.reduce((acc, curr) => acc + curr.score, 0);
    this.averageScore = sum / grades.length;
  }

  openModal() {
    this.newTerm = this.selectedTerm; // Default to current view
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.newSubject = '';
    this.newScore = null;
    this.newTeacher = '';
  }

  addGrade() {
    if (this.newSubject && this.newScore !== null && this.newTerm) {
      this.dataService.addGrade(
        this.newSubject,
        this.newScore,
        this.newTeacher || 'Prof. N/A',
        this.newTerm
      );
      // Refresh filter just in case, though reactive stream handles it
      // Since we subscribe to changes, setTerm logic might need a nudge or simply re-stream.
      // Actually, since filteredGrades$ is derived from allGrades$, and allGrades$ emits new value,
      // the map operator will re-run.
      this.closeModal();
    }
  }

  getScoreColor(score: number): string {
    if (score >= 9) return 'text-primary-custom';
    if (score >= 7) return 'text-success-custom';
    if (score >= 5) return 'text-warning-custom';
    return 'text-danger';
  }

  getProgressBarColor(score: number): string {
    if (score >= 9) return 'bg-primary-custom';
    if (score >= 7) return 'bg-success-custom';
    if (score >= 5) return 'bg-warning-custom';
    return 'bg-danger';
  }

  getIconBgColor(score: number): string {
    if (score >= 9) return 'bg-primary-subtle';
    if (score >= 7) return 'bg-success-subtle-custom';
    if (score >= 5) return 'bg-warning-subtle-custom';
    return 'bg-danger-subtle-custom';
  }

  getIconColor(score: number): string {
    if (score >= 9) return 'text-primary';
    if (score >= 7) return 'text-success-custom';
    if (score >= 5) return 'text-warning-custom';
    return 'text-danger';
  }
}
