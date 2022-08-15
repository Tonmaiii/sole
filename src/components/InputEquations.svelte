<script lang="ts">
    import Matrix from '../util/matrix'
    import Scalar from '../util/scalar'

    import InputNumber from '../components/InputNumber.svelte'

    let a = Scalar.fromInt(0)
    let b = Scalar.fromInt(0)
    let c = Scalar.fromInt(0)
    let d = Scalar.fromInt(0)
    let e = Scalar.fromInt(0)
    let f = Scalar.fromInt(0)

    export let A: Matrix
    $: A = new Matrix([
        [a, b],
        [d, e]
    ])

    export let v: Matrix
    $: v = new Matrix([[c], [f]])
</script>

<div>
    <InputNumber name="a" bind:value={a} />x +
    <InputNumber name="b" bind:value={b} />y =
    <InputNumber name="c" bind:value={c} right={true} />
    <br />
    <InputNumber name="d" bind:value={d} />x +
    <InputNumber name="e" bind:value={e} />y =
    <InputNumber name="f" bind:value={f} right={true} />
</div>

<style>
    div {
        font-size: 5em;
    }
</style>
