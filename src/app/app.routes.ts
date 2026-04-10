import { Routes } from '@angular/router';
import { LandingComponent } from './features/landing/landing.component';
import { QuizComponent } from './features/quiz/quiz.component';
import { ResultComponent } from './features/result/result.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'quiz', component: QuizComponent },
  { path: 'result', component: ResultComponent },
];
