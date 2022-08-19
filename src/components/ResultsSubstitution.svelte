<script lang="ts">
    import type Matrix from '../util/matrix'
    import Scalar from '../util/scalar'
    import solve from '../util/solve'

    export let A: Matrix
    export let v: Matrix

    $: result = solve(A, v)
    $: [a, b, d, e] = A.data.flat()
    $: [c, f] = v.data.flat()

    $: y = Scalar.div(
        Scalar.sub(f, Scalar.mul(Scalar.div(c, a), d)),
        Scalar.sub(e, Scalar.mul(Scalar.div(b, a), d))
    )
    $: x = Scalar.sub(Scalar.div(c, a), Scalar.mul(Scalar.div(b, a), y))
</script>

<p>
    <strong> Substitution</strong><br />
    {a}x + {b}y = {c} <blue> - ①</blue><br />
    {d}x + {e}y = {f} <pink> - ②</pink><br />
    <blue>rearrange ①</blue><br />
    {a}x = {c} - {b}y<br />
    x = {Scalar.div(c, a)} - {Scalar.div(b, a)}y <blue> - ①′</blue><br />
    <lime>substitute <blue>①′</blue> into <pink>②</pink></lime><br />
    {d}({Scalar.div(c, a)} - {Scalar.div(b, a)}y) + {e}y = {f}<br />
    {Scalar.mul(Scalar.div(c, a), d)} - {Scalar.mul(Scalar.div(b, a), d)}y + {e}y
    = {f}<br />
    {Scalar.mul(Scalar.div(c, a), d)} + {Scalar.sub(
        e,
        Scalar.mul(Scalar.div(b, a), d)
    )}y = {f}<br />
    {Scalar.sub(e, Scalar.mul(Scalar.div(b, a), d))}y = {Scalar.sub(
        f,
        Scalar.mul(Scalar.div(c, a), d)
    )}<br />
    y = {y} <pink> - ②′</pink><br />
    <lime>substitute <pink>②′</pink> into <blue>①′</blue></lime><br />
    x = {Scalar.div(c, a)} - {Scalar.div(b, a)}({y})<br />
    x = {Scalar.div(c, a)} - {Scalar.mul(Scalar.div(b, a), y)}<br />
    x = {x}<br />
    ({x}, {y})
</p>

<style>
    p {
        font-size: 3em;
    }

    blue {
        color: #0ff;
    }
    pink {
        color: #f0f;
    }
    lime {
        color: #0f0;
    }
</style>
