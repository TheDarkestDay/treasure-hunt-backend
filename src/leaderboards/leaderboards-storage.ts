import { LeaderboardsEntry } from './leaderboards-entry';

export class LeaderboardsStorage {
    private readonly storage: LeaderboardsEntry[] = [];

    add(newEntry: LeaderboardsEntry): void {
        this.storage.push(newEntry);
    }

    getAll() {
        return this.storage;
    }
}

export const leaderboardsStorage = new LeaderboardsStorage();