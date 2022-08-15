const gcd = (a: number, b: number) => {
    if (!b) {
        return a
    }

    return gcd(b, a % b)
}

export default class Scalar {
    constructor(private num: number, private den: number) {
        this.simplify()
    }

    static fromInt(value: number) {
        return new Scalar(value, 1)
    }

    simplify() {
        const divisor = Math.abs(gcd(this.num, this.den))
        this.num /= divisor
        this.den /= divisor
        if (this.den < 0) {
            this.num *= -1
            this.den *= -1
        }
        return this
    }

    equals(other: Scalar) {
        return (
            (this.num === 0 && other.num === 0) ||
            (this.num === other.num && this.den === other.den)
        )
    }

    static simplify(value: Scalar) {
        const divisor = gcd(value.num, value.den)
        return new Scalar(value.num / divisor, value.den / divisor)
    }

    static add(a: Scalar, b: Scalar) {
        return new Scalar(a.num * b.den + b.num * a.den, a.den * b.den)
    }

    static neg(value: Scalar) {
        return new Scalar(-value.num, value.den)
    }

    static sub(a: Scalar, b: Scalar) {
        return Scalar.add(a, Scalar.neg(b))
    }

    static mul(a: Scalar, b: Scalar) {
        return new Scalar(a.num * b.num, a.den * b.den)
    }

    static reciprocal(value: Scalar) {
        return new Scalar(value.den, value.num)
    }

    static div(a: Scalar, b: Scalar) {
        return Scalar.mul(a, Scalar.reciprocal(b))
    }

    toString() {
        return `${this.num}${this.den !== 1 ? `/${this.den}` : ''}`
    }
}
