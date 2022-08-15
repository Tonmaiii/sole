<script lang="ts">
    import InputEquations from './components/InputEquations.svelte'
    import Results from './components/Results.svelte'
    import ResultsSubstitution from './components/ResultsSubstitution.svelte'
    import Matrix from './util/matrix'
    import Scalar from './util/scalar'

    let A = new Matrix([
        [Scalar.fromInt(0), Scalar.fromInt(0)],
        [Scalar.fromInt(0), Scalar.fromInt(0)]
    ])
    let v = new Matrix([[Scalar.fromInt(0)], [Scalar.fromInt(0)]])
</script>

<main>
    <!-- <h1>System Of Linear Equations</h1> -->
    <InputEquations bind:A bind:v />
    <Results {A} {v} />
    <ResultsSubstitution {A} {v} />
</main>

<style>
    main {
        display: flex;
        min-height: 100%;
        flex-direction: column;
        align-items: center;
    }

    h1 {
        font-size: 5em;
    }
</style>
