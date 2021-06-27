export function moment(_date: string) {
    let monthsName = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December",
    ]

    let obj = new Date(_date);
    if (obj instanceof Date) {

    } else {
        obj = new Date()
    }

    function relativeDate() {
        var min = 60 * 1000;
        var hour = min * 60;
        var day = hour * 24;
        var month = day * 30;
        var year = day * 365;

        var elapsed = Date.now() - obj.valueOf();

        if (elapsed < min) {
            return Math.round(elapsed / 1000) + ' seconds ago';
        }

        else if (elapsed < hour) {
            return Math.round(elapsed / min) + ' minutes ago';
        }

        else if (elapsed < day) {
            return Math.round(elapsed / hour) + ' hours ago';
        }

        else if (elapsed < month) {
            return + Math.round(elapsed / day) + ' days ago';
        }

        else if (elapsed < year) {
            return + Math.round(elapsed / month) + ' months ago';
        }
    }

    let day = obj.getDate()
    let month = obj.getMonth()
    let year = obj.getFullYear()

    return { date: `${day} ${monthsName[month]} ${year}`, fromNow: relativeDate }
}