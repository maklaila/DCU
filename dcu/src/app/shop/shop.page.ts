import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Product {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge?: string;
}

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container fade-in mb-5">
      <div class="row mb-4 align-items-center">
         <div class="col">
           <nav aria-label="breadcrumb">
            <ol class="breadcrumb mb-1">
              <li class="breadcrumb-item"><a routerLink="/home" class="text-decoration-none" style="cursor: pointer;">Inicio</a></li>
              <li class="breadcrumb-item active" aria-current="page">Materiales</li>
            </ol>
          </nav>
          <h2 class="fw-bold text-primary-custom mb-0">Materiales de Estudio</h2>
          <p class="text-muted">Apuntes y ejercicios oficiales del centro.</p>
        </div>
      </div>

      <div class="row g-4">
        @for (product of products; track product.id) {
          <div class="col-md-6 col-lg-4">
            <div class="card h-100 shadow-sm border-0 rounded-4 overflow-hidden card-hover">
              <!-- Image Placeholder -->
              <!-- Image Containter -->
              <div class="bg-light d-flex align-items-center justify-content-center overflow-hidden" style="height: 200px;">
                 <img [src]="product.image" [alt]="product.title" class="img-fluid" style="width: 100%; height: 100%; object-fit: cover;">
              </div>
              
              <div class="card-body p-4 d-flex flex-column">
                <div class="d-flex justify-content-between align-items-start mb-2">
                   @if (product.badge) {
                     <span class="badge bg-danger rounded-pill">{{ product.badge }}</span>
                   }
                </div>
                
                <h5 class="fw-bold mb-1">{{ product.title }}</h5>
                <p class="text-muted small mb-3">Formato PDF • Descarga Inmediata</p>
                
                <div class="mt-auto d-flex align-items-center justify-content-between">
                  <div>
                    @if (product.originalPrice) {
                      <span class="text-decoration-line-through text-muted small me-2">{{ product.originalPrice }}€</span>
                    }
                    <span class="fw-bold fs-4 text-primary-custom">{{ product.price }}€</span>
                  </div>
                  <button class="btn btn-primary-custom rounded-pill px-4" (click)="buy(product)">
                    Comprar
                  </button>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .rounded-4 { border-radius: 1.5rem !important; }
    .card-hover { transition: transform 0.2s, box-shadow 0.2s; }
    .card-hover:hover { 
      transform: translateY(-5px); 
      box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important; 
    }
    .text-primary-custom { color: var(--primary-color, #6f42c1); }
    .bg-primary-custom { background-color: var(--primary-color, #6f42c1); color: white; }
    .fade-in { animation: fadeIn 0.5s ease-in; }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class ShopPage {
  products: Product[] = [
    {
      id: 1,
      title: 'Pack de Apuntes: Historia de España',
      price: 15,
      originalPrice: 20,
      image: 'assets/history_book.png',
      badge: 'Oferta Alumno'
    },
    {
      id: 2,
      title: 'Ejercicios Resueltos: Matemáticas II',
      price: 12,
      image: 'assets/math_book.png',
    }
  ];

  buy(product: Product) {
    // Simple mock logic as requested
    alert(`¡${product.title} añadido al carrito! (Simulación)`);
  }
}
