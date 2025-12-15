import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MockDataService, ChatMessage } from '../services/mock-data.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-chat',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
    <div class="d-flex flex-column h-100">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a routerLink="/home" class="text-decoration-none">Inicio</a></li>
          <li class="breadcrumb-item active" aria-current="page">Estudio Colectivo</li>
        </ol>
      </nav>

      <div class="card shadow border-0 flex-grow-1 d-flex flex-column overflow-hidden" style="min-height: 600px;">
        <div class="card-header bg-white border-bottom py-3 d-flex justify-content-between align-items-center">
          <div class="d-flex align-items-center">
             <div class="bg-primary-custom text-white rounded-circle d-flex align-items-center justify-content-center me-3" style="width: 45px; height: 45px;">
               <i class="bi bi-people-fill fs-5"></i>
             </div>
             <div>
               <h5 class="mb-0 fw-bold text-primary-custom">Grupo Filosofía</h5>
               <small class="text-success"><i class="bi bi-circle-fill" style="font-size: 8px;"></i> 5 miembros online</small>
             </div>
          </div>
          <div>
            <button class="btn btn-light rounded-circle me-1"><i class="bi bi-camera-video"></i></button>
            <button class="btn btn-light rounded-circle"><i class="bi bi-three-dots-vertical"></i></button>
          </div>
        </div>
        
        <div class="card-body bg-light overflow-auto d-flex flex-column p-4 flex-grow-1">
          <div *ngFor="let msg of messages$ | async" 
               class="d-flex mb-3" 
               [ngClass]="{'justify-content-end': msg.isMe}">
            
            <div class="d-flex flex-column" [ngClass]="{'align-items-end': msg.isMe, 'align-items-start': !msg.isMe}" style="max-width: 75%;">
               <small class="text-muted mb-1 mx-2" *ngIf="!msg.isMe">{{ msg.sender }}</small>
               
               <div class="p-3 shadow-sm" 
                    [ngClass]="{
                      'bg-primary-custom text-white rounded-start-pill rounded-top-right-pill': msg.isMe,
                      'bg-white text-dark rounded-end-pill rounded-top-left-pill': !msg.isMe
                    }" style="border-radius: 1rem;">
                 {{ msg.text }}
               </div>
               <small class="text-muted mt-1 mx-2" style="font-size: 0.75rem;">{{ msg.timestamp }}</small>
            </div>
          </div>
        </div>

        <div class="card-footer bg-white border-top p-3">
          <div class="input-group">
            <button class="btn btn-light text-secondary"><i class="bi bi-paperclip"></i></button>
            <input type="text" class="form-control border-0 bg-light" placeholder="Escribe un mensaje...">
            <button class="btn btn-primary-custom px-4"><i class="bi bi-send-fill"></i></button>
          </div>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .rounded-top-left-pill { border-top-left-radius: 1rem !important; }
    .rounded-top-right-pill { border-top-right-radius: 1rem !important; }
  `]
})
export class ChatPage implements OnInit {
    private dataService = inject(MockDataService);
    messages$!: Observable<ChatMessage[]>;

    ngOnInit() {
        this.messages$ = this.dataService.getChatMessages();
    }
}
