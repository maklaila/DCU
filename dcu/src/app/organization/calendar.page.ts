import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MockDataService, CalendarEvent } from '../services/mock-data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
     <div class="mb-4">
       <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a routerLink="/home" class="text-decoration-none">Inicio</a></li>
          <li class="breadcrumb-item active" aria-current="page">Calendario</li>
        </ol>
      </nav>

      <div class="row">
        <!-- Calendar Grid (Visual Mockup) -->
        <div class="col-lg-8 mb-4">
          <div class="card shadow-sm border-0 h-100">
            <div class="card-header bg-white border-0 py-3 d-flex justify-content-between align-items-center">
               <h4 class="fw-bold text-primary-custom mb-0">Diciembre 2025</h4>
               <div>
                 <button class="btn btn-light btn-sm rounded-circle me-1"><i class="bi bi-chevron-left"></i></button>
                 <button class="btn btn-light btn-sm rounded-circle"><i class="bi bi-chevron-right"></i></button>
               </div>
            </div>
            <div class="card-body">
              <div class="row text-center fw-bold text-muted mb-3">
                <div class="col">Lun</div>
                <div class="col">Mar</div>
                <div class="col">Mié</div>
                <div class="col">Jue</div>
                <div class="col">Vie</div>
                <div class="col">Sáb</div>
                <div class="col">Dom</div>
              </div>
              <!-- Weeks -->
              <div class="row text-center mb-2" *ngFor="let week of weeks">
                 <div class="col py-2 position-relative" *ngFor="let day of week">
                    <span [class.text-muted]="!day.isCurrentMonth" 
                          [class.fw-bold]="day.isToday"
                          [class.text-primary-custom]="day.isToday"
                          class="d-inline-block p-2 rounded-circle date-cell">
                      {{ day.number }}
                    </span>
                    <!-- Event Dot -->
                    <div *ngIf="day.hasEvent" class="position-absolute bottom-0 start-50 translate-middle-x mb-1">
                       <span class="badge bg-danger p-1 rounded-circle border border-white"></span>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Upcoming Events List -->
        <div class="col-lg-4 mb-4">
           <h4 class="fw-bold text-primary-custom mb-3">Próximos Eventos</h4>
           <div class="list-group shadow-sm">
             <div *ngFor="let event of events$ | async" class="list-group-item border-0 border-bottom p-3">
               <div class="d-flex w-100 justify-content-between align-items-center mb-1">
                 <h6 class="mb-0 fw-bold">{{ event.title }}</h6>
                 <span class="badge" 
                       [class.bg-danger]="event.type === 'exam'"
                       [class.bg-warning]="event.type === 'assignment'"
                       [class.text-dark]="event.type === 'assignment'">
                   {{ event.type === 'exam' ? 'Examen' : 'Entrega' }}
                 </span>
               </div>
               <small class="text-muted"><i class="bi bi-clock me-1"></i> {{ event.date | date:'dd/MM/yyyy' }}</small>
             </div>
             
             <!-- Static fallback if empty for visual check -->
             <div class="list-group-item border-0 p-3 bg-light text-center text-muted">
               <small>No hay más eventos este mes</small>
             </div>
           </div>

           <div class="card bg-primary-custom text-white border-0 shadow-sm mt-4">
             <div class="card-body p-4 text-center">
               <i class="bi bi-clock-history fs-1 mb-2"></i>
               <h5 class="fw-bold">Tiempo de Estudio</h5>
               <p class="mb-0 opacity-75">Has estudiado 12 horas esta semana. ¡Sigue así!</p>
             </div>
           </div>
        </div>

      </div>
     </div>
  `,
  styles: [`
    .date-cell:hover {
      background-color: var(--light-blue);
      cursor: pointer;
    }
  `]
})
export class CalendarPage implements OnInit {
  private dataService = inject(MockDataService);
  events$!: Observable<CalendarEvent[]>;

  // Simple static calendar logic for visual
  weeks: any[][] = [];
  currentMonth = new Date('2025-12-01');

  ngOnInit() {
    this.events$ = this.dataService.getCalendarEvents();
    this.events$.subscribe(events => {
      this.generateCalendar(events);
    });
  }

  generateCalendar(events: CalendarEvent[]) {
    const year = this.currentMonth.getFullYear();
    const month = this.currentMonth.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    let startDayOfWeek = firstDay.getDay() - 1; // 0 (Sun) - 6 (Sat) -> Adjust for Monday start (0=Mon, 6=Sun)
    if (startDayOfWeek === -1) startDayOfWeek = 6; // Sunday is 6

    const daysInMonth = lastDay.getDate();

    // Previous month days
    const prevMonthDays: any[] = [];
    const prevMonthLastDate = new Date(year, month, 0).getDate();
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      prevMonthDays.push({ number: prevMonthLastDate - i, isCurrentMonth: false });
    }

    // Current month days
    const currentMonthDays: any[] = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const hasEvent = events.some(e =>
        e.date.getDate() === i &&
        e.date.getMonth() === month &&
        e.date.getFullYear() === year
      );

      currentMonthDays.push({
        number: i,
        isCurrentMonth: true,
        isToday: false, // We can fix this later if needed, but for now specific to Dec 2025
        hasEvent: hasEvent
      });
    }

    // Next month days to fill grid (6 rows x 7 days = 42 cells)
    const nextMonthDays: any[] = [];
    const totalFilled = prevMonthDays.length + currentMonthDays.length;
    const remaining = 42 - totalFilled;
    for (let i = 1; i <= remaining; i++) {
      nextMonthDays.push({ number: i, isCurrentMonth: false });
    }

    const allDays = [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];

    this.weeks = [];
    for (let i = 0; i < allDays.length; i += 7) {
      this.weeks.push(allDays.slice(i, i + 7));
    }
  }
}
