<template>
    <div class="spinner"></div>
</template>

<style lang="scss">
    .spinner {
        width: 100px;
        padding: 10px;
        aspect-ratio: 1;
        border-radius: 50%;
        position: absolute;
        top: 40%;
        left: 65%;
        background: #087bd8;
        --_m:
            conic-gradient(#0000 10%, #000),
            linear-gradient(#000 0 0) content-box;
        -webkit-mask: var(--_m);
        mask: var(--_m);
        -webkit-mask-composite: source-out;
        mask-composite: subtract;
        animation: l3 1s infinite linear;
    }

    @keyframes l3 {
        to {
            transform: rotate(1turn)
        }
    }

</style>