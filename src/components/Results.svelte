<script lang="ts">
    import type Matrix from '../util/matrix'
    import solve from '../util/solve'

    export let A: Matrix
    export let v: Matrix

    $: result = solve(A, v)
</script>

<div>x = {result?.data?.[0]?.[0]}</div>
<div>y = {result?.data?.[1]?.[0]}</div>

<style>
    div {
        font-size: 5em;
    }
</style>
