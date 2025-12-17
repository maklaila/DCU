import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MockDataService, ForumPost } from '../services/mock-data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-forum-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="mb-4">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a routerLink="/home" class="text-decoration-none">Inicio</a></li>
          <li class="breadcrumb-item active" aria-current="page">Foro</li>
        </ol>
      </nav>

      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="fw-bold text-primary-custom mb-0">Foro de Alumnos</h2>
        <button class="btn btn-primary-custom rounded-pill px-3" (click)="openModal()">
          <i class="bi bi-plus-lg me-2"></i>Nueva Discusión
        </button>
      </div>

      <div class="list-group shadow-sm">
        <a *ngFor="let post of posts$ | async" [routerLink]="['/forum', post.id]" 
           class="list-group-item list-group-item-action p-4 border-0 border-bottom">
          <div class="d-flex w-100 justify-content-between mb-2">
            <h5 class="mb-1 fw-bold text-primary-custom">{{ post.title }}</h5>
            <small class="text-muted">{{ post.date }}</small>
          </div>
          <p class="mb-2 text-secondary">{{ post.description }}</p>
          <div class="d-flex align-items-center text-muted small">
            <span class="me-3"><i class="bi bi-person-circle me-1"></i> {{ post.author }}</span>
            <span><i class="bi bi-chat-dots me-1"></i> {{ post.replies }} respuestas</span>
          </div>
        </a>
      </div>


      <!-- CTA to Chat -->
      <div class="d-flex justify-content-end mt-4">
         <a routerLink="/chat" class="btn btn-outline-primary-custom rounded-pill shadow-sm d-flex align-items-center gap-2 px-4 py-2 bg-white card-hover">
            <span class="d-flex align-items-center justify-content-center bg-success text-white rounded-circle" style="width: 24px; height: 24px;">
              <i class="bi bi-lightning-fill" style="font-size: 0.8rem;"></i>
            </span>
            <div class="text-start lh-1">
               <span class="d-block fw-bold small text-dark">¿Duda urgente?</span>
               <small class="text-muted" style="font-size: 0.7rem;">Pregunta en tiempo real</small>
            </div>
            <i class="bi bi-chevron-right text-muted ms-1"></i>
         </a>
      </div>
    </div>

    <!-- Simple Custom Modal Overlay -->
    <div class="modal-backdrop fade show" *ngIf="showModal"></div>
    <div class="modal fade show d-block" *ngIf="showModal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content border-0 shadow-lg">
          <div class="modal-header bg-primary-custom text-white">
            <h5 class="modal-title fw-bold">Nueva Discusión</h5>
            <button type="button" class="btn-close btn-close-white" (click)="closeModal()"></button>
          </div>
          <div class="modal-body p-4">
            <form>
              <div class="mb-3">
                <label for="postTitle" class="form-label fw-bold">Título</label>
                <input type="text" class="form-control" id="postTitle" [(ngModel)]="newPostTitle" name="title" placeholder="Ej: Duda examen matemáticas">
              </div>
              <div class="mb-3">
                <label for="postDesc" class="form-label fw-bold">Descripción</label>
                <textarea class="form-control" id="postDesc" [(ngModel)]="newPostDescription" name="description" rows="4" placeholder="Escribe tu duda o comentario..."></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer border-0">
            <button type="button" class="btn btn-link text-muted text-decoration-none" (click)="closeModal()">Cancelar</button>
            <button type="button" class="btn btn-primary-custom rounded-pill px-4" (click)="createPost()" [disabled]="!newPostTitle || !newPostDescription">Publicar</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .list-group-item:hover {
      background-color: var(--lighter-blue);
    }
  `]
})
export class ForumListPage implements OnInit {
  private dataService = inject(MockDataService);
  posts$!: Observable<ForumPost[]>;

  showModal = false;
  newPostTitle = '';
  newPostDescription = '';

  ngOnInit() {
    this.posts$ = this.dataService.getForumPosts();
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.newPostTitle = '';
    this.newPostDescription = '';
  }

  createPost() {
    if (this.newPostTitle && this.newPostDescription) {
      this.dataService.addForumPost(this.newPostTitle, this.newPostDescription);
      this.closeModal();
    }
  }
}
