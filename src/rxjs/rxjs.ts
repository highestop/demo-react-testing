import { interval, take } from "rxjs";

export const timer$ = interval(1000).pipe(take(1));
