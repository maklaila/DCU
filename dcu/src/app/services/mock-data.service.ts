import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';

export interface User {
    name: string;
    avatar: string;
    role: 'student' | 'tutor';
}

export interface ForumPost {
    id: number;
    title: string;
    author: string;
    date: string;
    replies: number;
    description?: string;
}

export interface Grade {
    subject: string;
    score: number;
    teacher: string;
    term: string;
}

export interface CalendarEvent {
    date: Date;
    title: string;
    type: 'exam' | 'assignment' | 'reminder';
}

export interface ChatMessage {
    id: number;
    sender: string;
    text: string;
    timestamp: string;
    isMe: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class MockDataService {

    private currentUser: User = {
        name: 'Carla',
        avatar: 'assets/avatar-placeholder.png', // We'll handle images later or use icons
        role: 'student'
    };

    // Use BehaviorSubject to manage state
    private forumPostsSubject = new BehaviorSubject<ForumPost[]>([
        { id: 1, title: 'Duda sobre derivadas parciales', author: 'Juan Perez', date: 'Hace 2 horas', replies: 5, description: 'No entiendo el último paso del ejercicio 3 de la guía...' },
        { id: 2, title: 'Examen de Física II', author: 'Maria Garcia', date: 'Ayer', replies: 12, description: 'Alguien tiene los temas confirmados para el parcial?' },
        { id: 3, title: 'Grupo de estudio Filosofía', author: 'Carla', date: 'Hace 1 día', replies: 3, description: 'Nos juntamos mañana en la biblioteca?' }
    ]);

    private gradesSubject = new BehaviorSubject<Grade[]>([
        { subject: 'Matemáticas', score: 8.5, teacher: 'Prof. Lopez', term: '1º Cuatrimestre' },
        { subject: 'Lengua', score: 9.0, teacher: 'Prof. Sanchez', term: '1º Cuatrimestre' },
        { subject: 'Física', score: 7.2, teacher: 'Prof. Einstein', term: '1º Cuatrimestre' },
        { subject: 'Filosofía', score: 6.5, teacher: 'Prof. Kant', term: '1º Cuatrimestre' },
        { subject: 'Inglés', score: 9.5, teacher: 'Prof. Smith', term: '1º Cuatrimestre' },
        { subject: 'Historia', score: 7.8, teacher: 'Prof. Historia', term: '2º Cuatrimestre' }
    ]);

    private calendarEvents: CalendarEvent[] = [
        { date: new Date('2025-12-17'), title: 'Examen de Filosofía', type: 'exam' },
        { date: new Date('2025-12-20'), title: 'Entrega TP Historia', type: 'assignment' }
    ];

    private chatMessages: ChatMessage[] = [
        { id: 1, sender: 'Ana', text: 'Hola! ¿Vieron las preguntas de Platón?', timestamp: '10:30', isMe: false },
        { id: 2, sender: 'Pedro', text: 'Sí, la alegoría de la caverna entra seguro.', timestamp: '10:32', isMe: false },
        { id: 3, sender: 'Carla', text: 'Menos mal, es lo que mejor me sé.', timestamp: '10:33', isMe: true },
        { id: 4, sender: 'Ana', text: '¿Nos conectamos luego para repasar?', timestamp: '10:35', isMe: false }
    ];

    constructor() { }

    getUser(): Observable<User> {
        return of(this.currentUser);
    }

    getForumPosts(): Observable<ForumPost[]> {
        return this.forumPostsSubject.asObservable();
    }

    getPost(id: number): Observable<ForumPost | undefined> {
        // We take the current value of the subject
        return of(this.forumPostsSubject.getValue().find(p => p.id === id));
    }

    addForumPost(title: string, description: string) {
        const posts = this.forumPostsSubject.getValue();
        const newPost: ForumPost = {
            id: posts.length + 1,
            title,
            description,
            author: this.currentUser.name,
            date: 'Ahora mismo',
            replies: 0
        };
        this.forumPostsSubject.next([newPost, ...posts]);
    }

    getGrades(): Observable<Grade[]> {
        return this.gradesSubject.asObservable();
    }

    addGrade(subject: string, score: number, teacher: string, term: string) {
        const currentGrades = this.gradesSubject.getValue();
        const newGrade: Grade = { subject, score, teacher, term };
        this.gradesSubject.next([...currentGrades, newGrade]);
    }

    getCalendarEvents(): Observable<CalendarEvent[]> {
        return of(this.calendarEvents);
    }

    getChatMessages(): Observable<ChatMessage[]> {
        return of(this.chatMessages);
    }
}
