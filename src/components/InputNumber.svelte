<script lang="ts">
    import Scalar from '../util/scalar'

    export let name: string
    let _value: string
    export let value = Scalar.fromInt(0)
    $: value = parseScalar(_value)
    export let right = false

    const parseScalar = (text: string) => {
        text = text?.trim()
        if (!text) return Scalar.fromInt(0)

        const values = text
            .match(
                /^([+-])? *(?:(\d+)(?:\.(\d+))? +)?(\d+)(?:\.(\d+))?(?:\/(\d+)(?:\.(\d+))?)?$/
            )
            ?.slice(1)

        if (!values) return Scalar.fromInt(0)

        const sign = Scalar.fromInt(values[0] == '-' ? -1 : 1)
        const number = parseNumber(values[1], values[2]) ?? Scalar.fromInt(0)
        const numerator = parseNumber(values[3], values[4]) ?? Scalar.fromInt(0)
        const denominator =
            parseNumber(values[5], values[6]) ?? Scalar.fromInt(1)
        return Scalar.mul(
            sign,
            Scalar.add(number, Scalar.div(numerator, denominator))
        )
    }

    const parseNumber = (a: string, b: string) => {
        if (!b) return parseInt(a) ? Scalar.fromInt(parseInt(a)) : null
        return new Scalar(
            parseInt(a) * 10 ** b.length + parseInt(b),
            10 ** b.length
        )
    }
</script>

<input
    type="text"
    placeholder={name}
    id={name}
    bind:value={_value}
    class={right ? 'rhs' : 'lhs'}
/>

<style>
    input {
        width: 2em;
        font-size: 1em;
        background: none;
        border: none;
        color: white;
    }

    .lhs {
        text-align: right;
    }
</style>
