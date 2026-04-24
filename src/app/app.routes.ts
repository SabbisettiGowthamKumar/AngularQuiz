import { Routes } from '@angular/router';
import { LandingComponent } from './features/landing/landing.component';
import { accessQuizGuard } from './features/quiz/guards/access-quiz.guard';
import { pendingQuizGuard } from './features/quiz/guards/pending-quiz.guard';
import { ResultComponent } from './features/result/result.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  {
    path: 'quiz',
    loadComponent: () => import('./features/quiz/quiz.component').then((m) => m.QuizComponent),
    canDeactivate: [pendingQuizGuard],
    canActivate: [accessQuizGuard],
  },
  { path: 'result', component: ResultComponent },
  { path: '**', redirectTo: '' },
];
