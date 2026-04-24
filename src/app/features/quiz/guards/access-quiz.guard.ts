import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { QuizService } from '../services/quiz.service';

export const accessQuizGuard: CanActivateFn = () => {
  const quizService = inject(QuizService);
  const router = inject(Router);

  const hasQuestions = quizService.totalQuestions() > 0;

  if (hasQuestions) return true;

  return router.createUrlTree(['/']);
};
