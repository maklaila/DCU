import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MockDataService, ForumPost } from '../services/mock-data.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-forum-detail',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
    <div class="mb-4" *ngIf="post$ | async as post">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a routerLink="/home" class="text-decoration-none">Inicio</a></li>
          <li class="breadcrumb-item"><a routerLink="/forum" class="text-decoration-none">Foro</a></li>
          <li class="breadcrumb-item active" aria-current="page">{{ post.title }}</li>
        </ol>
      </nav>

      <div class="card shadow-sm border-0 mb-4">
        <div class="card-body p-4">
          <h2 class="fw-bold text-primary-custom mb-3">{{ post.title }}</h2>
          <div class="d-flex align-items-center mb-4">
             <div class="bg-primary-custom text-white rounded-circle d-flex align-items-center justify-content-center me-3" style="width: 40px; height: 40px;">
               <span class="fw-bold">{{ post.author.charAt(0) }}</span>
             </div>
             <div>
               <div class="fw-bold">{{ post.author }}</div>
               <div class="text-muted small">{{ post.date }}</div>
             </div>
          </div>
          <p class="lead fs-6">{{ post.description }}</p>
        </div>
        <div class="card-footer bg-white border-top p-3 d-flex justify-content-between align-items-center">
           <button class="btn btn-outline-primary btn-sm rounded-pill">
             <i class="bi bi-hand-thumbs-up me-1"></i> Me gusta
           </button>
           <button class="btn btn-link text-decoration-none text-muted btn-sm">
             <i class="bi bi-flag me-1"></i> Reportar
           </button>
        </div>
      </div>

      <h4 class="fw-bold mb-3 text-secondary-custom">Respuestas ({{ post.replies }})</h4>
      
      <!-- Mock Reply -->
      <div class="card shadow-sm border-0 mb-3">
        <div class="card-body p-4">
           <div class="d-flex mb-3">
             <div class="bg-secondary-custom text-white rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0" style="width: 35px; height: 35px;">
               <span class="fw-bold">P</span>
             </div>
             <div>
               <div class="fw-bold">Profesor Garcia <span class="badge bg-primary-custom ms-2">Docente</span></div>
               <div class="text-muted small">Hace 1 hora</div>
             </div>
           </div>
           <p class="mb-0">Hola {{ post.author }}, revisa el capítulo 4 del libro, página 120. Ahí se explica el teorema que necesitas.</p>
        </div>
      </div>

      <div class="card shadow-sm border-0 mb-3 bg-light">
         <div class="card-body p-4 text-center">
            <p class="text-muted mb-3">¿Tienes la respuesta?</p>
            <button class="btn btn-primary-custom px-4 rounded-pill">Responder</button>
         </div>
      </div>

    </div>
  `,
    styles: []
})
export class ForumDetailPage implements OnInit {
    private route = inject(ActivatedRoute);
    private dataService = inject(MockDataService);
    post$!: Observable<ForumPost | undefined>;

    ngOnInit() {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.post$ = this.dataService.getPost(id);
    }
}
