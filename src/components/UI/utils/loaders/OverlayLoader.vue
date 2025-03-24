<template>
    <div class="overlay">
        <div class="spinner"></div>
    </div>
</template>

<style lang="scss">
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99999;
    overflow: hidden;
    
    .spinner {
        width: 200px;
        padding: 23px;
        aspect-ratio: 1;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        background: #890bf1;
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
}

</style>