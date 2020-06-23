import { GameState } from './game-state';

export class SessionStorage {
    private storage: {[key: string]: GameState} = {};

    putValue(key: string, value: GameState): void {
        this.storage[key] = value;
    }

    getValue(key: string): GameState {
        return this.storage[key];
    }
};

export const sessionStorage = new SessionStorage();