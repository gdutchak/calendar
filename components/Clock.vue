<template>
        <div class="mt-6 w-2/4 mr-0 ml-auto">
            <span class="mr-2.5 text-slate-600">Current time:</span>
            <span class="text-xl font-semibold text-slate-600">{{ dataTime }}</span>
        </div>
</template>

<script setup>
import {useState} from '../helpers/useState';

const [dataTime, setDataTime] = useState(null)

setInterval(()=> {
    const hours = new Date().getUTCHours();
    const minutes = new Date().getUTCMinutes();
    const seconds = new Date().getUTCSeconds();
setDataTime(`${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds} (GMT)`)
}, 1000)
</script>