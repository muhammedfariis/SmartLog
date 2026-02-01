import ora from "ora"

const spinner = ora({
    spinner : "dotsCircle",
    color : "yellow",
    indent : 2 ,
    hideCursor : true
})

export default spinner