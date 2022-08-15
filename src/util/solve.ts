import Matrix from './matrix'
import Scalar from './scalar'

export default (A: Matrix, v: Matrix) => {
    if (Matrix.determinant(A).equals(Scalar.fromInt(0))) return
    return Matrix.dot(Matrix.invert(A), v)
}
