import { LeaderboardsEntry } from './leaderboards-entry';

export class LeaderboardsStorage {
    private readonly storage: LeaderboardsEntry[] = [];

    add(newEntry: LeaderboardsEntry): void {
        this.storage.push(newEntry);
    }

    getAll(): LeaderboardsEntry[] {
        return this.storage.sort((entryA, entryB) => entryA.score - entryB.score);
    }
}

export const leaderboardsStorage = new LeaderboardsStorage();