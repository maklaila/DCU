import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MockDataService, ChatMessage, Chat } from '../services/mock-data.service';
import { Observable, map } from 'rxjs';

import { FormsModule } from '@angular/forms'; // Import Forms Module

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule], // Add FormsModule here
  template: `
  <div class="h-100 d-flex flex-column" style="height: calc(100vh - 100px) !important;">
    <nav aria-label="breadcrumb" class="mb-2">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a routerLink="/home" class="text-decoration-none">Inicio</a></li>
        <li class="breadcrumb-item active" aria-current="page">Estudio Colectivo</li>
      </ol>
    </nav>

    <div class="card shadow-lg border-0 flex-grow-1 overflow-hidden" style="border-radius: 1.5rem;">
      <div class="row g-0 h-100">
        
        <!-- Sidebar / Chat List -->
        <div class="col-md-4 col-lg-3 border-end bg-white d-flex flex-column h-100">
          <div class="p-3 border-bottom">
            <h5 class="fw-bold text-primary-custom mb-3">Mensajes</h5>
            <div class="input-group input-group-sm">
              <span class="input-group-text bg-light border-end-0"><i class="bi bi-search"></i></span>
              <input type="text" class="form-control bg-light border-start-0" placeholder="Buscar chat...">
            </div>
          </div>
          
          <div class="list-group list-group-flush overflow-auto flex-grow-1 p-2">
             <!-- Active Chat Item Loop -->
             <a *ngFor="let chat of chats$ | async" 
                href="javascript:void(0)" 
                class="list-group-item list-group-item-action border-0 py-3"
                [class.active]="chat.id === selectedChatId"
                (click)="selectChat(chat.id)">
               <div class="d-flex align-items-center">
                 <div class="position-relative">
                   <div class="bg-white text-primary-custom rounded-circle d-flex align-items-center justify-content-center me-3 shadow-sm" 
                        [class.bg-light]="chat.id !== selectedChatId"
                        [class.text-secondary]="chat.id !== selectedChatId"
                        style="width: 40px; height: 40px;">
                     <i class="bi" [class]="chat.avatarIcon"></i>
                   </div>
                   <!-- Online status dot only for active/groups? For now just visual on 1st one if we want -->
                 </div>
                 <div class="flex-grow-1 overflow-hidden">
                   <div class="d-flex justify-content-between align-items-center mb-1">
                     <h6 class="mb-0 text-truncate fw-bold">{{ chat.name }}</h6>
                     <small class="opacity-75" style="font-size: 0.75rem;">{{ chat.lastMessageTime }}</small>
                   </div>
                   <p class="mb-0 text-truncate opacity-75 small">
                     <span *ngIf="chat.senderName" class="fw-semibold">{{ chat.senderName }}: </span>
                     {{ chat.lastMessage }}
                   </p>
                 </div>
               </div>
             </a>
          </div>
        </div>

        <!-- Chat Area -->
        <div class="col-md-8 col-lg-9 d-flex flex-column h-100 bg-light" *ngIf="selectedChat$ | async as selectedChat">
          
          <div class="card-header bg-white border-bottom py-3 d-flex justify-content-between align-items-center" style="min-height: 70px;">
            <div class="d-flex align-items-center">
               <div class="d-md-none me-3">
                 <button class="btn btn-link text-dark p-0"><i class="bi bi-arrow-left fs-4"></i></button>
               </div>
               <div class="bg-primary-custom text-white rounded-circle d-flex align-items-center justify-content-center me-3" style="width: 40px; height: 40px;">
                 <i class="bi" [class]="selectedChat.avatarIcon"></i>
               </div>
               <div>
                 <h6 class="mb-0 fw-bold text-primary-custom">{{ selectedChat.name }}</h6>
                 <small *ngIf="selectedChat.type === 'group'" class="text-success d-flex align-items-center">
                   <i class="bi bi-circle-fill me-1" style="font-size: 6px;"></i> {{ selectedChat.participants }} miembros
                 </small>
                 <small *ngIf="selectedChat.type === 'private'" class="text-muted">
                   En línea
                 </small>
               </div>
            </div>
            <div>
              <button class="btn btn-light rounded-circle me-1"><i class="bi bi-camera-video"></i></button>
              <button class="btn btn-light rounded-circle"><i class="bi bi-three-dots-vertical"></i></button>
            </div>
          </div>
          
          <div class="card-body overflow-auto d-flex flex-column p-4 flex-grow-1">
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
             <div *ngIf="(messages$ | async)?.length === 0" class="text-center text-muted mt-5">
               <p>No hay mensajes en esta conversación.</p>
             </div>
          </div>

          <div class="card-footer bg-white border-top p-3">
            <div class="input-group">
              <button class="btn btn-light text-secondary"><i class="bi bi-paperclip"></i></button>
              <input type="text" 
                     class="form-control border-0 bg-light" 
                     placeholder="Escribe un mensaje..."
                     [(ngModel)]="newMessage"
                     (keyup.enter)="sendMessage()">
              <button class="btn btn-primary-custom px-4" (click)="sendMessage()" [disabled]="!newMessage.trim()">
                <i class="bi bi-send-fill"></i>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
  `,
  styles: [`
    .rounded-top-left-pill { border-top-left-radius: 1rem !important; }
    .rounded-top-right-pill { border-top-right-radius: 1rem !important; }
    
    .rounded-4 { border-radius: 1rem !important; }
    .rounded-5 { border-radius: 1.5rem !important; }
    
    .list-group-item {
      border-radius: 1rem !important;
      margin-bottom: 0.5rem;
      transition: all 0.2s ease;
    }
    
    .list-group-item.active {
      background-color: #8A2BE2 !important; /* Hardcoded Electric Violet fallback */
      background-color: var(--electric-violet, #8A2BE2) !important;
      border: none;
      color: white !important;
      box-shadow: 0 4px 6px rgba(138, 43, 226, 0.2);
    }
    
    .list-group-item.active h6,
    .list-group-item.active small,
    .list-group-item.active p,
    .list-group-item.active i,
    .list-group-item.active span {
      color: white !important;
      opacity: 0.9;
    }

    .list-group-item:hover:not(.active) {
      background-color: #f8f9fa;
      transform: translateY(-1px);
    }

    /* Avatar adjustments in active state */
    .list-group-item.active .bg-white.text-primary-custom {
      background-color: white !important; /* Force white background */
      color: var(--electric-violet, #8A2BE2) !important; /* Force primary color for icon */
    }
  `]
})
export class ChatPage implements OnInit {
  private dataService = inject(MockDataService);

  chats$!: Observable<Chat[]>;
  messages$!: Observable<ChatMessage[]>;
  selectedChat$!: Observable<Chat | undefined>;

  selectedChatId: number = 1;
  newMessage: string = '';

  ngOnInit() {
    this.chats$ = this.dataService.getChats();
    this.selectChat(1); // Default to first chat
  }

  selectChat(id: number) {
    this.selectedChatId = id;
    this.messages$ = this.dataService.getChatMessages(id);

    // Auto-scroll to bottom after a short delay to allow rendering
    setTimeout(() => this.scrollToBottom(), 100);

    this.selectedChat$ = this.chats$.pipe(
      map(chats => chats.find(c => c.id === id))
    );
  }

  sendMessage() {
    if (!this.newMessage.trim()) return;

    // Create a temporary local message object
    const tempMessage: ChatMessage = {
      id: Date.now(),
      chatId: this.selectedChatId,
      sender: 'Carla', // Current User
      text: this.newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    };

    // We need to update the observable. In a real app we'd call a service.
    // For this mock, we can hack it by re-emitting the current value + new message, 
    // BUT since we are consuming the direct observable from service, let's allow the service to handle "adding" 
    // or just local hack for visual feedback.

    // Better approach: Call a method in MockDataService to add the message so it persists in the session
    this.dataService.addChatMessage(tempMessage);

    this.newMessage = ''; // Clear input
    setTimeout(() => this.scrollToBottom(), 50);
  }

  scrollToBottom() {
    const chatBody = document.querySelector('.card-body.overflow-auto');
    if (chatBody) {
      chatBody.scrollTop = chatBody.scrollHeight;
    }
  }
}
