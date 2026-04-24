import { CanDeactivateFn } from '@angular/router';

export interface CanLeaveQuiz {
  StopLeaveQuiz: () => boolean | Promise<boolean> | import('rxjs').Observable<boolean>;
}

export const pendingQuizGuard: CanDeactivateFn<CanLeaveQuiz> = (
  component,
  currentRoute,
  currentState,
  nextState
) => {
  if (nextState?.url === '/result') {
    return true;
  }

  return component.StopLeaveQuiz();
};
