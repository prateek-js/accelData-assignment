// src/app/app.state.ts
import { BurgerOrder } from './model/burger.model';
export interface AppState {
  readonly burgerOrder: BurgerOrder[];
}