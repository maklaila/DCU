import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject, map } from 'rxjs';

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
    description?: string;
}

export interface Chat {
    id: number;
    name: string;
    type: 'group' | 'private';
    participants?: number;
    avatarIcon: string;
    lastMessage: string;
    lastMessageTime: string;
    senderName?: string; // For "Ana: ..." prefix in preview
}

export interface ChatMessage {
    id: number;
    chatId: number;
    sender: string;
    text: string;
    timestamp: string;
    isMe: boolean;
}

export interface NewsItem {
    id: number;
    title: string;
    date: string;
    category: string;
    content?: string;
}

export interface TimeSlot {
    time: string;
    status: 'available' | 'occupied' | 'selected';
}

export interface Tutor {
    id: number;
    name: string;
    subject: string;
    avatar: string;
    availabilityText: string;
    slots: TimeSlot[];
}

@Injectable({
    providedIn: 'root'
})
export class MockDataService {

    private currentUser: User = {
        name: 'Carla',
        avatar: 'assets/avatar-placeholder.png',
        role: 'student'
    };

    private forumPostsSubject = new BehaviorSubject<ForumPost[]>([
        { id: 1, title: 'Duda sobre derivadas parciales', author: 'Juan Perez', date: 'Hace 2 horas', replies: 5, description: 'No entiendo el último paso del ejercicio 3 de la guía...' },
        { id: 2, title: 'Examen de Física II', author: 'Maria Garcia', date: 'Ayer', replies: 12, description: 'Alguien tiene los temas confirmados para el parcial?' },
        { id: 3, title: 'Grupo de estudio Filosofía', author: 'Carla', date: 'Hace 1 día', replies: 3, description: 'Nos juntamos mañana en la biblioteca?' }
    ]);

    private gradesSubject = new BehaviorSubject<Grade[]>([
        { subject: 'Historia', score: 8.5, teacher: 'Prof. Sanchez', term: '1º Cuatrimestre' },
        { subject: 'Matemáticas II', score: 6.0, teacher: 'Prof. Lopez', term: '1º Cuatrimestre' },
        { subject: 'Lengua', score: 7.5, teacher: 'Prof. Ruiz', term: '1º Cuatrimestre' },
        { subject: 'Inglés', score: 9.0, teacher: 'Prof. Smith', term: '1º Cuatrimestre' },
        { subject: 'Física', score: 6.5, teacher: 'Prof. Einstein', term: '1º Cuatrimestre' },
    ]);

    private chats: Chat[] = [
        {
            id: 1,
            name: 'Grupo Filosofía',
            type: 'group',
            participants: 5,
            avatarIcon: 'bi-people-fill',
            lastMessage: '¿Nos conectamos luego?',
            senderName: 'Ana',
            lastMessageTime: '10:35'
        },
        {
            id: 2,
            name: 'Prof. Lopez',
            type: 'private',
            avatarIcon: 'bi-person-fill',
            lastMessage: 'Recibido, gracias.',
            lastMessageTime: 'Ayer'
        },
        {
            id: 3,
            name: 'Matemáticas II',
            type: 'group',
            participants: 12,
            avatarIcon: 'bi-calculator-fill',
            lastMessage: '¡Hola Carla! No te preocupes, esa tiene...',
            senderName: 'Sofía',
            lastMessageTime: '16:48'
        }
    ];

    private chatMessagesSubject = new BehaviorSubject<ChatMessage[]>([
        // Chat 1: Filosofía
        { id: 1, chatId: 1, sender: 'Ana', text: 'Hola! ¿Vieron las preguntas de Platón?', timestamp: 'Hace 10 min', isMe: false },
        { id: 2, chatId: 1, sender: 'Pedro', text: 'Sí, la alegoría de la caverna entra seguro.', timestamp: 'Hace 8 min', isMe: false },
        { id: 3, chatId: 1, sender: 'Carla', text: 'Menos mal, es lo que mejor me sé.', timestamp: 'Hace 5 min', isMe: true },
        { id: 4, chatId: 1, sender: 'Ana', text: '¿Nos conectamos luego para repasar?', timestamp: 'Hace 2 min', isMe: false },

        // Chat 2: Prof. Lopez
        { id: 5, chatId: 2, sender: 'Carla', text: 'Profesor, ya le envié el trabajo práctico.', timestamp: 'Ayer 15:00', isMe: true },
        { id: 6, chatId: 2, sender: 'Prof. Lopez', text: 'Recibido, gracias.', timestamp: 'Ayer 16:30', isMe: false },

        // Chat 3: Matematicas
        { id: 7, chatId: 3, sender: 'Alex', text: '¿Alguien sabe si el tema de matrices entra en el parcial del martes?', timestamp: '16:30', isMe: false },
        { id: 8, chatId: 3, sender: 'Carla', text: 'Chicos, estoy atascada con la integral del ejercicio 4... 😫 he probado por partes tres veces y no me sale. Me estoy agobiando un poco.', timestamp: '16:45', isMe: true },
        { id: 9, chatId: 3, sender: 'Sofía', text: '¡Hola Carla! No te preocupes, esa tiene truco. Es una integral racional, tienes que descomponer en fracciones simples primero. El grado del numerador es mayor, ¡divide polinomios y sale sola! 💪', timestamp: '16:48', isMe: false }
    ]);

    // Calculate dates relative to "current week" for the demo
    private getRelativeDate(dayOffset: number): Date {
        const d = new Date();
        d.setDate(d.getDate() + dayOffset);
        return d;
    }

    private calendarEventsSubject = new BehaviorSubject<CalendarEvent[]>([
        {
            // History Exam: Always this Friday
            date: new Date(new Date().setDate(new Date().getDate() + (5 - new Date().getDay()))),
            title: 'Examen de Historia',
            type: 'exam',
            description: 'Temas 4 y 5. Recuerda repasar los apuntes de la Revolución Francesa.'
        },
        {
            // Math Assignment: Always this Thursday
            date: new Date(new Date().setDate(new Date().getDate() + (4 - new Date().getDay()))),
            title: 'Entrega de Matemáticas',
            type: 'assignment',
            description: 'Ejercicios de cálculo diferencial. Entregar en formato PDF.'
        }
    ]);



    private newsSubject = new BehaviorSubject<NewsItem[]>([
        {
            id: 1,
            title: 'Nuevas ponderaciones para la PAU en la rama de Ciencias de la Salud y Sociales',
            date: 'Hace 2 horas',
            category: 'Académico',
            content: 'Se han aprobado cambios significativos en las ponderaciones para el acceso a la universidad. Comprueba cómo afectan a grados como Psicología o Enfermería.'
        },
        {
            id: 2,
            title: 'Feria de Universidades: Visita los stands virtuales',
            date: 'Ayer',
            category: 'Eventos',
            content: 'La feria anual de orientación universitaria abre sus puertas digitales. Podrás visitar stands de más de 50 universidades nacionales e internacionales, descargar folletos informativos y chatear en tiempo real con asesores de admisiones. No pierdas la oportunidad de conocer la oferta académica sin salir de casa. El acceso estará disponible durante toda la semana en la plataforma del campus virtual.'
        },
        {
            id: 3,
            title: 'Recordatorio: Cierre de actas del primer trimestre',
            date: 'Hace 3 días',
            category: 'Administración',
            content: 'Se recuerda a todo el alumnado y profesorado que el cierre de actas para la evaluación del primer trimestre tendrá lugar el próximo viernes. Asegúrate de haber entregado todos los trabajos pendientes y justificado las ausencias antes de la fecha límite. Las notas estarán disponibles en el portal del alumno a partir del lunes siguiente.'
        }
    ]);

    private tutors: Tutor[] = [
        {
            id: 1,
            name: 'Laura García',
            subject: 'Orientación Académica',
            avatar: 'assets/tutor1.png',
            availabilityText: 'Disponible hoy',
            slots: [
                { time: '16:00', status: 'available' },
                { time: '17:00', status: 'available' },
                { time: '18:30', status: 'occupied' }
            ]
        },
        {
            id: 2,
            name: 'Carlos Ruiz',
            subject: 'Matemáticas',
            avatar: 'assets/tutor2.png',
            availabilityText: 'Próxima semana',
            slots: [
                { time: '09:00', status: 'available' },
                { time: '10:00', status: 'occupied' },
                { time: '11:00', status: 'available' }
            ]
        },
        {
            id: 3,
            name: 'Elena Vidals',
            subject: 'Psicología',
            avatar: 'assets/tutor3.png',
            availabilityText: 'Pocas plazas',
            slots: [
                { time: '15:00', status: 'occupied' },
                { time: '16:00', status: 'available' },
                { time: '17:30', status: 'occupied' }
            ]
        }
    ];

    constructor() { }

    getUser(): Observable<User> {
        return of(this.currentUser);
    }

    getNews(): Observable<NewsItem[]> {
        return this.newsSubject.asObservable();
    }

    getForumPosts(): Observable<ForumPost[]> {
        return this.forumPostsSubject.asObservable();
    }

    getPost(id: number): Observable<ForumPost | undefined> {
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
        return this.calendarEventsSubject.asObservable();
    }

    addCalendarEvent(event: CalendarEvent) {
        const currentEvents = this.calendarEventsSubject.getValue();
        this.calendarEventsSubject.next([...currentEvents, event]);
    }

    getChats(): Observable<Chat[]> {
        return of(this.chats);
    }

    getChatMessages(chatId: number): Observable<ChatMessage[]> {
        return this.chatMessagesSubject.asObservable().pipe(
            map(messages => messages.filter(m => m.chatId === chatId))
        );
    }

    addChatMessage(msg: ChatMessage) {
        const current = this.chatMessagesSubject.getValue();
        this.chatMessagesSubject.next([...current, msg]);
    }
    getTutors(): Observable<Tutor[]> {
        return of(this.tutors);
    }
}
