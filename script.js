(function() {
    // DOM VARIABLES
    const input = document.getElementById("inputDate")
    const output = document.getElementById("output")
    
    // REFERENCE TIME VALUES
    const ONE_SECOND = 1000
    const ONE_MINUTE = ONE_SECOND * 60
    const ONE_HOUR = ONE_MINUTE * 60
    const ONE_DAY = ONE_HOUR * 24
    const ONE_MONTH = ONE_DAY * 30
    const ONE_YEAR = ONE_MONTH * 12
    
    
    function calcuteRemainingTime(referenceDate, todayDate) {
        
        let timeLeft = referenceDate - todayDate
        
        let yearsLeft = 0
        while(timeLeft > ONE_YEAR) {
            yearsLeft++
            timeLeft -= ONE_YEAR
        }
        
        let monthsLeft = 0
        while(timeLeft > ONE_MONTH) {
            monthsLeft++
            timeLeft -= ONE_MONTH
        }
        
        let daysLeft = 0
        while(timeLeft > ONE_DAY) {
            daysLeft++
            timeLeft -= ONE_DAY
        }
        
        let hoursLeft = 0
        while(timeLeft > ONE_HOUR) {
            hoursLeft++
            timeLeft -= ONE_HOUR
        }
        
        let minutesLeft = 0
        while(timeLeft > ONE_MINUTE) {
            minutesLeft++
            timeLeft -= ONE_MINUTE
        }
        
        let secondsLeft = 0
        while(timeLeft > ONE_SECOND) {
            secondsLeft++
            timeLeft -= ONE_SECOND
        }
        
        return [yearsLeft, monthsLeft, daysLeft, hoursLeft, minutesLeft, secondsLeft]
    }
    
    function textBuilder(years, months, days, hours, minutes, seconds, milliseconds) {
        let result = []
        if(years) {
            result.push(`${years} ${years > 1 ? "anos" : "ano"}`)
        }
        if(months) {
            result.push(`${months} ${months > 1 ? "meses" : "mes"}`)
        }
        if(days) {
            result.push(`${days} ${days > 1 ? "dias" : "dia"}`)
        }
        if(hours) {
            result.push(`${hours} ${hours > 1 ? "horas" : "hora"}`)
        }
        if(minutes) {
            result.push(`${minutes} ${minutes > 1 ? "minutos" : "minuto"}`)
        }
        if(seconds) {
            result.push(`${seconds} ${seconds > 1 ? "segundos" : "segundo"}`)
        }
        if(milliseconds) {
            result.push(`${milliseconds.toString().padStart(3, "0")} milisegundos`)
        }
        result = result.join(", ")
        if(!result) return "CONCLUÍDO"
        let last = result.lastIndexOf(", ")
        if(last < 0) return result
        return `${result.substring(0, last)} e ${result.substring(last + 2)}.`
    }
    
    let intervalo
    input.addEventListener("change", function() {
        clearInterval(intervalo)
        // GETTING DATA FROM THE DOM
        const [year, month, day] = input.value.split("-")
    
        // GETTING TIMESTAMP VALUES
        let referenceDate = new Date(year, month - 1, day).getTime()
        let todayDate = new Date().getTime()
    
    
        intervalo = setInterval(function() {
            todayDate += 1000
            output.textContent = textBuilder(...calcuteRemainingTime(referenceDate, todayDate))
        }, 1000)
        
        output.textContent = textBuilder(...calcuteRemainingTime(referenceDate, todayDate))
    })
})()