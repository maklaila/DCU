import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6">
        <h2 class="fw-bold text-primary-custom mb-4 text-center">Reservar Tutoría</h2>
        
        <div class="card shadow border-0">
          <div class="card-body p-4 p-lg-5">
            <form>
              <div class="mb-4">
                <label for="subjectSelect" class="form-label fw-bold">Asignatura</label>
                <select class="form-select" id="subjectSelect">
                  <option selected>Selecciona una asignatura</option>
                  <option value="1">Matemáticas</option>
                  <option value="2">Filosofía</option>
                  <option value="3">Física</option>
                  <option value="4">Inglés</option>
                </select>
              </div>

              <div class="mb-4">
                <label for="teacherSelect" class="form-label fw-bold">Profesor</label>
                <select class="form-select" id="teacherSelect">
                  <option selected>Cualquier profesor disponible</option>
                  <option value="1">Prof. Lopez</option>
                  <option value="2">Prof. Kant</option>
                </select>
              </div>

              <div class="row mb-4">
                <div class="col-6">
                   <label for="dateInput" class="form-label fw-bold">Fecha</label>
                   <input type="date" class="form-control" id="dateInput">
                </div>
                <div class="col-6">
                   <label for="timeInput" class="form-label fw-bold">Hora</label>
                   <input type="time" class="form-control" id="timeInput">
                </div>
              </div>

              <div class="mb-4">
                <label class="form-label fw-bold d-block">Modalidad</label>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" name="modeOptions" id="onlineMode" value="online" checked>
                  <label class="form-check-label" for="onlineMode">Online (Zoom)</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" name="modeOptions" id="inPersonMode" value="inperson">
                  <label class="form-check-label" for="inPersonMode">Presencial</label>
                </div>
              </div>

              <div class="mb-4">
                <label for="notes" class="form-label fw-bold">Mensaje directo</label>
                <textarea class="form-control" id="notes" rows="3" placeholder="¿Sobre qué tema específico necesitas ayuda?"></textarea>
              </div>

              <div class="d-grid gap-2">
                <button type="submit" class="btn btn-primary-custom btn-lg rounded-pill fw-bold">Confirmar Reserva</button>
                <button type="button" class="btn btn-link text-muted">Cancelar</button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class BookingPage { }
