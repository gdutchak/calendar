<template>
    <div class="container md:mx-auto mt-10" v-for="mt in meet">
        <h1 class="text-slate-600 text-xl mb-4">CALENDAR</h1>
        <div class="flex justify-between px-5">
            <p class="text-slate-600">{{ currentMonth }}</p>
            <div>
                <button class="w-7 hover:bg-red-100 focus:bg-red-100" @click="decrement" type="button">&#8592;</button>
                <button class="w-7 hover:bg-red-100 focus:bg-red-100" @click="implement" type="button">&#8594;</button>
            </div>
        </div>
        <ul class="grid grid-cols-7 mt-1 text-xs leading-6 text-center text-gray-500">
            <li class="p-1">Mon</li>
            <li class="p-1">Tue</li>
            <li class="p-1">Wen</li>
            <li class="p-1">Ths</li>
            <li class="p-1">Frd</li>
            <li class="p-1">Sat</li>
            <li class="p-1">Sun</li>
        </ul>
        <ul class="grid grid-cols-7 mt-2 text-sm mb-4">
            <li v-for="it in countDays" class="py-3 p-2.5 cursor-pointer border-inherit border text-center" :key="it.toString()" 
            :class="{ 
                'font-black': isToday(it), 
                'text-slate-300': !isSameMonth(it, today), 
                'text-slate-300': !isSameMonth(it, daysMonth(currentMonth)[15]),
                'bg-red-100': isSameDay(it, parseISO(mt.startDateTime)), 
                'text-black': isSameMonth(it, daysMonth(currentMonth)[15])
                }" 
                @click="$ev=>detailsMeet(it, parseISO(mt.startDateTime), showInfo)">
            {{ format(it, 'd') }}
            </li>
        </ul>
        <div class="mb-4">
            <span class="mr-2.5 text-slate-600">Current time:</span>
            <span class="text-xl font-semibold text-slate-600">{{ dataTime }}</span>
        </div>
        <div :class="{'hidden': !showInfo, 'block': showInfo}" class="rounded border border-red-200 bg-slate-100 italic text-lg w-72 p-1.5">
            <h2>{{ mt.title }}</h2>
            <p>{{ mt.location }}</p>
            <span>{{ format(parseISO(mt.startDateTime), 'kk:mm')}}-</span>
            <span>{{ `${format(parseISO(mt.endDateTime), 'kk:mm')} (GMT+02:00)` }}</span>
        </div>
    </div>
</template>

<script setup>

import {startOfToday, isSameDay, isSameMonth, isToday, parseISO, startOfWeek,
        eachDayOfInterval, parse, add, endOfMonth, format, endOfWeek} from 'date-fns';
import {useState} from '../helpers/useState';

setInterval(()=> {
    const hours = new Date().getUTCHours();
    const minutes = new Date().getUTCMinutes();
    const seconds = new Date().getUTCSeconds();
setDataTime(`${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds} (GMT)`)
}, 1000)

const meet = [
{
    title: 'Meet with M.C.',
    location: 'Kyiv, Nezalezhnosti, 26',
    startDateTime: '2023-03-26T14:00',
    endDateTime: '2023-03-26T15:00',
}
]

const today = startOfToday()
const [currentMonth, setCurrentMonth] = useState(format(today, 'MMMM-yyyy'))
const [showInfo, setShowInfo] = useState(false)

const daysMonth = (value) => {
    return eachDayOfInterval({
    start: startOfWeek(parse(value, 'MMMM-yyyy', new Date()), {weekStartsOn: 1}),
    end: endOfWeek(endOfMonth(parse(value, 'MMMM-yyyy', new Date())), {weekStartsOn: 1})
})}

const [countDays, setCountDays] = useState(daysMonth(currentMonth._value))
const [dataTime, setDataTime] = useState(null)

const decrement = () => {
    const result = add(parse(currentMonth._value, 'MMMM-yyyy', new Date()), {months: -1})
    setCurrentMonth(format(result, 'MMM-yyyy'));
    setCountDays(daysMonth(currentMonth._value))
}

const implement = () => {
    const result = add(parse(currentMonth._value, 'MMMM-yyyy', new Date()), {months: +1})
    setCurrentMonth(format(result, 'MMM-yyyy'));
    setCountDays(daysMonth(currentMonth._value))
}

const detailsMeet = (elem, meet, value) => {
   if (isSameDay(elem, meet) && !value) {
        setShowInfo(true)
        return
    } else {
        setShowInfo(false)
    }
}



</script>

<style scoped>
.container {
    width: 500px;
};
</style>