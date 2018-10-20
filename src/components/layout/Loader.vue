<template>
    <div id="wrapper">       
        <div class="spinner"></div>                               
    </div>    
</template>

<style scoped>

    #wrapper {
        position: relative;
        width: 100%;
        height: 250px;
    }
    .spinner {
        position: absolute; 
        top: 50%;  
        left: 50%;
        transform: translate(-20px, -20px);
        transition: 300ms;
        width: 20px;
        height: 20px;
        border-radius: 50%;
    
    }

    .spinner::before, .spinner::after {
        content: '';
        display: block;
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }

    .spinner::after {
        position: absolute;
        top: 0px;
        left: 0px;
        border: 1px solid transparent;
        border-top-color: #4e5b6d;
        border-bottom-color: #4e5b6d;
        animation: spin 500ms linear infinite;
    }

    @keyframes spin {
        0% {
            opacity: 0.5;
            transform: rotate(0deg) scale(1);
        }
        55% {
            opacity: 1;
            transform: rotate(180deg) scale(1.3);
        }
        100% {
            opacity: 0.5;
            transform: rotate(360deg) scale(1);
        }
    }
</style>

