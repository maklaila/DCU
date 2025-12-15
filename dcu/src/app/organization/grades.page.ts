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
        <h2 class="fw-bold text-primary-custom mb-0">Rendimiento Académico</h2>
        <button class="btn btn-primary-custom rounded-pill px-3" (click)="openModal()">
          <i class="bi bi-plus-lg me-2"></i>Añadir Nota
        </button>
      </div>

      <div class="row g-4">
        <div class="col-md-4">
           <div class="card shadow-sm border-0 h-100 bg-primary-custom text-white">
             <div class="card-body p-4 text-center d-flex flex-column justify-content-center">
                <h5 class="opacity-75">Promedio {{ selectedTerm }}</h5>
                <div class="display-2 fw-bold mb-2">{{ averageScore | number:'1.1-1' }}</div>
                <div class="progress bg-white bg-opacity-25" style="height: 6px;">
                  <div class="progress-bar bg-white" role="progressbar" [style.width]="(averageScore * 10) + '%'" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <p class="mt-3 mb-0 small opacity-75">Basado en {{ (filteredGrades$ | async)?.length }} asignaturas.</p>
             </div>
           </div>
        </div>

        <div class="col-md-8">
           <div class="card shadow-sm border-0 h-100">
             <div class="card-body p-4">
               
               <ul class="nav nav-pills mb-4">
                 <li class="nav-item">
                   <a class="nav-link cursor-pointer" [class.active]="selectedTerm === '1º Cuatrimestre'" [class.bg-primary-custom]="selectedTerm === '1º Cuatrimestre'" (click)="setTerm('1º Cuatrimestre')">1º Cuatrimestre</a>
                 </li>
                 <li class="nav-item">
                   <a class="nav-link cursor-pointer" [class.active]="selectedTerm === '2º Cuatrimestre'" [class.bg-primary-custom]="selectedTerm === '2º Cuatrimestre'" (click)="setTerm('2º Cuatrimestre')">2º Cuatrimestre</a>
                 </li>
               </ul>

               <h5 class="fw-bold mb-4 text-primary-custom">Desglose por Asignatura</h5>
               
               <div *ngFor="let grade of filteredGrades$ | async" class="mb-4 fade-in">
                 <div class="d-flex justify-content-between align-items-end mb-1">
                   <div>
                     <span class="fw-bold h6">{{ grade.subject }}</span>
                     <span class="text-muted small ms-2">{{ grade.teacher }}</span>
                   </div>
                   <span class="fw-bold ml-auto" [ngClass]="getScoreColor(grade.score)">{{ grade.score }}</span>
                 </div>
                 <div class="progress" style="height: 10px;">
                   <div class="progress-bar rounded-pill" role="progressbar" 
                        [style.width]="(grade.score * 10) + '%'"
                        [ngClass]="getProgressBarColor(grade.score)"
                        [attr.aria-valuenow]="grade.score" aria-valuemin="0" aria-valuemax="10">
                   </div>
                 </div>
               </div>

               <div *ngIf="(filteredGrades$ | async)?.length === 0" class="text-center text-muted py-5">
                 <i class="bi bi-journal-x fs-1 opacity-50"></i>
                 <p class="mt-2">No hay notas registradas para este cuatrimestre.</p>
               </div>

             </div>
           </div>
        </div>
      </div>
    </div>

    <!-- Add Grade Modal -->
    <div class="modal-backdrop fade show" *ngIf="showModal"></div>
    <div class="modal fade show d-block" *ngIf="showModal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content border-0 shadow-lg">
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
    .text-success-custom { color: #28a745; }
    .bg-success-custom { background-color: #28a745; }
    .text-warning-custom { color: #ffc107; }
    .bg-warning-custom { background-color: #ffc107; }
    .cursor-pointer { cursor: pointer; }
    .nav-pills .nav-link { color: var(--primary-color); }
    .nav-pills .nav-link.active { color: white; background-color: var(--primary-color) !important; }
    .fade-in { animation: fadeIn 0.3s ease-in; }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
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
}
