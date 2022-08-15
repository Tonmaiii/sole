import Scalar from './scalar'

export default class Matrix {
    width: number
    height: number

    constructor(public data: Scalar[][]) {
        this.height = data.length
        this.width = data[0].length
    }

    static dot(a: Matrix, b: Matrix) {
        return new Matrix(
            new Array(a.height).fill(undefined).map((_, y) =>
                new Array(b.width).fill(undefined).map((_, x) => {
                    return [...a.data[y]]
                        .map((n, i) => Scalar.mul(n, b.data[i][x]))
                        .reduce((a, b) => Scalar.add(a, b))
                })
            )
        )
    }

    static determinant(a: Matrix): Scalar {
        if (a.width === 1 && a.height === 1) return a.data[0][0]

        return a.data[0]
            .map((n, i) =>
                Scalar.mul(
                    Scalar.mul(
                        n,
                        Matrix.determinant(
                            new Matrix(
                                a.data
                                    .slice(1)
                                    .map(v => v.filter((_, j) => i !== j))
                            )
                        )
                    ),
                    i % 2 === 0 ? Scalar.fromInt(1) : Scalar.fromInt(-1)
                )
            )
            .reduce((a, b) => Scalar.add(a, b))
    }

    static cofactor(a: Matrix) {
        return new Matrix(
            a.data.map((row, y) =>
                row.map((_, x) =>
                    Scalar.mul(
                        Matrix.determinant(
                            new Matrix(
                                a.data
                                    .filter((_, i) => i !== y)
                                    .map(v => v.filter((_, j) => j !== x))
                            )
                        ),
                        (x + y) % 2 === 0
                            ? Scalar.fromInt(1)
                            : Scalar.fromInt(-1)
                    )
                )
            )
        )
    }

    static transpose(a: Matrix) {
        return new Matrix(a.data[0].map((_, i) => a.data.map(row => row[i])))
    }

    static invert(a: Matrix) {
        const determinant = Matrix.determinant(a)
        return new Matrix(
            Matrix.cofactor(Matrix.transpose(a)).data.map(row =>
                row.map(n => Scalar.div(n, determinant))
            )
        )
    }

    toString() {
        return this.data
            .map(row => row.map(n => n.toString()).join(', '))
            .join('\n')
    }
}
