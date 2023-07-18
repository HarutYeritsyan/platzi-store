import { Observable, catchError, map, of } from 'rxjs';

export interface DataWithCompletionStatus<T> {
  data?: T;
  error?: unknown;
}

export const withCompletionStatus = <T>(observable$: Observable<T>): Observable<DataWithCompletionStatus<T>> => {
  return observable$.pipe(
    map(data => ({ data })),
    catchError((error: unknown) => of({ error }))
  );
}
