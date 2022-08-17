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
    <strong>Elimination</strong><br />
    <blue>{a}x + {b}y = {c} - ①</blue><br />
    <pink>{d}x + {e}y = {f} - ②</pink><br />
    <lime>multiply <blue>①</blue> by {Scalar.neg(Scalar.div(d, a))}<br />
    <blue>{Scalar.neg(d)}x + {Scalar.neg(Scalar.div(Scalar.mul(b, d), a))}y = {Scalar.neg(Scalar.div(Scalar.mul(c, d), a))} - ①′</blue><br />
    <blue>①′</blue> + <pink>②</pink><br />
    <blue>{Scalar.neg(d)}x + {Scalar.neg(Scalar.div(Scalar.mul(b, d), a))}y</blue> + <pink>{d}x + {e}y</pink> = <blue>{Scalar.neg(Scalar.div(Scalar.mul(c, d), a))}</blue> + <pink>{f}</pink><br />
    {Scalar.add(Scalar.neg(Scalar.div(Scalar.mul(b, d), a)), e)}y = {Scalar.add(Scalar.neg(Scalar.div(Scalar.mul(c, d), a)), f)}<br />
    <lime>y</lime> = {y}<br />
    <lime>substitude y into</lime> <blue>①</blue><br />
    <blue>{a}x + {b}(<lime>{y}</lime>) = {c}</blue><br />
    {a}x + {Scalar.mul(b, y)} = {c}<br />
    {a}x = {Scalar.sub(c, Scalar.mul(b, y))}<br />
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
