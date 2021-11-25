const getMonth = month => {
         if(month === 1) return "January";
    else if(month === 2) return "February";
    else if(month === 3) return "March";
    else if(month === 4) return "April";
    else if(month === 5) return "May";
    else if(month === 6) return "June";
    else if(month === 7) return "July";
    else if(month === 8) return "August";
    else if(month === 9) return "September";
    else if(month === 10) return "October";
    else if(month === 11) return "November";
    else return "December";
}

const getDay = day =>{
        if(day === 1) return `${day}st`;
    else if(day === 2) return `${day}nd`;
    else if(day === 3) return `${day}rd`;
    else return `${day}th`;
}

export default function findDay (date){
    const year = date.slice(0, 4)
    const month =  date.slice(5, 7)
    const day =  date.slice(8, 10)

    return `${getDay(day)} ${getMonth(month)}, ${year}`
}