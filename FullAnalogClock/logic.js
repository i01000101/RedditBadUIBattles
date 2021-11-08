"use strict";

const main = document.getElementById('main')
const numbers = [1,2,3,4,5,6,7,8,9,10,11,12]

// Add numbers
numbers.forEach((number) => {
  let div = document.createElement('div')
  div.innerText = number
  div.classList.add('number')

  div.style.setProperty('top', 'calc('+(50 - 50*Math.cos(number*Math.PI/6))+ '% - 8px)') 
  div.style.setProperty('left', 'calc('+(50 + 50*Math.sin(number*Math.PI/6)) + '% - 4px')

  main.append(div)
})

var hour = 0
var min = 0
var sec = 0

const hourLabel = document.getElementById("hour")
const minLabel = document.getElementById("min")
const secLabel = document.getElementById("sec")

const hourPush = document.getElementById("hourPush")
const minPush = document.getElementById("minPush")
const secPush = document.getElementById("secPush")

const secHand = document.getElementById("secHand")
const minHand = document.getElementById("minHand")
const hourHand = document.getElementById("hourHand")

var date = new Date()

var currentSec = date.getSeconds()
var currentMin = date.getMinutes()
var currentHour = date.getHours() + currentMin/60

secHand.style.setProperty('transform', 'rotate(' + currentSec*6 + 'deg)')
minHand.style.setProperty('transform', 'rotate(' + currentMin*6 + 'deg)')
hourHand.style.setProperty('transform', 'rotate(' + currentHour*30 + 'deg)')

setInterval(()=>{
  sec++
  
  if(sec%60 == 0 && sec != 0){
    min++
    sec = 0
  }
  if(min%60 == 0 && min != 0){
    hour++
    min = 0
  }
  
  updateControlPanel()

},1000)


function updateControlPanel(){
  secLabel.innerText = sec
  minLabel.innerText = min
  hourLabel.innerText = hour

  if(sec > 0){
    secLabel.classList.add("active")
    secPush.classList.add("active")
  }else{
    secLabel.classList.remove("active")
    secPush.classList.remove("active")
  }

  if(min > 0){
    minLabel.classList.add("active")
    minPush.classList.add("active")
  }else{
    minLabel.classList.remove("active")
    minPush.classList.remove("active")
  }

  if(hour > 0){
    hourLabel.classList.add("active")
    hourPush.classList.add("active")
  }else{
    hourLabel.classList.remove("active")
    hourPush.classList.remove("active")
  }
}

function push(order){
  switch (order) {
    case 'hour':
      currentHour += hour
      hourHand.style.setProperty('transform', 'rotate(' + currentHour*30 + 'deg)')
      hour = 0
      break
    case 'min':
      currentMin += min
      currentHour += min/60
      minHand.style.setProperty('transform', 'rotate(' + currentMin*6 + 'deg)')
      hourHand.style.setProperty('transform', 'rotate(' + currentHour*30 + 'deg)')
      min = 0
      break
    case 'sec':
      currentSec += sec
      secHand.style.setProperty('transform', 'rotate(' + currentSec*6 + 'deg)')
      sec = 0
      break
  }
  updateControlPanel()
}