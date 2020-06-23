export class GameField {
    private field: string[][] = [];

    private readonly SIZE = 5;

    constructor() {
        for (let i = 0; i < this.SIZE; i++) {
            this.field.push([]);
            for (let j = 0; j < this.SIZE; j++) {
                this.field[i].push('#');
            }
        }
    }

    getCellContent(i: number, j: number): string {
        return this.field[i] && this.field[i][j];
    }

    setCellContent(i: number, j: number, value: string): void {
        this.field[i][j] = value;
    }

    getSize(): number {
        return this.SIZE;
    }

    getCells(): string[] {
        return this.field.reduce((total, current) => total.concat(current), []);
    }

    isCellFilled(i: number, j: number): boolean {
        return this.getCellContent(i, j) !== '#';
    }

    print(): void {
        let result = '';
        this.field.forEach((row) => {
            result += row.join(',') + '\n';
        });

        console.log(result);
    }
}